---
\[//]: # (@formatter:off)
author: Przemek Malirz 
title: "SODA and JSON in Oracle Database"
code: blog 
date: 2023-05-06
draft: true
description: Oracle as a NoSQL store - SODA and JSON in Oracle?
keywords: [blog, oracle, document storage, nosql, rdbms, sql, oracle, orm]
weight: 2
\[//]: # (@formatter:on)
---

## NoSQL Oracle

I am sure this may seem like an obvious feature for some of you, especially those who have worked with schema-less
stores. However, it is often overlooked by programmers who choose or stick with RDBMS stores. This is the audience I
would like to dedicate this short write-up to.

Don't get me wrong. I have nothing against relational databases. In fact, I have been working with them (particularly
with Oracle) since I can remember, and this post only promotes them more. The part that seems weird, though, is the way
we store our objects using tables. With RDBMS, we scatter them across multiple tables. Do you hear the uncomfortable
sound of a fork scratching a plate?

Imagine this. Instead of a flat structure that you have to query using multiple joins through different tables, you can
access one column and get one JSON document. Only one column, and you have a clear picture of the state of your entire
object. How obvious to Mongo users and how strange to relational database developers!

I have to admit that storing a business domain object, such as an aggregate root, as a document looks and behaves much
more naturally than spreading it across multiple tables and struggling with crazy ORM mappings, forcing ORM frameworks
to behave efficiently in your codebase.

In my current Oracle-based project, we have reduced the number of tables representing one business object into a concise
JSON representation stored in one table and one column. This means no more mess and no more ORM annotations to manage.
It is so much clearer now. Many related Java entity classes are reduced to one cohesive object. Plus, we still have
ACID.

A very few code example (with Kotlin):

```kotlin
class Product(
  val id: String,
  val name: String,
  val description: String?,
  val price: BigDecimal,
)

val product = Product("1", "Product 1", "Description", BigDecimal("10.00"))

// SODA Java API
val oracleDatabase = oracleRDBMSClient.getDatabase(connection)
val oracleCollection = oracleDatabase.openCollection(collectionName)
val serializedDocument = objectMapper.writer().writeValueAsBytes(product)
val document = oracleDatabase.createDocumentFromByteArray(serializedDocument)
oracleCollection.insert(document)

// JSON (via JDBC) 
SimpleJdbcInsert(jdbcTemplate).withTableName(tableName).usingColumns(jsonColumnName).execute(
    MapSqlParameterSource().addValue(
      "DOC", // see the CREATE TABLE below
      objectMapper.writer().writeValueAsBytes(product),
      OracleType.JSON.vendorTypeNumber
    )    
)
```

The table with one JSON (DOC) and one virtual column (ID):
```sql
CREATE TABLE PRODUCT_JSON (
    DOC        JSON,
    ID AS (json_value(DOC, '$.id' RETURNING VARCHAR2(255))),
    PRIMARY KEY (ID)
)
```


The above examples are extracted from the vshop repository. You can find the link at the end of this post.

The best part is that you do not need to onboard yet another technology or vendor into your company in order to utilize
NoSQL capabilities. That would almost certainly complicate your infrastructure and increase your TCO. Just use what is
available, and you are good to go! Ladies and gentlemen, KISS and RTFM pay off again!

Going even further, you can mix NoSQL with SQL styles in Oracle database and in one database query. Some portions of
JSON documents can be extracted as virtual (mapped) columns or joined with relational columns inside a query. Oracle
provides very rich notation to query JSON objects. Oracle 21c introduces native JSON data type, and Oracle 23c merges
both worlds – document-based and relational together!

## Show me the code

If you are interested in exploring NoSQL capabilities in Oracle and learning more about how I have implemented different
repositories working with different Spring Boot profiles (***JPA, SODA, JSON, and MONGO***) all together in one project,
check out [my recent repository](https://github.com/pmalirz/vshop). In addition to showcasing different stores, 
I have also included some interesting approaches, including:

- Isolated ORM entity model - JPA together with internal repository classes are private. Thus, any leakage of
  infrastructure specifics is not possible.
- ORM Entity is separated from Domain Entity - despite what you might see in other articles, remember that ORM
  Entity != Domain Entity. These are two completely separate concepts.
- Testcontainers used for smoke tests showcasing the usage of regular images (for Oracle 21c) and images built from the
  custom Dockerfile (Generic Containers).
- Nice features of Kotlin:
    - data classes as JPA entities and REST contracts,
    - higher-order functions,
    - no dummy/empty constructors on the JPA classes.
- Commands separated from Queries - at the code level (sharing the same database tables for simplicity).
- Commands do not return anything - yep, that's right, not even identifiers (shortcut used quite often especially when
  your ORM framework is responsible for generating identifiers). 

I have also included a `docker-compose.yaml` file to run Oracle, Infinispan, and Mongo containers. 
The [VShop](https://github.com/pmalirz/vshop) repository is my laboratory, created for blogging, training, and R&D 
purposes. I hope you find it useful!

## Afterword 

Although I have advertised Oracle SODA a little bit in this post, I do not recommend using it. I created the blinking
banner before realizing the actual state of SODA implementation for Java. However, I think Oracle JSON is an outstanding
feature that I really like. Besides, SODA is just a wrapper (library) around Oracle JSON. 

I strongly suggest you explore the capabilities of your current RDBMS and carefully consider investing your time and
money in another tool.

By the way, did you know that you can query graph structures in Oracle? But that's another story.

## Further materials

- [VShop](https://github.com/pmalirz/vshop) - a sample project showcasing different stores
- [Soda for Java](https://github.com/oracle/soda-for-java) - github repository
- [Oracle JSON](https://github.com/oracle/json-in-db) - github repository
- [Oracle JSON Database](https://docs.oracle.com/en/database/oracle/oracle-database/21/adjsn/) - official documentation

## Thank you

Thank you for reading.
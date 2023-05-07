---
\[//]: # (@formatter:off)
author: Przemek Malirz 
title: "Non-relational Oracle"
code: blog 
date: 2023-05-06
draft: false
description: Oracle as a NoSQL store - SODA and JSON in Oracle?
keywords: [blog, oracle, document storage, nosql, rdbms, sql, oracle, orm, non-relational, json]
weight: 2
\[//]: # (@formatter:on)
---

## JSON in Oracle

I am sure this may seem like an obvious feature for some of you, especially those who have worked with schema-less
stores. However, it is often overlooked by programmers who choose or stick with RDBMS stores. This is the audience I
would like to dedicate this short write-up to.

Don't get me wrong. I have nothing against relational databases. In fact, I have been working with them (particularly
with Oracle) since I can remember, and this post only promotes them more. The part that seems weird, though, is the way
we store our objects using tables. With RDBMS, we scatter them across multiple tables. Do you hear the uncomfortable
sound of a fork scratching a plate?

Now, here comes the good news and the key point of this post.
**Working with Oracle or PostgreSQL doesn't mean you are condemned to use ubiquitous relational tables.**  

Imagine this. Instead of a flat structure that you have to query using multiple joins through different tables, you can
access one column and get one JSON document. Only one column, and you have a clear picture of the state of your entire
object. How obvious to Mongo or CosmosDB users and how strange to developers welded to RDBMS!

❇️ Let's take a look at the following example of a `Product`. The `Product` is represented by one consistent object.

```json
{
   "id":"b98551ec-afc4-435c-9d11-420f7868b138",
   "name":"polyamides-menazon-tamable",
   "description":"concomitances contractible...",
   "price":525.64,
   "quantity":357,
   "techSpecs":{
      "weight": 5.0,
      "dimensions":{
         "width": 22,
         "height": 33,
         "depth": 44
      }
   }
}
```
And here is the SQL table to store the above object:

[//]: # (@formatter:off)
{{< figure src="/img/blog/soda-json-nosql-rdbms-oracle/table-json.jpg" class="flex max-w-xs" alt="table-json" >}}

[//]: # (@formatter:on)

Could it be any simpler or any more concise?

❇️ Let's compare it now to the relational representation of the same object. The `Product` is represented 
in more flattened way for efficiency and simplicity. Let's say that was a conscious decision of a team who likes YAGNI.

```cvs
ID,NAME,DESCRIPTION,PRICE,QUANTITY,TECHSPECSWEIGHT,TECHSPECSDIMENSIONSWIDTH,TECHSPECSDIMENSIONSHEIGHT,TECHSPECSDIMENSIONSDEPTH
b98551ec-afc4-435c-9d11-420f7868b138,polyamides-menazon-tamable,concomitances contractible...,525,64,357,5,22,33,44
```
And here is the SQL table to store the above object:

[//]: # (@formatter:off)
{{< figure src="/img/blog/soda-json-nosql-rdbms-oracle/table-sql.jpg" class="flex max-w-xs" alt="table-json" >}}

[//]: # (@formatter:on)

I have no trouble to point out the winner for storing the business objects. 
The JSON representation is much more readable.
Going towards relational model just because you have Oracle or PosgreSQL is not so obvious anymore, is it❓

We must admit that storing a business domain object, such as an aggregate root, as a document looks and behaves much
more naturally than spreading it across multiple tables and struggling with crazy ORM mappings, forcing them
to behave efficiently.

## My current Oracle-based project

In my current Oracle-based project, we have reduced the number of tables representing one business object into a concise
JSON representation stored in one table and one column. This means no more mess and no more ORM annotations to manage.
It is so much clearer now. Many related Java entity classes are reduced to one cohesive object. Plus, we still have
ACID. 🤘

A very few code examples (with Kotlin):

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

Oracle brings two API-level strategies to work with document-based structures:
- **SODA (Simple Oracle Document Access)** - a Java API to work with JSON documents. It is just a wrapper for SQL queries.
- **JSON notation** - e.g. via JDBC API in case of Java. You can directly work with JSON using SQL queries.

The table with one JSON (DOC) and one virtual column (ID):
```sql
CREATE TABLE PRODUCT_JSON (
    DOC        JSON,
    ID AS (json_value(DOC, '$.id' RETURNING VARCHAR2(255))),
    PRIMARY KEY (ID)
)
```

And few SQL examples. JSON query notation provided by Oracle is very powerful and expressive:
```sql
-- Search products through all fields!
SELECT * FROM PRODUCT_JSON WHERE json_exists(DOC, '$.*?(@.upper() has substring $p1)' PASSING :0 AS "p1")
-- Search products by name
SELECT * FROM PRODUCT_JSON WHERE json_exists(DOC, '$.name?(@ like "polyamides%")')
```

The above examples are extracted from the [VShop](https://github.com/pmalirz/vshop) repository.
For more specific cases you can look into the Oracle documentation. 

The best part with this approach is that you do not need to onboard yet another technology or vendor into your company
in order to utilize NoSQL / document-based capabilities. That would almost certainly complicate your infrastructure and
increase your TCO. Just use what is available, and you are good to go! This is my advice.
Ladies and gentlemen, KISS and RTFM in the best of their forms!

Going even further, you can mix NoSQL with SQL styles in Oracle database and in one database query. Some portions of
JSON documents can be extracted as virtual (mapped) columns or joined with relational columns inside a query. Oracle
provides very rich notation to query JSON objects. **Oracle 21c** introduces native JSON data type, and **Oracle 23c** 
merges both worlds – document-based and relational together!

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

The [VShop](https://github.com/pmalirz/vshop) repository is my personal laboratory, created for blogging, training, 
and R&D purposes. I hope you find it useful!

## Afterword 

Although I have advertised Oracle SODA a little bit in this post, I do not recommend using it. I created the blinking
banner before realizing the actual state of SODA implementation for Java. However, I think Oracle JSON is an outstanding
feature that I really like. Besides, SODA is just a wrapper (library) around Oracle JSON. 

I strongly suggest you to explore the capabilities of your current RDBMS, before you consider investing your time and
money in yet another tool.

❗By the way, did you know that you can query **Graph structures in Oracle?** But that's another story.

## Further materials

- [VShop](https://github.com/pmalirz/vshop) - a sample project showcasing different stores
- [Soda for Java](https://github.com/oracle/soda-for-java) - github repository
- [Oracle JSON](https://github.com/oracle/json-in-db) - github repository
- [Oracle JSON Database](https://docs.oracle.com/en/database/oracle/oracle-database/21/adjsn/) - official documentation

## Thank you

Thank you for reading.
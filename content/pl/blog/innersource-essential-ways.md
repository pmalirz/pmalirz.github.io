---
\[//]: # (@formatter:off)
author: Przemek Malirz 
title: Essential ways to execute InnerSource 
code: blog 
date: 2023-02-18
draft: true
description: To start the InnerSource culture inside a company is not a trivial task. Luckily, you do not have to transform your culture via the "big-bang" approach
keywords: [blog, innersource, collaboration, contribution, cross-team collaboration, silo, opensource inside the company, devops, cost savings, proprietary]
weight: 2
\[//]: # (@formatter:on)
---

I know that I should start with the definition of [InnerSource](https://innersourcecommons.org/). However, I just
couldn't resist to give you some concrete material to read earlier.

If, like me, you've been looking for ways to increase collaboration between teams in your organization, or you are a CxO
looking for ways to develop the culture, increase the quality of your products and at the same time while increasing
savings, you should read this blog post.

<!-- TOC -->
  * [Customer Contribution](#customer-contribution)
    * [Scenario](#scenario)
      * [Problem (picture on the left)](#problem--picture-on-the-left-)
      * [InnerSource Solution (picture ot the right)](#innersource-solution--picture-ot-the-right-)
      * [Major Advantages](#major-advantages)
  * [Shared Component (Byproduct by design)](#shared-component--byproduct-by-design-)
    * [Scenario](#scenario-1)
      * [Problem (picture on the left)](#problem--picture-on-the-left--1)
      * [InnerSource Solution (picture on the right)](#innersource-solution--picture-on-the-right-)
      * [Major Advantages](#major-advantages-1)
  * [Gig Marketplace](#gig-marketplace)
    * [Scenario](#scenario-2)
      * [Problem](#problem)
      * [InnerSource Solution](#innersource-solution)
      * [Major Advantages](#major-advantages-2)
  * [Further reading and watching](#further-reading-and-watching)
  * [Thank you](#thank-you)
<!-- TOC -->

Starting an **InnerSource** culture in a firm is not a trivial task. The bigger the company is the more it is scattered
into separate silos and the harder is to change the well-grounded practices. Fortunately, you do not have to, or better
yet, you should not try to transform your culture within a day in a
"big bang" approach. It is just undoable. [Start small](https://patterns.innersourcecommons.org/p/start-as-experiment),
ideally propose the experiment.

Explaining **InnerSource** practices to people, especially to senior executives, that have been working for all those
years in a silo-based mindset, being focused on local goals, usually has a very mind-shifting effect. You may even hear
the famous "We had been trying it before, a shared project, it just doesn't work". To be 100% honest with you, I have
been also trying to work on the shared libraries, in my current and my past companies, sometimes failing. But back then,
I didn't know what the **InnerSource** is and how greatly it helps to overcome the usual problems. Needless to say that
**InnerSource** goes way beyond the problem of working on the shared library.

Let's explore the 3 ways you can run the **InnerSource** selectively. You do not have to run them all and for all the
projects / teams. You can choose and decide and enable them per projects and per area in the firm.

## Customer Contribution

The Customer Contribution method is about preferring **Pull request over Feature request**. It officially opens a
project for an external contribution. That way the Customer Team requiring a feature from the dependant project, instead
of requesting the feature contributes to the project owned by the Vendors Team. Therefore, the Customers Team implicitly
become also a vendor of additional features. As per practitioners, this is the key direction for InnerSource as it opens
everyone for a global communication and collaboration. The most important process improvement is that the **Escalation
is replaced by the discussion** between two development teams.

- **Vendor Team** - The [Core Team](https://patterns.innersourcecommons.org/p/core-team). This is the team that owning
  the project, that other teams in the firm depend on. The project might be either a core business project or a shared
  component. Red silo on the below picture.
- **Customer Team** - the team depends on the project owned by the Vendor Team or wants to reuse the shared component
  extending its functions. Blue and Green silos on the below picture.

[//]: # (@formatter:off)
{{< figure src="/img/blog/innersource-essential-ways/innersource-3ways-customer-contribution.png" class="flex max-w-xs" >}}

[//]: # (@formatter:on)

### Scenario

The Blue/Green Teams work depend on the Red Team's project or the Blue/Green Teams would like to reuse a shared
component owned by the Red Team.

#### Problem (picture on the left)

The Green or the Blue Team require changes to be provided in the project owned by the Red Team. Red Team cannot
accommodate any additional amount of work in the next weeks / months. Red Team's schedule is tight, hence the team
decides to escalate it. Mind-managers and senior management are engaged into the process forcing Red Team to change
their plans. The process is often very disruptive. The frustration arise and nervous atmosphere is growing. Teams spend
their time on the stressful calls.

#### InnerSource Solution (picture ot the right)

As per the InnerSource practices, Red Team discuss required changes with Green and Blue teams. Red Team has a findable
documentation, guest house rules and clear contribution guidelines accessible in the project's repository. Blue/Green
Teams start working on the required changes, following the Red Team’s instructions. Blue/Green Team sends completed work
(pull request) to Red Team. The [Trusted Committer](https://patterns.innersourcecommons.org/p/trusted-committer) (TC on
the picture) of Red Team reviews the code and sends the change back with comments, describing what needs to be adjusted.
Blue/Green Team developers provide necessary changes and submits the code again. The TC of Red Team approves the changes
merging them to the production code base and plans the release.

#### Major Advantages

- Escalation process is eliminated. Managers engagement is limited. Discussion goes down to the development level.
- Knowledge on Team’s B stack is getting distributed across developers with each contribution.
- Code and product quality increase (_"given enough eyeballs all bugs are shallow"_).
- Developers technical and domain knowledge increase. Developers have a chance to see different stacks, businesses,
  solutions and exchange information.

## Shared Component (Byproduct by design)

I also like to name it **Byproduct by design**. Teams share "byproducts" of their work on actual business projects in
the form of shared libraries, services, tools, scripts etc., promoting them to the global scale. The repository of the
shared code is opened for the external contribution. All (or elected) development teams are encourage to build new
solutions having reusability in mind. Development teams follow and promote the resuablity strategy. Instead of
hardcoding functions inside the main business projects teams decide to implement them as modularized, shareable
artifacts. Local builds evolve to the global cloud of microservice functions (FaaS) and components
(libraries, frameworks, tools, scripts).

**Shared Component** is in fact implemented as a side work of the main tasks bringing cost savings, architecture and
infrastructure simplification and knowledge distribution.

[//]: # (@formatter:off)
{{< figure src="/img/blog/innersource-essential-ways/innersource-3ways-shared-component.png" class="flex max-w-xs" >}}

[//]: # (@formatter:on)

### Scenario

All Teams need to implement functionalities that have a good potential to be reused by others. We all know the examples
of cross-cutting functions like email service, authentication, maker / checker or more business-specific yet still
required by other groups like FX service or payment service.

#### Problem (picture on the left)

Blue/Red/Green Teams are working on their main business projects. The teams implement all  
functionalities as a part of the main project's repository entangled wht their own specific business context.
Potentially reusable code is welded to the rest of a business project. All the effort that could be shared with other
groups is "wasted" locally not seeing the global picture.

#### InnerSource Solution (picture on the right)

Teams (especially team leaders) are encourage to design components having reusability in mind. The team brings the idea
to the constituted InnerSource Community. One of the team is contacted by other groups that have similar needs. The team
implements the component that right from the start is open to be extended with other’s needs (if any)
or/and in cooperation with external teams. The implementation can be a joint venture of different teams
(where for instance the Red Team takes the leadership - Trusted Committers). Implemented component is ready to be shared
globally. All the teams in order to contribute follow the guidelines depicted in the "Customer Contribution" process
(**"Pool request over Feature request"**). Red Team is the owner of the component in its initial life cycle. TCs of the
Red Team are responsible to look after the shared project. Number of TCs grows together with the popularity of the
repository.

#### Major Advantages

- Significant cost savings. No need to implement same functions in each and every product
- More stable solutions that evolve much faster than private repositories
- High quality of code and documentation achieved by transparency and business context agnostic implementations
- Higher synergy between the teams increases developers knowledge and reduces the risk of "one man army"
- Requirements unification become a real factor (e.g. common UI/UX design)

## Gig Marketplace

A marketplace for _#help-wanted_. Teams, developers, business analysts, managers, everyone is encouraged to ask for help
on the [Gig Marketplace](https://patterns.innersourcecommons.org/p/gig-marketplace). The "need" can be anything related
to our daily work. One can ask for review, feature, bugfix, training, UX work, KT, and more. Knowledge flows across the
entire firm in the natural way. Imagine that you can go beyond the software development departments so even your
business colleagues can ask for help.
**Gig Marketplace** likes but not requires some form of incentivisation (from just a scoring mechanism to quarter
awards). It might be also a part of the **Gamification** program.
**Gig Marketplace** can be implemented in the form of the [#help-wanted](https://github.com/topics/help-wanted)
known from the GitHub. Tickets become very easy to find.

[//]: # (@formatter:off)
{{< figure src="/img/blog/innersource-essential-ways/innersource-3ways-gig-marketplace.png" class="flex max-w-xs" >}}

[//]: # (@formatter:on)

### Scenario

Red Team have a need which cannot be resolved by its own resources, due to the lack of the required knowledge or the
functionality can be relatively easily implemented by an external contributor (e.g. training delivery, bugfix, feature,
component, etc.). Red Team's deadlines are getting closer. In fact there are multiple scenarios for the **Gig
Marketplace** including making the company a better place for people who stuck in tedious tasks or those wanted to try
to face some interesting problems.

#### Problem

Red Team is working on a project. The team has a specific need (can be functionality or training) which cannot be
resolved/delivered by any of the team's member due to the tight schedule or lack of knowledge. The team is struggling to
meet the dates. Red Team's manager decide to escalate the problem. As a result the Red Team borrows a developer from
other team or a consultant is plugged-in temporarily.

#### InnerSource Solution

**Gig Marketplace** is a perfect extension to the global cross-team contribution. The global community (Business and
Systems departments) browse the **Gig Marketplace** to look for interesting opportunities which suit their preferences /
interests (e.g. prepare a Tech Talk or Hibernate training, extend the email microservice, review other team's codebase
providing advice, anything we can imagine).
A [Contracted Contributor](https://patterns.innersourcecommons.org/p/contracted-contributor)
decides to pick up a ticket helping other departament to accomplish their tasks. The _Contracted Contributor_ brings the
value outside its local silo, gain the knowledge and makes new contacts globally (networking).
**Gig Marketplace** lifts the knowledge distribution to the next level giving the community occasion to ask for support
immediately without engaging the top-to-bottom approach (through managers) or searching for help contacting manager by
manager.

#### Major Advantages

- Supports the **InnerSource** initiative at scale without unnecessary process-related bottlenecks.
- Staff satisfaction increases. Developers can contribute to different areas, finding opportunities they are interested
  in most.
- Attrition slows down.
- Knowledge flows naturally in different directions.
- Transparency increases. Local silos become open for contribution.
- Bridges between different departments and between IT and Business appear in the most unexpected ways.

## Further reading and watching

- [Books](https://innersourcecommons.org/learn/books/)
- [Patterns](https://patterns.innersourcecommons.org/)
- [Awesome Repository](https://github.com/InnerSourceCommons/awesome-innersource)
- [YouTube](https://www.youtube.com/c/InnerSourceCommons)

## Thank you

If you find it interesting feel free to reach out to me!
You can find me on the social portals or contact me directly (links in the footer ⬇️).

Thank you


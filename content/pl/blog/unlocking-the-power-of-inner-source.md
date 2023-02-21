---
\[//]: # (@formatter:off)
author: Przemek Malirz 
title: "Unlocking the Power of InnerSource: Key Strategies You Can't Ignore" 
code: blog 
date: 2023-02-20
draft: false
description: What are the essential ways to execute the InnerSource practice at your company unlocking the power of collaboration and open communication?
keywords: [blog, innersource, collaboration, contribution, cross-team collaboration, silo, opensource inside the company, devops, cost savings, proprietary]
weight: 2
\[//]: # (@formatter:on)
---

I know that I should start with the definition of [InnerSource](https://innersourcecommons.org/). However, I just
couldn't resist to give you some concrete material to read earlier.

If you, like me, have been searching for ways to enhance collaboration among teams within your organization, or if
you're a CxO seeking to cultivate your company's culture, elevate the quality of your products, and simultaneously
reduce costs, then you should read this blog post.

[//]: # (@formatter:off)

<!-- TOC -->
  * [Customer Contribution (Pull request over Feature request)](#customer-contribution--pull-request-over-feature-request-)
    * [Scenario](#scenario)
      * [Common practice (picture on the left)](#common-practice--picture-on-the-left-)
      * [InnerSource Solution (picture ot the right)](#innersource-solution--picture-ot-the-right-)
      * [Major Advantages](#major-advantages)
  * [Shared Component (Byproduct by design)](#shared-component--byproduct-by-design-)
    * [Scenario](#scenario-1)
      * [Common practice (picture on the left)](#common-practice--picture-on-the-left--1)
      * [InnerSource Solution (picture on the right)](#innersource-solution--picture-on-the-right-)
      * [Major Advantages](#major-advantages-1)
  * [Gig Marketplace (#help-wanted)](#gig-marketplace--help-wanted-)
    * [Scenario](#scenario-2)
      * [Common practice](#common-practice)
      * [InnerSource Solution](#innersource-solution)
      * [Major Advantages](#major-advantages-2)
  * [Afterword](#afterword)
  * [Further materials](#further-materials)
  * [Thank you](#thank-you)
<!-- TOC -->

[//]: # (@formatter:on)

Establishing the **InnerSource** culture in an organization is not a trivial task. The larger the company, the harder it
is to change ingrained practices. Thankfully, you can implement InnerSource in small steps, and in fact, it is advisable
not to attempt to completely change your culture in a single day with a "big bang" approach. It is simply not
doable. [Start small](https://patterns.innersourcecommons.org/p/start-as-experiment), ideally suggesting the experiment.

I have found that introducing the concept to mid-managers or senior executives who have spent years in silo-based
environments can be a transformative experience. These individuals are often so focused on their local goals that they
may initially resist the idea of collaborating on a joint project, dismissing it as something they have tried before and
found not doable. I can relate to their perspective, having attempted to work on shared libraries in both my current and
past companies, with mixed results. However, I now recognize that my previous efforts were not informed by the powerful
[principles of InnerSource](https://patterns.innersourcecommons.org/), which can help overcome many of the obstacles
inherent in collaborative software development.

InnerSource is about more than just sharing code, though that is certainly an important aspect of it. At its core,
InnerSource is a philosophy that promotes **openness, transparency, and collaboration within organizations**, regardless
of whether the teams involved are geographically dispersed or co-located. By embracing InnerSource, organizations can
break down silos and foster a culture of continuous learning and improvement. Moreover, InnerSource can help teams move
beyond the limitations of traditional hierarchical structures, empowering developers to take ownership of their work and
contribute to the success of the entire organization.

In short, InnerSource represents a fundamental shift in the way that organizations approach software development. While
it may take some time for those who are used to working in a silo environment to fully appreciate its benefits, the
results are well worth the effort. I am personally excited to continue exploring this powerful approach to software
development and sharing my insights with others.

Let's explore three ways to selectively implement InnerSource. It's not necessary to apply all three methods to every
project or team. You have the flexibility to choose which methods to enable, per project and per area within the
company.

## Customer Contribution (Pull request over Feature request)

The Customer Contribution method is a crucial aspect of InnerSource practices, emphasizing the value of **Pull requests
over Feature requests**. By officially opening a project for external contributions, this approach enables the Customer
Team to actively participate in the development process by contributing to the project owned by the Vendor Team instead
of just requesting a specific feature. This not only fosters global communication and collaboration but also turns the
Customer Team into a vendor of additional features, creating a win-win situation for the both teams involved.

One of the key benefits of the Customer Contribution method is that it **replaces the traditional Escalation process
with open and constructive discussions between two development teams**. This shift promotes a more collaborative and
innovative culture, where everyone has a voice and is encouraged to share their ideas and insights. By removing barriers
to communication and empowering teams to work together, the Customer Contribution method lays the foundation for
successful InnerSource practices.

- **Vendor Team** - The [Core Team](https://patterns.innersourcecommons.org/p/core-team). This is the team that owning
  the project upon which other teams depend. The project might be either a core business project or a shared component
  (The red silo on the below picture).
- **Customer Team** - The team depends on the project owned by the Vendor Team or wants to reuse the shared component
  extending its functions (The blue and green silos on the below picture.

[//]: # (@formatter:off)
{{< figure src="/img/blog/innersource-essential-ways/innersource-3ways-customer-contribution.png" class="flex max-w-xs" alt="innersource-3ways-customer-contribution" >}}

[//]: # (@formatter:on)

### Scenario

The Blue/Green Teams work depends on the Red Team's project or the Blue/Green Teams would like to reuse a shared
component owned by the Red Team. The Blue/Green Teams require a new feature or extension to the Red Team's project.

#### Common practice (picture on the left)

The Green and Blue Teams have requested changes to the project being managed by the Red Team. However, due to a tight
schedule, the Red Team is unable to accommodate any additional work in the coming weeks or months. In order to address
the issue, the Blue and Green Teams have decided to escalate it to the attention of the senior management.
Unfortunately, this process can often be disruptive and lead to frustration and a growing sense of nervousness among
team members. As a result, much of the teams' time is spent on stressful calls instead of making progress on the
project.

#### InnerSource Solution (picture ot the right)

According to InnerSource practices, the Red Team collaborates with the Green and Blue teams to discuss necessary
changes. The Red Team provides accessible documentation, house rules for guests, and clear guidelines for contributions
in the project repository. The Green and Blue Teams then work on the changes as directed by the Red Team. Once
completed, the Blue/Green Team sends a pull request to the Red Team.
The [Trusted Committer](https://patterns.innersourcecommons.org/p/trusted-committer) (TC in the picture) from the Red
Team reviews the code and provides feedback with necessary adjustments. The Blue/Green Team developers make the required
changes and resubmit the code. The TC of the Red Team approves the changes and merges them into the production code base
while planning for release.

#### Major Advantages

- Escalation process is eliminated. Managers engagement is limited. Discussion goes down to the development level.
- Knowledge on Red Team's stack is getting distributed across external developers with each contribution.
- Code and product quality increase (_"given enough eyeballs all bugs are shallow"_).
- Developers technical and domain knowledge increase. Developers have a chance to see other practices, businesses,
  solutions and exchange information.

## Shared Component (Byproduct by design)

I like to call it **"Byproduct by Design"** and it is about **violating DRY principle at the global / company level**.
This approach involves teams sharing the "byproducts" of their work on real business projects, such as shared libraries,
services, tools, and scripts. These byproducts are then promoted on a global scale, and the repository of shared code is
open for external contributions. All development teams are encouraged to prioritize reusability when building new
solutions, and they follow and promote this strategy. Rather than hardcoding functions into the main business projects,
teams implement them as modularized, shareable artifacts. As a result, local builds can evolve into a global cloud of
microservice functions (FaaS) and components (libraries, frameworks, tools, and scripts).

The implementation of the **Shared Component** serves as an additional effort to the main tasks, resulting in cost
savings, simplified architecture and infrastructure, and wider distribution of knowledge. The shared component is
designed to complement the primary tasks and bring additional benefits to the organization.

[//]: # (@formatter:off)
{{< figure src="/img/blog/innersource-essential-ways/innersource-3ways-shared-component.png" class="flex max-w-xs" alt="innersource-3ways-shared-component" >}}

[//]: # (@formatter:on)

### Scenario

All Teams while working on the business project need to implement functionalities that have a good potential to be
reused by others. We all know the examples of cross-cutting functions like email service, authentication, maker /
checker or more business-specific yet still required by other groups like FX service or payment service.

#### Common practice (picture on the left)

The Blue/Red/Green Teams are currently focused on their main business projects. Each team is working on implementing
specific functionalities that are part of the project's repository, with a strong emphasis on their own unique business
context. Unfortunately, any potentially reusable code is being integrated into the local project, rather than being
shared with other groups. This approach is limiting the team's ability to see the big picture and collaborate on a
global level. The teams are duplicating efforts by developing solutions for the same or similar problems, instead of
building upon existing ones.

#### InnerSource Solution (picture on the right)

Teams, particularly team leaders, are encouraged to design components with reusability in mind. The team should then
present the idea to the Dev Community / InnerSource Leaders / Architecture Group. If other groups express similar needs,
the team can work together to create a component that is open to extension or cooperation with external teams. Multiple
teams can collaborate on the implementation, with the Red Team taking the lead as Trusted Committers. Once the component
is developed, it can be shared globally. To contribute to the component, teams must follow the guidelines outlined in
the "Customer Contribution" process, prioritizing _pull requests over feature requests_. During the initial life cycle
of the component, the Red Team serves as its owner, with the Trusted Committers responsible for maintaining the shared
project. As the popularity of the repository grows, the number of Trusted Committers may also increase.

#### Major Advantages

- Significant cost savings. No need to implement same functions in each and every product
- More stable solutions that evolve much faster than private repositories
- High quality of code and documentation achieved by transparency and business context agnostic implementations
- Higher synergy between the teams increases developers knowledge and reduces the risk of "one man army"
- Requirements unification become a real factor (e.g. common UI/UX design)

## Gig Marketplace (#help-wanted)

[Gig Marketplace](https://patterns.innersourcecommons.org/p/gig-marketplace) is a platform for requesting assistance
with work-related tasks. Whether you're a team, developer, business analyst, or manager, all are welcome to seek help on
Gig Marketplace. The range of help that can be requested includes reviews, feature requests, bug fixes, training, UX
work, KT, and more. This facilitates the natural flow of knowledge across the entire organization, extending beyond just
software development departments to include business colleagues. While incentivisation is not required, Gig Marketplace
does encourage it through mechanisms like scoring or quarterly awards, and it can also be integrated into a gamification
program. Gig Marketplace can be implemented similarly to [#help-wanted](https://github.com/topics/help-wanted) on
GitHub, making it easy to find and address tickets.

[//]: # (@formatter:off)
{{< figure src="/img/blog/innersource-essential-ways/innersource-3ways-gig-marketplace.png" class="flex max-w-xs" alt="innersource-3ways-gig-marketplace.png" >}}

[//]: # (@formatter:on)

### Scenario

The Blue Team is facing a challenge that cannot be resolved internally due to a lack of necessary knowledge or
resources. This challenge could be resolved by an external contributor, such as providing training, fixing a bug,
implementing a feature or component. Blue Team's deadlines are getting closer. It is imperative to seek external help in
order to overcome this challenge and meet the project's timeline.

#### Common practice

The Blue Team is experiencing a challenge with their project, as they have a particular requirement (could be a feature
or training) that none of the team members can address due to either a tight schedule or insufficient expertise.
Consequently, the team is encountering difficulties in meeting their deadlines. The manager of the Blue Team has decided
to escalate the matter, resulting in the team borrowing a developer from another team or engaging a consultant on a
temporary basis.

#### InnerSource Solution

The Gig Marketplace is an excellent addition to global collaboration between teams. Both the business and systems
departments of the global community can browse the marketplace for exciting opportunities that match their preferences
and interests. These opportunities can range from preparing a Tech Talk or Hibernate training to extending the email
microservice or reviewing codebases of other teams and providing advice. The Contracted Contributors can choose to take
on a task to help other departments accomplish their goals. This way,
the [Contracted Contributor](https://patterns.innersourcecommons.org/p/contracted-contributor) adds value beyond their
local silo, gains new knowledge, and makes global connections through networking.

The Gig Marketplace elevates the distribution of knowledge to a new level, providing the community with the opportunity
to seek immediate support without having to engage in a top-to-bottom approach through managers or searching for help by
contacting managers one by one.

#### Major Advantages

- Supports the **InnerSource** initiative at scale without unnecessary process-related bottlenecks.
- Staff satisfaction increases. Developers can contribute to different areas, finding opportunities they are interested
  in most.
- Attrition slows down.
- Knowledge flows naturally in different directions.
- Transparency increases. Local silos become open for contribution.
- Bridges between different departments and between IT and Business appear in the most unexpected ways.

## Afterword

I have made no assumption that the above methods are easy to implement. However, the problems you will encounter along
the way are usually known and not specific to your particular situation. For this reason, the
[InnerSource Commons Community](https://innersourcecommons.org/) is making its best efforts to help individuals and
companies from around the world sharing their hands-on knowledge in the form of educational materials, live sessions and
last but not least phenomenal [InnerSource Patterns](https://patterns.innersourcecommons.org/).

## Further materials

- [InnerSource Commons Community](https://innersourcecommons.org/)
- [InnerSource Slack](https://innersourcecommons.slack.com/)
- [Books](https://innersourcecommons.org/learn/books/)
- [Patterns](https://patterns.innersourcecommons.org/)
- [Awesome Repository](https://github.com/InnerSourceCommons/awesome-innersource)
- [YouTube](https://www.youtube.com/c/InnerSourceCommons)

## Thank you

If you find it interesting feel free to reach out to me!
You can find me on the social portals or contact me directly (links in the footer ⬇️).

_The diagrams have been made with use of
[Sketchbook](https://play.google.com/store/apps/details?id=com.adsk.sketchbook)_

Miłego dnia!


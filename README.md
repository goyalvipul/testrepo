# PR Review Exercise: Add Worker ratings

This repository contains an intentionally simplified project, and a single Pull Request (PR) for you to review. Instructions on how to run the project locally are included below. Note that testing is not included in this repository, and although this would be a concern in a real-life scenario, it will not be considered in-scope for this exercise.

## Brief

As context, assume you work at a company that powers a marketplace app for healthcare facilities to hire healthcare providers (a.k.a. workers). You are the Engineering Manager for the team that owns the backend service responsible for worker shift management. Your team is working on adding a new feature to your existing, in-use, production apps which will allow healthcare facilities to rate the job performed by the workers of the facility's shifts.

![Architecture Diagram](/assets/pr-review-diagram.png)

Your task is to review the PR submitted by a member of your team to implement new feature requirements below, and provide them with concise, specific, and actionable comments, including a top-level comment with your general assessment of their work (e.g. approve the submission, recommend or request changes, etc.).

## New Feature Requirements

* Description
  - Create interfaces to allow healthcare facilities to rate a worker's performance on a given shift, and potentially block the worker from applying to shifts posted by the healthcare facility in the future.
* Acceptance Criteria
  - The new interface to rate a worker's performance should be a REST endpoint that requires the following parameters as part of the JSON request body:
    - `shiftUuid`
    - `workerUuid`
    - `rating`
  - The value of `rating` should be an integer between 1 and 5, inclusive.
  - The new interface to block a worker from applying to a healthcare facility's future shifts should be a REST endpoint that requires the following parameters as part of the JSON request body:
    - `shiftUuid`
    - `workerUuid`
    - `blockReason`
  - Workers who have been blocked from applying to a healthcare facility's shifts should not be able to apply to shifts from the facility that blocked them

## Tips to be successful
- Clipboard is an intense environment, you can read about our [company values](https://creatingvalue.substack.com/p/clipboard-healths-company-values) (which we actually adhere to!) to get a feel for how we operate, but you should come to this assessment with the mindset that the level of work that you may have done in the past or typically think of as acceptable may not meet our bar here. We encourage you to put forth your best effort on this assignment, and push yourself further than you might ordinarily so that we're evaluating the best version of your work.
- Keep in mind that we are a fully remote and globally distributed engineering team, and it is not uncommon for PR authors and reviewers to be separated by many time zones. As a result, we’ve found it is crucial that PR comments are structured for efficient communication (minimizing back-and-forth), explain the "why", and are actionable for the author (often recommending a specific “at least as good as _this_”-style solution to the issue identified). In a live interview stage, we'll dig deeper into your comments, but they should stand on their own and explain the full depth of your reasoning without requiring in-person or verbal communication.
- Don’t be afraid to explore the project code beyond the diff, by downloading and exploring the code, running and debugging it locally, and/or using Github’s ‘.’ keyboard shortcut to open the pull request in the github.dev editor so you can see the surrounding unmodified code and to ensure you have full context on existing libraries and project settings.
- Focus your feedback on the changes in the Pull Request. Remember, the project is intentionally simplified, and some aspects that would conventionally be present are not included (e.g. authentication/authorization, test automation, etc.).
- The project already has certain design patterns in place, while they may not be ideal or follow best practices, avoid focusing on these subpar patterns for your review. Feel free to comment on them, but don't make it the focal part of your code review.
- The application uses [Prisma](https://www.prisma.io/) as an ORM layer; don't worry if you have never used Prisma before, the Prisma APIs used in this exercise are mostly quite intuitive, and there are no Prisma-specific "gotchas". Most importantly, Prisma's approach to modeling the data schema should be easy to follow, you can check the project's [data schema here](./prisma/schema.prisma), and feel free to reference the `.sql` files to get a sense for the actual underlying database structure.

**Don't forget to click "Submit" to Hatchways when you're done!**
![Submit to Hatchways](/assets/submit-to-hatchways.png)

## Helpful links

- As mentioned above, make sure you take a look to [the data schema](./prisma/schema.prisma) so you have this reference handy.
- The application exposes a REST API, which is defined in an Open API (formerly known as Swagger) schema, also [included in the project](./src/rest/v1/openapi.yml).
- The [Swagger Editor](https://editor.swagger.io/) is a great resource for exploring the Open API schema, copy and paste it the contents of the Open API schema in the editor to easily navigate it.

## Local Setup

Pre-requisites:

- Node.js version 16+ (https://nodejs.org/en/download/)
- Docker (https://docs.docker.com/get-docker/)
- docker-compose (https://docs.docker.com/compose/install/)

Clone the repository, `cd` into it, then run:

```sh
> $ npm i
```

The repository comes with a docker-compose.yml file to easily run PostgreSQL, to spin this up:

```sh
> $ docker-compose up -d
```

You should be able to connect to Postgres using any client at localhost:5432 (the default Postgres port). The credentials can be found in the `docker-compose.yml` file and in the `.env.sample` file. Make a copy of `.env.sample` and name it `.env`:

```sh
> $ cp .env.sample .env
```

Apply DB migrations with:

```sh
> $ npx prisma migrate dev
```

And finally, run the server with:

```sh
> $ npm start
```

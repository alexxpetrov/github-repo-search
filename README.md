# GitHub Issue Search

## Overview
Explore and visualize GitHub issues through a simple search bar. The search bar will take a GitHub repository URL and return all issues from that repository.

## Instructions

First and foremost, this project is meant to see how well you understand Nextjs / React / Typescript.
- Before you start read all of the tasks in this assignment and fill out the [planning section](#planning) below.
- Read through the project setup section.
- Please use [Shadcn](https://ui.shadcn.com/docs/components/accordion) UI Library for all components- install whatever you need.
- Use [Tailwind CSS](https://tailwindcss.com/docs) for styling.
- Use the [Github API](https://docs.github.com/en/rest/reference) as your source of data.

### Tasks

- Before you start fill out the [planning](#planning) section below.
- Create a search page with a search bar. Users should be able to paste a GitHub repo URL here.
- Create a results page that displays **all** (open, closed, pull requests) issues from the search query.
- Indicate which issues are closed or pull requests using [heroicons](https://github.com/tailwindlabs/heroicons).
- Implement filtering by open, closed, or pull requests on the results page.
- Add loading, empty, and error states.
- Once complete fill out the [Looking Back](#looking-back) section below and send us a link to your repo.

It is an MVP (minimum viable product) - done is better than perfect.

## Project Setup

- Create a repo
- Put this README.md in the project

Run the following commands

```bash
npx create-next-app@latest
```
Select yes to all options **except** to customize the default import alias
```bash
npm install @heroicons/react
```
To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# QnA

### Planning

> What do you think are the greatest areas of risk in completing the project?
Input and query parameters validation
Error handling
UI flow and Data flow separation

> What changes/additions would you make to the design?
I'd suggest a candidate to check the way "search" is implemented by Github team. It's easy to recognize why certain decisions were made

> List a two or three features that you would consider implementing in the future that would add significant value to the project.
Pagination
Tooltip with extra information about the issue

---

### Looking Back

> Describe the major design/build decisions and why you made them.
  I've decided to keep data and UI separately to effectively utilize Tanstack query and SSR, thus allowing us to make the data available faster on first load, while keeping the user satisfied with instant app response (e.g. loading animation). Zustand is used to keep the UI (form state and loading) organized

> How long did the assignment take (in hours)? Please break down your answer into buckets (e.g. "Learning Framework", "Coding", "Debugging").
  Longer than I originally anticipated.

Reading Github API docs: 0.5 hour
Learning Next.js: ~0.5-1 hour to organize routes, handle errors, read additional info on SSR.
Exploring Shadcn UI: ~0.5-1 hour. Didn't use it before
Coding: 4-5 hours. Setting up folder structure, organizing files, data/ui stores, creating components etc.
Debugging: ~1 hour. Had a couple issues with hydration and query parameters validation

I had a benefit of having my own next.js boilerplate (https://github.com/alexxpetrov/next-js-boilerplate), which made this section significantly faster

> If you could go back and give yourself advice at the beginning of the project, what would it be?
  Do not fetch the data once and filter it on the front end. ( Originally I thought I'd use filters on in-store data instead of re-fetching it )

> Did you learn anything new?
  Using Shadcn is a bless. Got much better at SSR Data flow and optimizations.

> Do you feel that this assignment allowed you to showcase your abilities effectively?
  Yes.

> Are there any significant web development-related skills that you possess that were not demonstrated in this exercise? If so, what are they?
  I think I did good enough with the stack I've chosen

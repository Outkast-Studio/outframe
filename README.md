# Outkast Sanity Starter Install Guide

This page serves as a guide to getting new projects set up with the Outkast Sanity starter template.

## Getting Started

### Step one: Clone the repo

Head to [Outkast Studio Sanity on GitHub](https://github.com/Outkast-Studio/Sanity) and clone the repo into a new directory on your local machine.

### Step two: Set up sanity

Run the following command in your terminal to set up a new sanity project. This step doesn't install anything but is used to create a new project.

```bash
npm -y create sanity@latest
```

### Step three: Update .env

Update the `.env` file with the project Id, a randomly generated revalidation key, and create a new read API token from Sanity.

### Step four: Create schemas

Create schemas inside the `Schemas` directory and make sure to import them into the `schema/index.ts` file.

### Step five: Update revalidate

For each dynamic slug route, you need to update the revalidation webhook located in `/api/revalidate.ts`. Follow the example of the `queryStaleWorkRoutes` function.

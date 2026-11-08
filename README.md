# Taskboard

A responsive task and productivity dashboard built with React. Users can browse tasks, search by title, filter by status or assigned user, view individual task details, and compare users’ completion progress.

## Features

- Search task titles without case sensitivity.
- Combine status and user filters.
- Display pending tasks before completed tasks.
- View task details through a dynamic route.
- See total, completed, and pending counts.
- Compare users ranked by completion percentage.
- Display loading, error, empty, and task-not-found messages.
- Use a responsive Tailwind CSS interface with an earth-tone palette.

Task completion statuses come from the API. This application does not edit or save tasks.

## Technology stack

React, React Router, TanStack Query, Tailwind CSS, Vite, and ESLint.

## Routes

| Route | Page |
| --- | --- |
| `/` | Task list, search, and filters |
| `/tasks/:id` | Details for the task matching the URL parameter |
| `/stats` | Overview counts and user completion rankings |

## Public API

Task data comes from [JSONPlaceholder](https://jsonplaceholder.typicode.com/).

- Task list: `https://jsonplaceholder.typicode.com/todos`
- Individual task: `https://jsonplaceholder.typicode.com/todos/:id`

## Data fetching and state

TanStack Query manages API requests and caching.

- `['tasks']` identifies the task list shared by Taskboard and Stats.
- `['task', id]` identifies each individual task.

Taskboard owns the search, status-filter, and user-filter state through `useState`. It passes values and setters to `TaskFilters` through props.

Filtered lists, statistics, and completion rankings are calculated from the fetched data. `PageLayout` provides the shared page structure and optional navigation.

## Setup

Install Node.js and npm, clone this repository, and open its project folder in a terminal.

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL printed in the terminal.

## Project checks

Check code quality:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Demonstrating UI states

- **Loading:** use network throttling with an uncached task request.
- **Error:** temporarily use an invalid API endpoint, reload, and restore the endpoint afterward.
- **Empty:** temporarily return an empty array from the list-fetching function, verify the message, and restore JSON parsing afterward.
- **No filter matches:** enter a search that matches no tasks.
- **Task not found:** visit `/tasks/999999`.

## Screenshots

### Taskboard

![Task list with search and filters](screenshots/taskboard.png)

### Stats

![Overview counts and user completion rankings](screenshots/stats.png)

### Task details

![Individual task details](screenshots/task-details.png)

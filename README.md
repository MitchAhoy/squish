# squish
A bug tracker app to help teams track and assign tasks.

See the live application here: https://squishapp.herokuapp.com/

## Tech stack

### Front end
- React
- Material-UI (including JSS)
- React Router DOM

### Back end
- Node.js
- Express

### Database
- MongoDB + Mongoose

### Deployment
- Heroku

## User Flow

### Structure
Rather than just having tasks in a flat structure, tasks are sorted into projects and organisations. The hierarchy that tasks follow are:
- Organisations 
  - Projects
    - Tasks

When a user signs in they are able to create an organisation and then create projects inside of that organisation. Inside of each project, a user can create tasks. 

At the task level, a user can create/edit the task title and description, assign the task, set a due date, set the priority as well as change the status of the task.

### Dashboard
Each user has their own dashboard. Here they are able to see all of the tasks that are assigned to them. These are filtered by status so a user can jump between the different dashboards by clicking on the status card.

### Database
The MongoDB database is made up 4 collections - users, organisations, projects, tasks.

It is a relational database in that the documents lower in the hierarchy keep the ids of the parent collections. For example - a task to keep in it the ids of the project and organisation it is in. This allows for sorting/editing at different levels.

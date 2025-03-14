# Welcome to Arkbites!

Arkbites is website with tools for helping players of the mobile game Arknights. Players can create an account to track their operators & materials, make squads with their operators, & favorite their operators.

**[🔭 Click here to visit the Arkbites website!](https://arkbites.com/)**

![Arkbites](https://github.com/user-attachments/assets/e424bbea-56b5-433f-988b-a8e699fa93a6)

Arkbites uses the following technologies:

| Frontend                                         | Backend                                          | Database                                         |
|--------------------------------------------------|--------------------------------------------------|--------------------------------------------------|
| [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/) [![Redux](https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux.js.org/) [![HTML](https://img.shields.io/badge/HTML-DC4A24?style=for-the-badge&logo=html5&logoColor=white)](https://html.spec.whatwg.org/multipage/) [![CSS](https://img.shields.io/badge/CSS-146eb0?style=for-the-badge&logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/Overview.en.html) | [![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)](https://python.org/) [![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=Flask&logoColor=white)](https://flask.palletsprojects.com/) [![SQLAlchemy](https://img.shields.io/badge/sqlalchemy-D71F00?style=for-the-badge&logo=sqlalchemy&logoColor=white)](https://www.sqlalchemy.org/) | [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/) [![SQLite3](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=SQLite&logoColor=white)](https://www.sqlite.org/) |

## Database Schema

![Arkbites Database Schema](https://github.com/user-attachments/assets/dbd19cc7-11ae-499d-b151-e52571a390b8)

## [Feature List](https://github.com/fayfan/Arkbites/wiki/Feature-List)

## [User Stories](https://github.com/fayfan/Arkbites/wiki/User-Stories)

## [Wireframes](https://github.com/fayfan/Arkbites/wiki/Wireframes)

## Local Setup

1. Clone this repository (only this branch).

2. Install dependencies.

   ```bash
   pipenv install -r requirements.txt
   ```

3. Create a __.env__ file based on the example with proper settings for your development environment.

4. Make sure the SQLite3 database connection URL is in the __.env__ file.

5. Get into your pipenv, migrate your database, seed your database, & run your Flask app:

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React frontend in development, `cd` into the __react-vite__ directory & run `npm i` to install dependencies. Next, run `npm run build` to create the `dist` folder. The starter has modified the `npm run build` command to include the `--watch` flag. This flag will rebuild the __dist__ folder whenever you change your code, keeping the production version up to date.

## Deployment through Render.com

Vite is a development dependency, so it will not be used in production. This means that you must already have the __dist__ folder located in the root of your __react-vite__ folder when you push to GitHub. This __dist__ folder contains your React code & all necessary dependencies minified & bundled into a smaller footprint, ready to be served from your Python API.

Begin deployment by running `npm run build` in your __react-vite__ folder & pushing any changes to GitHub.

Refer to [Render.com] for more detailed instructions about getting started, creating a production database, & deployment debugging tips.

From the Render [Dashboard], click on the "New +" button in the navigation bar, & click on "Web Service" to create the application that will be deployed.

Select that you want to "Build & deploy from a Git repository" & click "Next". On the next page, find the name of the application repo you want to deploy & click the "Connect" button to the right of the name.

Now you need to fill out the form to configure your app. Most of the setup will be handled by the __Dockerfile__, but you do need to fill in a few fields.

Start by giving your application a name.

Make sure the Region is set to the location closest to you, the Branch is set to "main", & Runtime is set to "Docker". You can leave the Root Directory field blank. (By default, Render will run commands from the root directory.)

Select "Free" as your Instance Type.

### Add environment variables

In the development environment, you have been securing your environment variables in a __.env__ file, which has been removed from source control (i.e., the file is gitignored). In this step, you will need to input the keys & values for the environment variables you need for production into the Render GUI.

Add the following keys & values in the Render GUI form:

- SECRET_KEY: [click "Generate" to generate a secure secret for production]
- FLASK_ENV: production
- FLASK_APP: app
- SCHEMA: arkbites

In a new tab, navigate to your dashboard & click on your Postgres database instance.

Add the following keys & values:

- DATABASE_URL: [copy value from the **External Database URL** field]

**Note:** Add any other keys & values that may be present in your local __.env__ file. As you work to further develop your project, you may need to add more environment variables to your local __.env__ file. Make sure you add these environment variables to the Render GUI as well for the next deployment.

### Deploy

Now you are finally ready to deploy! Click "Create Web Service" to deploy your project. The deployment process will likely take about 10-15 minutes if everything works as expected. You can monitor the logs to see your Dockerfile commands being executed & any errors that occur.

When deployment is complete, open your deployed site & check to see that you have successfully deployed your Flask application to Render! You can find the URL for your site just below the name of the Web Service at the top of the page.

**Note:** By default, Render will set Auto-Deploy for your project to true. This setting will cause Render to re-deploy your application every time you push to main, always keeping it up to date.

[Render.com]: https://render.com/
[Dashboard]: https://dashboard.render.com/

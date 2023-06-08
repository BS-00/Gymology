# Gymology
## CS35L Full Stack Web Project

### Tech Stack:
Frontend -- React, Bootstrap, Typescript, and Node
Backend  -- Express, MySQL, and Node


## Starting The Project Locally

### Prerequisite installations:
NPM, NodeJS, and MySQL80

### Instructions
- Run npm install in the root directory of the repository to generate node modules folders/populate them with dependencies

- Add a .env file to the 'frontend' and 'backend/express' folders 
(see the README in each folder for which environment variables need to be set)

- Start a local MySQL server

- Run the db_init script while in the 'backend/database' directory to initialize the local database with proper tables
  - If you get an error you might need to run this command in the mysql terminal: 
  ```
  ALTER USER '[username]'@'localhost' IDENTIFIED WITH mysql_native_password BY '[password]';
  ```

- Run npm start in the root directory to start both the frontend and backend
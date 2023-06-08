# Environment variables
## Create a .env file with these variables set in this directory:
MYSQL_USER (Username of the installed mysql instance)
MYSQL_PASS (Password for the set mysql user)
MYSQL_HOST (Host the database server is running on, 127.0.0.1 for local hosting)
MYSQL_PORT (Port the database is running on, 3306 is the default for mysql servers)
MYSQL_DB_NAME (Name of the database, can be anything, used for the db_init script and the express server)
EXPRESS_PORT (The name of the port the express server is running on)

## Example format:
MYSQL_USER=root
MYSQL_PASS=password
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_DB_NAME=gymology
EXPRESS_PORT=3001
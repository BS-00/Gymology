#!/bin/bash

# Path to this executable
BASH_PATH=$(dirname $0)
# Path to SQL source files
SRC="${BASH_PATH}/src"
# Path to environment variables
ENV="${BASH_PATH}/.."
# Files in SRC to be executed
FILES=('init.sql' 'tables.sql')

# Initializes environment variables
source "${ENV}/.env"

# Deletes existing database/creates new one by default
# Use --noinit to not drop the database on init
INIT_CMDS=("DROP DATABASE IF EXISTS ${MYSQL_DB_NAME};" "CREATE DATABASE ${MYSQL_DB_NAME};")
if [[ $* != *--noinit* ]]; then
  for INIT_CMD in "${INIT_CMDS[@]}"; do
    echo "Executing '${INIT_CMD}'..."
    mysql -h${MYSQL_HOST} -P${MYSQL_PORT} -u${MYSQL_USER} -p${MYSQL_PASS} -e "${INIT_CMD}" \
    2>&1 | grep -v "Using a password on the command line"
    
    
    if [ ${PIPESTATUS[0]} -eq 0 ]; then
      echo "Success"
    else
      echo "Problem, aborting..."
      exit 1
    fi
  done
fi

# Opens mysql terminal and executes each file in FILES in order
# On failure to properly execute,
  # The program will exit and the filename containing the error will be reported
  # Note the database may still be changed
# Ignores the command line password is insecure error
echo "Initializing ${MYSQL_DB_NAME}..."
for FILE in "${FILES[@]}"; do
	mysql -h${MYSQL_HOST} -P${MYSQL_PORT} -u${MYSQL_USER} -p${MYSQL_PASS} \
	<"${SRC}/${FILE}" 2>&1 \
	| grep -v "Using a password on the command line"
	
	if [ ${PIPESTATUS[0]} -eq 1 ]; then
		echo "in ${FILE}"
		exit 1
	fi
  echo "Sucessfully ran ${FILE}"
done

echo "Sucessfully initialized ${MYSQL_DB_NAME}"
exit 0

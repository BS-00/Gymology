#!/bin/bash

# Path to this executable
BASH_PATH=$(dirname $0)
# Path to SQL source files
SRC="${BASH_PATH}/src"
# Path to environment variables
ENV="${BASH_PATH}"
# Files in SRC to be executed
FILES=('init.sql' 'tables.sql')

# Initializes environment variables
source "${ENV}/.env"

# Opens mysql terminal and executes each file in FILES in order
# On failure to properly execute,
  # The program will exit and the filename containing the error will be reported
  # Note the database may still be changed
# Ignores the command line password is insecure error
for FILE in "${FILES[@]}"; do
	mysql -h${HOST} -P${PORT} -u${USER} -p${PASS} \
	<"${SRC}/${FILE}" 2>&1 \
	| grep -v "Using a password on the command line"
	
	if [ ${PIPESTATUS[0]} -eq 1 ]; then
		echo "in ${FILE}"
		exit 1
	fi
done
exit 0

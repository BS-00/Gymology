#!/bin/bash
source ../.env

SRC='./src'
FILES=('init.sql' 'tables.sql')

for FILE in "${FILES[@]}"; do
	mysql -h${MYSQL_HOST} -P${MYSQL_PORT} -u${MYSQL_USER} -p${MYSQL_PASS} --verbose \
	<"${SRC}/${FILE}" 2>&1 \
	| grep -v "Using a password on the command line"
	
	if [ ${PIPESTATUS[0]} -eq 1 ]; then
		echo "in ${FILE}"
		exit 1
	fi
done
exit 0

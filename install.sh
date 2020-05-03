#!/bin/bash

echo 'Deploy with env' $1

# install dependancies
npm install

# setup right config file
cp .env.$1 .env

# replace secrets
#bdPass = ${awk -F "=" '/MYSQL_PASSWORD_staging/ {print $2}' .secrets}

# build files
npm run build

# reload app
pm2 reload ecosystem.config.js --env $1



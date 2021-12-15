#!/usr/bin/env bash

# Added this here so if linting fails, then the script should return a
# non-zero exit code.
set -eo pipefail

if ! [ -d "node_modules" ]; then
    # run npm install to install dependencies
    npm install
fi

# Run unit tests
NODE_ENV=testing ./node_modules/.bin/jest

echo ''
echo ''
echo '======================================================================='
echo ''
echo ' 💪  All your tests passed!!!! 😎 💃 '
echo ''
echo '======================================================================='
echo ''
echo ''

exit 0

#!/bin/bash

web=/var/www/html
outerReact=$web/react
timestamp=$(date +%d.%m.%Y-%H:%M:%S)

# Rename old build
mv $outerReact/build $outerReact/build.v$timestamp
# Add new build
mv $web/github/react/build $outerReact/
# Create links
sh $web/github/create-links.sh

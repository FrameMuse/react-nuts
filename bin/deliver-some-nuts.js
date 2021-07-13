#! /usr/bin/env node
const shell = require("shelljs")
// - 1. Build typescript architecture
shell.exec(`sh ${__dirname}/lib/build-ts-arch.sh ${__dirname}`)
// - 2. Init typescript, eslint, git...
shell.exec(`sh ${__dirname}/lib/init-configs.sh ${__dirname}`)
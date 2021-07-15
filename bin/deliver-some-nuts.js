#! /usr/bin/env node
import shelljs from "shelljs"
// - 1. Build typescript architecture
shelljs.exec(`sh ${__dirname}/lib/build-ts-arch.sh ${__dirname}`)
// - 2. Init typescript, eslint, git...
shelljs.exec(`sh ${__dirname}/lib/init-configs.sh ${__dirname}`)
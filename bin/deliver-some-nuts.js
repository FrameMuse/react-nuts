#! /usr/bin/env node
import { exec } from "shelljs"
// - 1. Build typescript architecture
exec(`sh ${__dirname}/lib/build-ts-arch.sh ${__dirname}`)
// - 2. Init typescript, eslint, git...
exec(`sh ${__dirname}/lib/init-configs.sh ${__dirname}`)
#! /usr/bin/env node
import shelljs from "shelljs"
import { getPath } from "./scripts/command.js"
// - 1. Build typescript architecture
shelljs.exec(`sh ${getPath(import.meta.url)}/lib/build-ts-arch.sh ${getPath(import.meta.url)}`)
// - 2. Init typescript, eslint, git...
shelljs.exec(`sh ${getPath(import.meta.url)}/lib/init-configs.sh ${getPath(import.meta.url)}`)
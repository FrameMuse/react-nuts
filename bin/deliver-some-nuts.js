#! /usr/bin/env node
import shelljs from "shelljs"
import { currentPath } from "./scripts/command"
// - 1. Build typescript architecture
shelljs.exec(`sh ${currentPath}/lib/build-ts-arch.sh ${currentPath}`)
// - 2. Init typescript, eslint, git...
shelljs.exec(`sh ${currentPath}/lib/init-configs.sh ${currentPath}`)
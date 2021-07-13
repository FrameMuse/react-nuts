#! /usr/bin/env node
import { existsSync, mkdirSync, writeFileSync } from "fs"
/**
 * 
 * @param {string} name 
 * @returns if dir created
 */
function mkdir(name) {
  if (!existsSync(name)) {
    mkdirSync(name)
    return true
  }
  return false
}

class Arch {
  tree = new Map()

  mkdir(name) {
    const created = mkdir(name)
    this.tree.set(name, created)
  }

  visualize() {
    console.dirxml(...this.tree.entries)
  }
}

const arch = new Arch
arch.mkdir("src")
arch.mkdir("src/app")
arch.mkdir("src/app/controllers")
arch.mkdir("src/app/components")
arch.mkdir("src/app/reducers")
arch.mkdir("src/app/hooks")
arch.mkdir("src/app/api")
arch.mkdir("src/assets")
arch.mkdir("src/assets/scss")
arch.mkdir("src/assets/fonts")
arch.mkdir("src/views")
arch.visualize()

writeFileSync("src/views/index.tsx")
writeFileSync("src/assets/scss/base.scss")
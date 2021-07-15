#! /usr/bin/env node
import { readFileSync, writeFileSync } from "fs"
import { mkdir, nodeNameToClassName, revealVars } from "./scripts/command.js"

function revealContentVars(content) {
  const varsMap = {
    ComponentName: COMPONENT_NAME,
    ComponentStyleFile: COMPONENT_NAME + STYLE_EXT,
    ComponentStyleClassName: nodeNameToClassName(COMPONENT_NAME)
  }
  return revealVars(content.toString(), varsMap)
}


const COMPONENT_NAME = process.argv[2]
const COMPONENT_PATH = "src/app/components/" + COMPONENT_NAME + "/"

const COMPONENT_EXT = ".tsx"
const STYLE_EXT = ".style.scss"
const TEST_EXT = ".test.ts"

if (!mkdir(COMPONENT_PATH)) {
  throw new Error(`Component ${COMPONENT_NAME} path already exists, remove the whole folder to continue`)
}

const ComponentSample = readFileSync(__dirname + "/samples/component.sample.tsx")
const ComponentStyleSample = readFileSync(__dirname + "/samples/component.style.sample.scss")
const ComponentTestSample = readFileSync(__dirname + "/samples/component.test.sample.ts")

writeFileSync(COMPONENT_PATH + COMPONENT_NAME + COMPONENT_EXT, revealContentVars(ComponentSample))
writeFileSync(COMPONENT_PATH + COMPONENT_NAME + STYLE_EXT, revealContentVars(ComponentStyleSample))
writeFileSync(COMPONENT_PATH + COMPONENT_NAME + TEST_EXT, revealContentVars(ComponentTestSample))
// writeFileSync(COMPONENTS_PATH + INDEX_FILE)
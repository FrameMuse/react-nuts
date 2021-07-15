#! /usr/bin/env node
const { mkdirSync, readFileSync, writeFileSync, existsSync } = require("fs")

function mkdir(name) {
  if (!existsSync(name)) {
    mkdirSync(name)
    return true
  }
  return false
}

function getNodeNameElements(name) {
  return name.split(/([A-Z]{1,}[a-z]*)/g).filter(Boolean)
}

function nodeNameToClassName(nodeName) {
  const nodeNameElements = getNodeNameElements(nodeName)
  return nodeNameElements.map(element => element.toLowerCase()).join("-")
}

function replaceVariables(string, varsMap) {
  for (const varKey in varsMap) {
    if (Object.hasOwnProperty.call(varsMap, varKey)) {
      const varValue = varsMap[varKey]
      string = string.replace(new RegExp("$" + varKey, "g"), varValue)
    }
  }

  return string
}

function evalContentVariables(content) {
  const varsMap = {
    ComponentName: COMPONENT_NAME,
    ComponentStyleFile: COMPONENT_NAME + STYLE_EXT,
    ComponentStyleClassName: nodeNameToClassName(COMPONENT_NAME)
  }
  return replaceVariables(content.toString(), varsMap)
}


const COMPONENT_NAME = process.argv[2]
const COMPONENT_PATH = "src/app/components/" + COMPONENT_NAME + "/"

const COMPONENT_EXT = ".tsx"
const STYLE_EXT = ".style.scss"
const TEST_EXT = ".test.ts"
const INDEX_FILE = "index.ts"

if (!mkdir(COMPONENT_PATH)) {
  throw new Error(`Component ${COMPONENT_NAME} path already exists`)
}

const ComponentSample = readFileSync(__dirname + "/samples/component.sample.tsx")
const ComponentStyleSample = readFileSync(__dirname + "/samples/component.style.sample.scss")
const ComponentTestSample = readFileSync(__dirname + "/samples/component.test.sample.ts")

writeFileSync(COMPONENT_PATH + COMPONENT_NAME + COMPONENT_EXT, evalContentVariables(ComponentSample))
writeFileSync(COMPONENT_PATH + COMPONENT_NAME + STYLE_EXT, evalContentVariables(ComponentStyleSample))
writeFileSync(COMPONENT_PATH + COMPONENT_NAME + TEST_EXT, evalContentVariables(ComponentTestSample))
// writeFileSync(COMPONENTS_PATH + INDEX_FILE)
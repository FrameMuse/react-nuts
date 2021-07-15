import { existsSync, mkdirSync } from "fs"
import { dirname } from "path"
import { fileURLToPath } from "url"

export const getPath = url => dirname(fileURLToPath(url))

export function mkdir(name) {
  if (!existsSync(name)) {
    mkdirSync(name)
    return true
  }
  return false
}

function getNodeNameElements(name) {
  return name.split(/([A-Z]{1,}[a-z]*)/g).filter(Boolean)
}

export function nodeNameToClassName(nodeName) {
  const nodeNameElements = getNodeNameElements(nodeName)
  return nodeNameElements.map(element => element.toLowerCase()).join("-")
}

export function revealVars(string, varsMap) {
  for (const varKey in varsMap) {
    if (Object.hasOwnProperty.call(varsMap, varKey)) {
      const varValue = varsMap[varKey]
      string = string.replace(new RegExp("\\$" + varKey, "g"), varValue)
    }
  }

  return string
}
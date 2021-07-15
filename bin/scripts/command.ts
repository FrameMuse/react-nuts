import { existsSync, mkdirSync } from "fs"

export function mkdir(name: string) {
  if (!existsSync(name)) {
    mkdirSync(name)
    return true
  }
  return false
}

function getNodeNameElements(name: string) {
  return name.split(/([A-Z]{1,}[a-z]*)/g).filter(Boolean)
}

export function nodeNameToClassName(nodeName: string) {
  const nodeNameElements = getNodeNameElements(nodeName)
  return nodeNameElements.map(element => element.toLowerCase()).join("-")
}

export function revealVars(string: string, varsMap: Record<string, string>) {
  for (const varKey in varsMap) {
    if (Object.hasOwnProperty.call(varsMap, varKey)) {
      const varValue = varsMap[varKey]
      string = string.replace(new RegExp("\\$" + varKey, "g"), varValue)
    }
  }

  return string
}
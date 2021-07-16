#! /usr/bin/env node
import { readFileSync, writeFileSync, appendFileSync } from "fs"
import { getPath, mkdir, revealVars } from "./scripts/command.js"

function revealContentVars(content) {
  const varsMap = {
    ViewName: VIEW_NAME
  }
  return revealVars(content.toString(), varsMap)
}

function appendOriginRoutes(view, ...flags) {
  appendFileSync(
    ORIGIN_ROUTES,
    `Route.path("${view}", view("${view}"), ${flags.map(flag => `"${flag.toUpperCase()}"`).join(", ")})`
  )
}

const VIEW_NAME = process.argv[2]
const VIEW_FLAGS = process.argv.slice(3)
const VIEW_PATH = "src/views/" + VIEW_NAME + "/"
const ORIGIN_ROUTES = "src/routes/origin.ts"

if (!mkdir(VIEW_PATH)) {
  throw new Error(`Component ${VIEW_NAME} path already exists, remove the whole folder to continue`)
}

const ViewSample = readFileSync(getPath(import.meta.url) + "/samples/view.sample.ts")

writeFileSync(VIEW_PATH + "index.ts", revealContentVars(ViewSample))
appendOriginRoutes(VIEW_NAME, ...VIEW_FLAGS)
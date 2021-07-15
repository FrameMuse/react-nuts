#! /usr/bin/env node
const { readFileSync, writeFileSync, appendFileSync } = require("fs")
const { mkdir, revealVars } = require("./scripts/command")

function revealContentVars(content) {
  const varsMap = {
    ViewName: VIEW_NAME
  }
  return revealVars(content.toString(), varsMap)
}

function appendOriginRoutes(route, view, ...flags) {
  appendFileSync(
    ORIGIN_ROUTES,
    `Route.path("${route}", view("${view}"), ${flags.map(flag => `"${flag.toUpperCase()}"`).join(", ")})`
  )
}

const VIEW_ROUTE = process.argv[2]
const VIEW_NAME = process.argv[3]
const VIEW_FLAGS = process.argv.slice(4)
const VIEW_PATH = "src/views/" + VIEW_NAME + "/"
const ORIGIN_ROUTES = "src/routes/origin.ts"

if (!mkdir(COMPONENT_PATH)) {
  throw new Error(`Component ${VIEW_NAME} path already exists, remove the whole folder to continue`)
}

const ViewSample = readFileSync(__dirname + "/samples/view.sample.ts")

writeFileSync(VIEW_PATH + "index.ts", revealContentVars(ViewSample))
appendOriginRoutes(VIEW_ROUTE, VIEW_NAME, ...VIEW_FLAGS)
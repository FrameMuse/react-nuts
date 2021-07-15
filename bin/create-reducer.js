#! /usr/bin/env node
import { readFileSync, writeFileSync } from "fs"
import { getPath } from "./scripts/command.js"

const __DIR__ = process.env.INIT_CWD + "/src/app/reducers"
const REDUCERS_MAP_PATH = __DIR__ + "/reducers.map.json"
const REDUCER_SAMPLE_PATH = getPath(import.meta.url) + "/samples/reducer.sample.ts"
const REDUCER_NAME = process.argv[2]

function createReducer() {
  const reducerPath = __DIR__ + "/" + REDUCER_NAME + ".ts"
  writeFileSync(reducerPath, readFileSync(REDUCER_SAMPLE_PATH))
}

function createReducersMap() {
  const reducersMapFile = readFileSync(REDUCERS_MAP_PATH)
  const reducersMapJson = JSON.parse(reducersMapFile)

  const data = {
    ...reducersMapJson,
    [REDUCER_NAME]: "./" + REDUCER_NAME + ".ts"
  }

  return JSON.stringify(data, null, 2)
}

createReducer()
writeFileSync(REDUCERS_MAP_PATH, createReducersMap())
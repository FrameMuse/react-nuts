import type { Reducer } from "react"
import { combineReducers } from "redux"
import reducersMap from "./reducers.map.json"
export const combinedReducers = combineReducers({
  ...requireReducers()
})

function requireReducers() {
  type R = Reducer<unknown, unknown>
  const reducers: Record<string, R> = {}
  for (const reducer in reducersMap) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    reducers[reducer] = require(reducer) as R
  }
  return reducers
}

Object.seal(combinedReducers)
Object.freeze(combinedReducers)


import { useLayoutEffect } from "react"
import { useSelector } from "react-redux"
import BrowserHistory from "resources/stores/BrowserHistory"

export default function useRestrictedArea(enabled = true) {
  const modes = useSelector(state => state.modes)

  if (!enabled) {
    return
  }

  // useLayoutEffect(() => {
  if (modes.demo) {
    BrowserHistory.replace("/")
  }
  // }, [modes])
}

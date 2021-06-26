

import { classWithModifiers } from "../../../resources/utils"
// SCSS
import "../../../assets/scss/components/circle-status.scss"

function Status({ active = false }) {
  return <span className={classWithModifiers("circle-status", active ? ["active"] : [])} />
}

export default Status

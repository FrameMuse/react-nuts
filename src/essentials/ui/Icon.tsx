

import { classWithModifiers } from '../../../resources/utils'

export default function Icon({ name = "" }) {
  return <span className={classWithModifiers("icon", name ? [name] : [])} />
}

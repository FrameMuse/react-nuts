

import { useContext } from "react"
import { PopupContext } from "../../app/components/popup/PopupProvider"
import { PopupQueue } from "../../app/controllers/Popup"

export default function usePopupContext() {
  const popupContext = useContext(PopupContext)

  return {
    ...popupContext,
    Component: undefined
  } as Omit<PopupQueue, "Component">
}

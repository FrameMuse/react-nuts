import React from "react"
import { classWithModifiers, getlast } from "@framemuse/essentials.utils"
import { PopupContext } from "./context"
import { Popup } from "./controller"
import { PopupWindow } from "./interfaces"

export interface PopupProviderProps { }
export interface PopupProviderState {
  display: boolean
  queue: PopupWindow[]
}

export class PopupProvider extends React.Component<PopupProviderProps, PopupProviderState> {
  state: PopupProviderState = {
    display: false,
    queue: []
  }

  constructor(props: any) {
    super(props)
    // Set Popup updater
    Popup.dispatch = this.setState.bind(this)
  }

  render() {
    const { display, queue } = this.state
    const lastPopup = getlast(queue)
    const { component: PopupWindowComponent, params = {}, close } = lastPopup || {}
    return (
      <div className={classWithModifiers("popup", [display ? "display" : null])}>
        <div className="popup__container" onClick={close}>
          <div className="popup__inner" onClick={event => event.stopPropagation()}>
            <PopupContext.Provider value={lastPopup}>
              {PopupWindowComponent && <PopupWindowComponent {...params} />}
            </PopupContext.Provider>
          </div>
        </div>
      </div >
    )
  }
}

export default PopupProvider


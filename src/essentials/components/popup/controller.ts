import React, { SetStateAction } from 'react'
import { PopupComponent, PopupParams, PopupWindow } from './interfaces'
import { PopupProviderState } from './provider'

type AnyIfEmpty<T extends object> = keyof T extends never ? any : T;

export class Popup {
  public static dispatch: React.Dispatch<SetStateAction<PopupProviderState>>
  public static open
    <P extends object = {}, AC extends Partial<PopupParams> & P = Partial<PopupParams> & P>
    (component: PopupComponent<P>, ...[params]: (AnyIfEmpty<P> extends object ? [AC] : [AC?])): Promise<void> {
    return new Promise<void>(function (resolve) {
      const popupWindow = { component, params, close }
      Popup.addToQueue(popupWindow)
      function close() {
        resolve()
        Popup.removeFromQueue(popupWindow)
      }
    })
  }
  private static addToQueue(popupWindow: PopupWindow<any>) {
    Popup.dispatch(state => ({
      display: true,
      queue: [...state.queue, popupWindow]
    }))
  }
  private static removeFromQueue(popupWindow: PopupWindow<any>) {
    Popup.dispatch(state => {
      const queue = state.queue.filter(pw => pw !== popupWindow)
      return {
        display: queue.length > 0,
        queue
      }
    })
  }
  public static closeAll() {
    Popup.dispatch(state => {
      state.queue.forEach(popup => popup.close())
      return {
        display: false,
        queue: []
      }
    })
  }
}

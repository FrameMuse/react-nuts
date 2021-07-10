import React from 'react'
import { classAssign } from '@framemuse/essentials.utils'
import usePopupContext from './usePopupContext'

interface PopupDefaultLayoutProps {
  children: any
  className?: string
  rowGap?: string
  width?: string
  title?: any
  desc?: any
  nofooter?: boolean
}

export function PopupDefaultLayout({ children, className, title, desc, rowGap, width, nofooter }: PopupDefaultLayoutProps) {
  const { params, close } = usePopupContext()
  return (
    <div className="popup-content" style={{ width }}>
      {(title || desc) && (
        <PopupHeading title={title} desc={desc} />
      )}
      <div className={classAssign(["popup-content__body", className])} style={{ rowGap }}>{children}</div>
      {!nofooter && (
        <div className="popup-content__footer">
          <div className="popup-content__text">
            Есть вопросы? Пишите в группу поддержки ВКонтакте
          </div>
        </div>
      )}
    </div>
  )
}

interface PopupHeadingProps {
  title?: any
  desc?: any
}

interface PopupHeadingProps {
  children?: any
}

export function PopupHeading(props: PopupHeadingProps) {
  return (
    <div className="popup-heading">
      <div className="popup-heading__title">{props.title}</div>
      <div className="popup-heading__desc">{props.desc || props.children}</div>
    </div>
  )
}

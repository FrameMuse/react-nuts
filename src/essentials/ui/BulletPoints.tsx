import { Children, ReactElement } from "react"

export function BulletPoints({ children }: { children?: ReactElement<HTMLElement>[] }) {
  return (
    <div className="bullet-points">
      {Children.map(children, (child, index) => (
        <div className="bullet-points__point" key={index}>
          <div className="bullet-points__shape">
            <span className="bullet-points__index">{index}</span>
          </div>
          <div className="bullet-points__container">
            {child?.props?.title && <div className="bullet-points__title">{child.props.title}</div>}
            <p className="bullet-points__desc">{child?.props?.children}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

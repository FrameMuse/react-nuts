import { RouteComponentProps } from "react-router-dom"

interface StaticContext {
  statusCode?: number;
}

export type View<P = Record<string, unknown>> = ((props: ViewProps<P>) => JSX.Element) | React.LazyExoticComponent<React.ComponentType<any>>
export type ViewProps<Params = Record<string, unknown>> = RouteComponentProps<Params, StaticContext, unknown>

export type RouteFlag = "EXACT_PATH"
export type Routes = Record<string, ViewRouterComponentProps>

export interface ViewRouterProps {
  lazy?: boolean
  loginByPassword?: string
}

export interface ViewRouterComponentProps {
  path: string | string[]
  view: View
  flags: RouteFlag[]
  // ...
}

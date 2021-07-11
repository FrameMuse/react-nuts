/* eslint-disable @typescript-eslint/no-var-requires */
import { lazy } from "react"
import { Route as DOMRoute, RouteComponentProps, Switch } from "react-router-dom"
import { RouteFlag, ViewRouterComponentProps, ViewRouterProps, Routes, View } from "./interfaces"
import { Exception } from "src/utils/utils"

const VIEWS_PATH = "views/" // Absolute path to views

function ViewRouterComponent(combinedProps: ViewRouterComponentProps & RouteComponentProps) {
  return (
    <combinedProps.view {...combinedProps} />
  )
}

export function ViewRouter(props: ViewRouterProps) {
  ResolveViewRouterProps(props)
  const routesKeys = Object.getOwnPropertyNames(Route.routes)
  return (
    <Switch>
      {routesKeys.map((routeKey, index) => {
        const route = Route.routes[routeKey]
        return (
          <DOMRoute
            key={"route_" + index}
            path={route.path}
            exact={route.flags.includes("ExactPath")}
            render={props => <ViewRouterComponent {...route} {...props} />}
          />
        )
      })}
    </Switch>
  )
}

function ResolveViewRouterProps(props: ViewRouterProps): boolean {
  if (props.loginByPassword) {
    const access = localStorage.getItem("Access")

    if (props.loginByPassword !== access) {
      const result = window.prompt("Сайт доступен только по паролю. Писать суда @FrameMuse", "Введите пароль:")

      if (result !== props.loginByPassword) {
        return ResolveViewRouterProps(props)
      }
    }

    localStorage.setItem("Access", props.loginByPassword)
  }

  Route.lazy = props.lazy

  if (process.env.NODE_ENV === "development") {
    console.log("ViewRouter promises resolved!")
  }

  return true
}

export function view<P = unknown>(page: string): View<P> {
  try {
    if (Route.lazy) {
      return lazy(() => import(VIEWS_PATH + page))
    }

    return require(VIEWS_PATH + page).default
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      throw new Exception("ViewRouter", page + " not found", error)
    }
  }

  return require(VIEWS_PATH + page).default
}

export class Route {
  public static lazy?: boolean
  public static routes: Routes = {}
  public static path<T extends string = string>(path: T, view: View, flags: RouteFlag[] = []) {
    this.routes[path] = {
      path,
      view,
      flags
    }
  }
}

/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "assets/scss/base.scss";
import "assets/scss/svg.scss";
import "assets/scss/icons.scss";
import "assets/scss/components/button.scss";
import "assets/scss/components/weapon.scss";
import "assets/scss/components/case-state.scss";
import "assets/scss/components/user-stats.scss";
import "assets/scss/components/bonus-box.scss";
import "assets/scss/popups/auth.scss";
import "assets/scss/popups/bonus-single.scss";
import "assets/scss/popups/withdraw.scss";
import "assets/scss/views/cases-lists.scss";
import "assets/scss/views/case.scss";
import "assets/scss/views/payment.scss";
// STAFF
import React, { Component, StrictMode, Suspense, useEffect } from "react";
import { Provider } from "react-redux";
import { Router as BrowserRouter } from "react-router-dom"
import WebStore from "../resources/stores/store";
import Enhancments from "./Enhancments";
import { ClientContextProvider } from "react-fetching-library";
import { ClientAPI } from "./api/client";
import Preload from "./Preload";
import Loader from "./components/other/Loader";
import MiniWheel from "./components/other/MiniWheel";
import ErrorsStack from "./components/other/ErrorsStack";
import BrowserHistory from "../resources/stores/BrowserHistory";
import BonusCaseNotify from "./components/UI/BonusCaseNotify";
import PopupNotification from "./components/popup/PopupNotification";
import useTranslation from "resources/hooks/useTranslation";
import { errorReports } from "index";
import { updateUserInfo } from "resources/reducers/user";
import Button from "./components/UI/Button";
import { observable } from "mobx";
import { state } from "resources/react-decorators/lifecycle";
import { observer } from "mobx-react";
// import * as serviceWorker from "serviceWorker"

const Header = React.lazy(() => import("../views/header"))
const Router = React.lazy(() => import("./Router"))
const Footer = React.lazy(() => import("../views/footer"))
const PopupProvider = React.lazy(() => import("./components/popup/PopupProvider"))

// ------ Safari audio fix
function unlockAudio() {
  const sound1 = new Audio();

  sound1.play().catch(() => { });
  sound1.pause();
  sound1.currentTime = 0;

  document.body.removeEventListener('keydown', unlockAudio)
  document.body.removeEventListener('mousedown', unlockAudio)
  document.body.removeEventListener('touchstart', unlockAudio)
}

document.body.addEventListener('keydown', unlockAudio);
document.body.addEventListener('mousedown', unlockAudio);
document.body.addEventListener('touchstart', unlockAudio);
// ------ Safari audio fix
export default class App extends Component {
  componentDidCatch(error: any, errorInfo: any) {
    errorReports.push({
      error: {
        message: `React Component Info [${error.message}]`,
        stack: errorInfo.componentStack
      }
    } as any)
    // Reveal errors updating 'user'
    WebStore.store.dispatch(updateUserInfo({ balance: Date.now() }))
  }
  render() {
    return (
      <StrictMode>
        <ClientContextProvider client={ClientAPI}>
          <Preload>
            <Provider store={WebStore.store}>
              <BrowserRouter history={BrowserHistory}>
                <Enhancments />
                <StandoffCase />
              </BrowserRouter>
            </Provider>
          </Preload>
        </ClientContextProvider>
      </StrictMode>
    )
  }
}


class Asd extends Component {
  @state count = 0
  increment = () => {
    this.count++
  }
  render() {
    return (
      <Button onClick={this.increment}>Increase: {this.count}</Button>
    )
  }
}

// function Asd() {
//   const [count, setcount] = useState(0)
//   const increment = () => {
//     count++
//   }
//   return (
//     <Button onClick={increment}> Increase: {count}</Button>
//   )
// }

function StandoffCase() {
  return (
    <Suspense fallback={<Loader />}>
      <Header />
      <main>
        <Asd />
        <Router lazy loginByPassword="I think I see the future" />
      </main>
      <Footer />
      <MiniWheel />
      <BonusCaseNotify />
      <PopupNotification />
      <PopupProvider />
      <ErrorsStack />
      <UpdateMetaTags />
    </Suspense>
  )
}

// class Asd extends Component {
//   state = {
//     count: 0
//   }
//   increment = () => {
//     this.setState({
//       count: this.state.count + 1
//     })
//   }
//   render() {
//     return (
//       <Button onClick={this.increment}>Increase: {this.state.count}</Button>
//     )
//   }
// }

function UpdateMetaTags() {
  const head = useTranslation(trans => trans.head)
  useEffect(() => {
    function setMeta(query: string, content?: string) {
      const meta = window.document.querySelector(`[${query}]`) as HTMLMetaElement | null
      if (meta && content) {
        meta.content = content
      }
    }

    window.document.title = head.title || "title"

    setMeta('name="description"', head.description)
    setMeta('name="keywords"', head.keywords)
    setMeta('property="og:title"', head["og:title"])
    setMeta('property="og:description"', head["og:description"])

  }, [head])
  return null
}

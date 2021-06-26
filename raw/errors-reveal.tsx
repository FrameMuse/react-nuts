/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import Button from "app/components/UI/Button";
import { errorReports } from "index";
import { useLayoutEffect, useState } from "react";
import WebStore from "resources/stores/store";
import { download, getlast } from "resources/utils";

export default function ErrorsReveal() {
  const [, setErrorEvent] = useState(getlast(errorReports))
  useLayoutEffect(() => {
    const updateEvent = () => setErrorEvent(getlast(errorReports))
    WebStore.subscribe(updateEvent)
    window.addEventListener("error", updateEvent)
  }, [])
  function rewriteObject(object: any) {
    const writtenObject = {} as any
    for (const key in object) {
      const value = object[key]
      writtenObject[key] = value
    }
    return writtenObject
  }
  function getEvent(errorEvent?: ErrorEvent) {
    if (!errorEvent) return null

    const errorObject = rewriteObject(errorEvent)

    if (errorObject.error) {
      errorObject.error = {
        message: errorObject.error.message,
        stack: errorObject.error.stack.split("\n    ")
      }
    }

    delete errorObject.path
    delete errorObject.target
    delete errorObject.srcElement
    delete errorObject.currentTarget

    return errorObject
  }
  function downloadReports() {
    const stringifiedErrorReports = errorReports.reduce((result, report, index) => {
      return result + "\n\n" + `${index}: ` + JSON.stringify(getEvent(report), null, 2)
    }, "")

    download("error-reports", stringifiedErrorReports)
  }
  if (errorReports.length < 1) return null

  return (
    <div className="errors-reveal">
      <div className="errors-reveal__header">
        <h2 className="errors-reveal__title">
          Произошла ошибка
        </h2>
        <h3 className="errors-reveal__desc">
          Вам следует сообщить об ошибке (кликните на текст ниже чтобы выделить):
        </h3>
        <a className="button button--green" rel="noopener noreferrer" target="_blank" href="https://github.com/FrameMuse/bug-free-octo-tribble/issues">
          <span className="button__text">Сообщить об ошибке</span>
        </a>
        <Button color="orange" onClick={downloadReports}>Скачать ошибки</Button>
      </div>
      <div className="errors-reveal__body">
        {errorReports.map((report, index) => (
          <pre className="errors-reveal__error" key={"report_" + index}>{JSON.stringify(getEvent(report), null, 2)}</pre>
        ))}
      </div>
    </div>
  )
}

// @ts-expect-error no file type
import HTMLParse, { HTMLReactParserOptions } from "html-react-parser"
import { createElement } from "react"
import { Link } from "react-router-dom"
import { randomInt } from "./random"

export function shuffle<T extends unknown[] = unknown[]>(...items: T) {
  for (const item of items) {
    const index = items.indexOf(item)

    const randomIndex = randomInt(0, index)
    const randomItem = items[randomIndex]

    items[index] = randomItem
    items[randomIndex] = item
  }
  return items
}

/*
* URL.createObjectURL()
*/

const options: HTMLReactParserOptions = {
  htmlparser2: {
    lowerCaseTags: false
  },
  replace: (domNode: any) => {
    if (domNode.name === "link") {
      return createElement(Link, domNode.attribs)
    }
  }
}

export function $var(text: string, vars: Record<string, string | number | undefined>) {
  for (const Var in vars) {
    if (Object.prototype.hasOwnProperty.call(vars, Var)) {
      text = text.replace(new RegExp("\\$" + Var, "g"), String(vars[Var]))
    }
  }
  return text
}

export function interpolate(text?: string, vars?: Record<string, string | number | undefined>) {
  if (!text) {
    return ""
  }

  if (vars) {
    text = $var(text, vars)
  }

  // Search for HTML symbols
  if (text.search(/<.*>/)) {
    return HTMLParse(text, options)
  }

  return text
}

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function isVideo(file: string): boolean {
  const file_ext = file.split(".").pop()
  const video_exts = ["mpg", "fl4", "mpeg", "webm", "mov", "moov", "avi", "mp4", "3gp"]

  if (!file_ext) {
    return false
  }

  return video_exts.includes(file_ext!)
}

export function scrollIntoViewSmoothly(string: string, smooth = true): void {
  const element: HTMLElement | null = document.getElementById(string)
  if (element) {
    element.scrollIntoView({
      behavior: smooth ? "smooth" : "auto",
      block: "center",
      inline: "center"
    })
  }
}

export function getlast<A = unknown>(list: A[]): A | undefined {
  const lastIndex = list.length - 1
  const lastElement = list[lastIndex]

  return lastElement
}

export function disableEffects(event: Event) {
  event.preventDefault()
  event.stopPropagation()
  event.cancelBubble = true

  return undefined
}

export function _EXPENSIVE_areEquivalent<T extends { [x in any]: any } = any>(a: T, b: T): boolean {
  const aProps = Object.getOwnPropertyNames(a)
  const bProps = Object.getOwnPropertyNames(b)

  if (aProps.length !== bProps.length) {
    return false
  }

  for (const key in aProps) {
    if (Object.prototype.hasOwnProperty.call(aProps, key)) {
      if (a[key] !== b[key]) {
        return false
      }
    }
  }

  return true
}

export function IndexArray<T = unknown>(array: T[]): (T & { index: number })[] {
  return array.map((item, index) => ({ ...item, index }))
}

export function CreateQuery<O extends Record<any, any> = Record<any, any>>(queryObject: O): string {
  let queryProps = Object.getOwnPropertyNames(queryObject)
  if (queryProps.length === 0) {
    return ""
  }

  queryProps = queryProps.filter(Boolean)
  queryProps = queryProps.map(prop => {
    const entry = queryObject[prop]
    return `${encodeURIComponent(prop)}=${encodeURIComponent(entry)}`
  })

  return queryProps.join("&")
}

export function limit(value: number, min = 0, max = 0) {
  if (min && value < min) return min
  if (max && value > max) return max

  return value
}

export function qsort<N extends number = any>(array: N[]): N[] {
  if (array.length < 2) return array

  const left = []
  const right = []
  const pivot = array[0]

  for (const element of array) {
    if (pivot > element) {
      left.push(element)
      continue
    }

    right.push(element)
  }

  return [...qsort(left), pivot, ...qsort(right)]
}

/**
 * 
 * @param p1 current time
 * @param start start value
 * @param increment change in value
 * @param p2 duration
 */
export function easeInOutQuad(p1: number, p2: number, increment = 0, start = 0) {
  p1 /= p2 / 2

  if (p1 < 1) {
    return (increment / 2) * (p1 ** 2) + start
  } else {
    p1--
    return (-increment / 2) * (p1 * (p1 - 2) - 1) + start
  }
}

export function unescapeHTMLEnteriesSafe(chars: string) {
  const test = document.createElement("textarea")
  test.innerHTML = chars
  test.remove()
  return test.value
}

export function unescapeHTMLEnteries(string: string) {
  const test = document.createElement("textarea")
  test.innerHTML = string
  test.remove()
  return test.innerHTML
}

/**
 * Creates class with modifiers

 * Join modifiers with className and returns one

 * @param rootClass
 * @param modifiers
 */
export function classWithModifiers(rootClass: string, ...modifiers: Array<string | number | false | null | undefined>) {
  modifiers = modifiers.filter(Boolean)

  if (modifiers.length === 0) {
    return rootClass
  }

  const space = " "
  const separator = "--"

  return modifiers.reduce<string>((className, modifier) => {
    return className + space + rootClass + separator + modifier
  }, rootClass)
}

/**
 * Assignes classes
 * 
 * @param classNames - Classes to assign
 */
export function mergeClasses(...classNames: Array<string | undefined>) {
  const space = " "
  return classNames.filter(Boolean).join(space)
}

mergeClasses("animal", classWithModifiers("lion", "walking", "hunting"))
// Expected: "animal lion lion--walking lion--hunting"

export function CustomFormData(data: Record<string, any>) {
  const formData = new FormData()

  for (const key in data) {
    const chunk = data[key]

    if (chunk instanceof Array) {
      chunk.map(piece => formData.append(key + "[]", piece))
    } else {
      formData.append(key, chunk)
    }
  }

  return formData
}

export class Exception<Name = string, Message = string> {
  constructor(
    public name: Name,
    public message?: Message,
    ...error: unknown[]
  ) {
    if (process.env.NODE_ENV !== "production") {
      console.group(name)
      console.trace(name)
      error.forEach(console.error)
      console.groupEnd()
    }
  }
}

export * from "./random"

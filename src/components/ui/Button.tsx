import { ButtonHTMLAttributes, Children, useState } from "react"
import { mergeClasses, classWithModifiers } from "src/utils/utils"

interface ButtonProps extends ButtonHTMLAttributes<any> {
  color?: "green" | "blue" | "yellow" | "red" | "orange"
  modify?: string
  padding?: string
  children?: any
}

export function Button(props: ButtonProps) {
  const modifiers: (string | undefined)[] = []

  modifiers.push(props.modify)
  modifiers.push(props.color)

  return (
    <button
      {...props}
      style={{ ...props.style, padding: props.padding }}
      className={mergeClasses(props.className, classWithModifiers("button", ...modifiers))}
    >
      <div className="button__text">{Children.only(props.children)}</div>
    </button>
  )
}

interface ButtonLazyProps extends ButtonProps {
  lazyClick?(): Promise<void>
}

export function ButtonLazy(props: ButtonLazyProps) {
  const [state, setState] = useState<"pending" | null>(null)
  async function lazyClick() {
    if (!props.lazyClick) return

    try {
      setState("pending")
      await props.lazyClick()
    } finally {
      setState(null)
    }
  }
  return (
    <Button
      {...props}
      disabled={state === "pending" || props.disabled}
      onClick={lazyClick}
    />
  )
}

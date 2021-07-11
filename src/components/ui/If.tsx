


interface IfProps {
  state?: boolean
  children: any
}

export default function If({ state, children }: IfProps) {
  return Boolean(state) && children
}

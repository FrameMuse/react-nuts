

type ReactSVGComponent = React.FunctionComponent<React.SVGProps<SVGSVGElement>>

const colors = {
  dark: "var(--hsl-Blue-3)",
  light: "var(--hsl-White)"
}

export default function SVGIcon(props: { name: Lowercase<string>, color: keyof typeof colors }) {
  const SVG = require("" + "../../../assets/svg/" + props.name + ".jsx")
  return <SVG fill={colors[props.color]} />
}

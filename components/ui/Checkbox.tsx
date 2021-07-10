interface CheckboxProps {
  label?: string | number;
  required?: boolean;
  className?: string;
  defaultState?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void | undefined;
}
function Checkbox(props: CheckboxProps) {
  Object.seal(props)
  delete props.label
  delete props.className
  return (
    <label className={props.className ? "checkbox " + props.className : "checkbox"}>
      <input {...props} type="checkbox" className="checkbox__input" />
      <div className="checkbox__inner">
        <div className="checkbox__icon">
          <SVGCheckmark />
        </div>
      </div>
      {props.label && <span className="checkbox__label">{props.label}</span>}
    </label>
  )
}

export default Checkbox

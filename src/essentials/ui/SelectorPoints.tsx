

import SelectorComponent from './SelectorComponent'
import { mergeClasses, classWithModifiers } from '../utils/utils'

export default class SelectorPoints<T = any> extends SelectorComponent<T> {
  render() {
    const { state, props } = this
    return (
      <div className={mergeClasses("selector", props.className)}>
        <div className="selector__menu">
          {(props.options || props.children)?.map((option, index) => (
            <div
              className={classWithModifiers("selector__option", state.choice === index && "active")}
              onClick={() => this.setChoice(index)}
              key={"option_" + index}
            >
              {this.renderOption(option)}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

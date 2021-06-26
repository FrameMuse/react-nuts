


export function state(target: any, key: any) {
  const prevComponentDidMount = target.componentDidMount?.bind(target)
  target.componentDidMount = function () {
    Object.defineProperty(this, "_" + key, {
      value: this[key],
      writable: true
    })
    Object.defineProperty(this, key, {
      get: () => this["_" + key],
      set: value => {
        this["_" + key] = value
        this.setState({ ...this.state })
      },
    })
    prevComponentDidMount?.()
  }
}

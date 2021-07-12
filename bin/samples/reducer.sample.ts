type ValueOf<T> = T[keyof T]
type compileActions<Actions extends Record<string, unknown> = {}> = ValueOf<{ [K in keyof Actions]: action<K, Actions[K]> }>
interface action<Type, Payload extends Record<string, unknown>> {
  type: Type
  payload: Payload

}
interface actions {
  EVENT: {}
}


const initialState = {}

export default (state = initialState, action: compileActions): typeof initialState => {
  switch (action.type) {

    case "EVENT":
      return { ...state, ...action.payload }

    default:
      return state
  }
}
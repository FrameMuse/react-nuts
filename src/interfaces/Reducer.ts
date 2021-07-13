import type { ValueOf } from "./Object"

type payload = Record<string, unknown>

export type CompileActions<Actions extends Record<string, any>> = ValueOf<{ [K in keyof Actions]: Action<K, Actions[K]> }>

export interface Action<Type, Payload extends payload> {
  type: Type
  payload: Payload
}
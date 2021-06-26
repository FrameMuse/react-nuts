export type ValueOf<T> = T[keyof T];

export interface FormCollection<E = {}> extends HTMLFormElement {
  elements: E & HTMLFormControlsCollection
}

export interface PaginationType<D = unknown> {
  current_page: number
  data: D[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string | null
  next_page_url: string | null
  path: string | null
  per_page: number
  prev_page_url: string | null
  to: number
  total: number
}

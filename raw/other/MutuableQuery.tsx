/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { getActionT } from "app/api/actions"
import { Action, ClientAPI } from "app/api/client"
import { SocketActions } from "app/socket/ClientSocket"
import { createContext, lazy, memo, Suspense, useContext, useEffect, useMemo, useRef, useState } from "react"
import { QueryResponse, useBulkMutation, useMutation, useQuery, UseQueryResponse } from "react-fetching-library"
import { DefaultReducers, useSelector } from "react-redux"
import { PaginationType } from "resources/interfaces/Object"
import useMutableQuery, { QueryPayload } from "../../../resources/hooks/useCacheQuery"
import Button from "../UI/Button"
import AuthRequired from "./AuthRequired"
import ContentTransition from "./ContentTransition"
import Empty from "./Empty"
import Error from "./Error"
import Loader from "./Loader"

interface MutuableQueryProps<T, C, R extends keyof DefaultReducers = never, G extends UseQueryResponse<QueryPayload<T, R>> = any> {
  deps?: any[]
  action: Action<T>
  animated?: boolean
  reducer?: R
  children<Y extends UseQueryResponse<QueryPayload<T, R>>>(response: Y & { payload: {} }): any
}

export function Query__UnSafe<T = any, C = any, R extends keyof DefaultReducers = never, G extends UseQueryResponse<QueryPayload<T, R>> = any>({ children, action, reducer, deps, animated }: MutuableQueryProps<T, C, R, G>) {
  const response = useMutableQuery<T, C, R>(action, reducer)

  useEffect(() => {
    if (deps && !response.loading && response.payload) {
      response.query()
    }
  }, deps)

  const Component = children

  const content = useMemo(() => (
    <Component {...response as any} />
  ), [response.payload, response.loading])



  const PAYLOAD_VALID = Boolean(response.payload)
  return (
    <>
      <ContentTransition disabled={!animated} in={[response.payload]}>
        {response.payload && !response.loading && content}
      </ContentTransition>
      {/* <Loader overlap={PAYLOAD_VALID} /> */}
      {response.loading && <Loader overlap={PAYLOAD_VALID} />}
      {response.error && (
        <Error overlap={PAYLOAD_VALID} {...response.payload?.error} onClick={response.query} />
      )}
    </>
  )
}

function MutuableQuery<T = any, C = any, R extends keyof DefaultReducers = never, G = any>(props: MutuableQueryProps<T, C, R> & { requireAuth?: boolean }) {
  // if (props.requireAuth) {
  //   return (
  //     <AuthRequired>
  //       <Query__UnSafe<T, C, R> {...props} />
  //     </AuthRequired>
  //   )
  // }
  // return <Query__UnSafe<T, C, R> {...props} />

  const children = (
    <QueryProvider action={props.action}>
      <QueryCunsumer children={props.children as any} />
    </QueryProvider>
  )

  if (props.requireAuth) {
    return <AuthRequired>{children}</AuthRequired>
  }

  return children
}

type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>
interface QueryExtenstion<T = {}> {
  modifyPayload: React.Dispatch<React.SetStateAction<T | undefined>>
  mutate(action?: Partial<Action>): Promise<QueryResponse<T>>;
}
export type QueryContextResponse<A extends Action, U = never, T = getActionT<A>> = RequiredBy<UseQueryResponse<T | U>, "payload"> & QueryExtenstion<T>
export const QueryContext = createContext<UseQueryResponse<any> & QueryExtenstion>({
  error: false,
  loading: true,
  abort: () => { },
  reset: () => { },
  query: () => new Promise(() => { }),
  mutate: () => new Promise(() => { }),
  modifyPayload: () => { }
})

export function QueryProvider(props: { unsuspend?: boolean; action: Action; initFetch?: boolean; children: any; }) {
  const response = useMutation((action: any) => ({ ...props.action, ...action }))
  const [payload, modifyPayload] = useState(response.payload)
  Object.freeze(payload)
  useEffect(() => modifyPayload(response.payload), [response.payload])
  useEffect(() => {
    if (props.initFetch ?? true) {
      response.mutate({})
    }
  }, [])
  useEffect(() => {
    response.mutate(props.action)
  }, Object.values(props.action))

  const PAYLOAD_VALID = Boolean(payload)
  const contextValue = {
    ...response,
    modifyPayload,
    query: () => response.mutate({}),
    mutate: (action?: Action) => response.mutate(action),
    payload
  }

  Object.seal(response)
  Object.seal(contextValue)
  Object.freeze(response)
  Object.freeze(contextValue)

  return (
    <>
      <ContentTransition disabled={true} in={[contextValue.payload]}>
        <QueryContext.Provider value={contextValue}>
          {props.unsuspend && props.children}
          {PAYLOAD_VALID && !contextValue.error && !props.unsuspend && props.children}
        </QueryContext.Provider>
      </ContentTransition>
      {contextValue.loading && !props.unsuspend && <Loader overlap={PAYLOAD_VALID} />}
      {contextValue.error && (
        <Error overlap={PAYLOAD_VALID} {...response.payload?.error} onClick={contextValue.query} />
      )}
    </>
  )
}
export function QueryCunsumer<A extends Action = any, U = never>(props: { children: (response: QueryContextResponse<A, U>) => any }) {
  const response = useContextQuery<A>()
  return props.children(response)
}
export function QueryPaggination(props: { children: any; use?: string; empty?: string; emptyLink?: string }) {
  const [loading, setLoading] = useState(false)
  const { payload, modifyPayload } = useContextQuery<Action<any>>()
  const [paginationData, setPaginationData] = useState<{
    nextPageUrl: string | null
    lastPageUrl: string | null
  }>(getPaginationURLs(payload))
  const { nextPageUrl, lastPageUrl } = paginationData
  const isLastPage = Boolean((lastPageUrl && (nextPageUrl === null)) || (nextPageUrl === lastPageUrl))

  useEffect(() => updatePaginationData(payload), [getPaginationData(payload)?.last_page_url])

  function removeHostPath(url?: string | null) {
    return url?.replace(process.env.REACT_APP_SITE_API_URL || "", "") || null
  }

  function getPaginationData(payload: any): PaginationType | null {
    return props.use ? payload[props.use] : payload
  }

  function getPaginationURLs(payload: any) {
    const paginationData = getPaginationData(payload)

    const nextPageUrl = removeHostPath(paginationData?.next_page_url)
    const lastPageUrl = removeHostPath(paginationData?.last_page_url)

    return {
      nextPageUrl,
      lastPageUrl
    }
  }

  function updatePaginationData(pl: any) {
    setPaginationData(getPaginationURLs(pl))
  }

  function loadMore() {
    if (!nextPageUrl || isLastPage) return
    setLoading(true)

    ClientAPI
      .query<any>({
        method: "GET",
        endpoint: nextPageUrl
      })
      .then(({ error, payload: newPayload }) => {
        setLoading(false)
        if (error || !newPayload) return
        if (props.use) {
          updatePaginationData(newPayload)
          modifyPayload({
            ...payload,
            [props.use]: {
              ...payload[props.use],
              data: [
                ...payload[props.use]["data"],
                ...newPayload[props.use]["data"]
              ]
            }
          })
        } else {
          modifyPayload({
            ...payload,
            data: [
              ...payload.data,
              ...newPayload.data
            ]
          })
        }
      })

  }

  const IS_EMPTY = !(props.use ? payload?.[props.use]?.data : payload?.data)?.length
  if (!IS_EMPTY && isLastPage) return props.children

  return (
    <div className="paggination" style={{ display: "grid" }}>
      {props.children}
      <br />
      <br />
      <br />
      <br />
      {IS_EMPTY ? <Empty link={props.emptyLink} children={props.empty} /> : (
        <Button
          color={loading ? "blue" : "yellow"}
          disabled={loading}
          onClick={loadMore}
          className="paggination__button"
        >
          {(loading ? "Загружаем..." : "Загрузить ещё")}
        </Button>
      )}
    </div>
  )
}
export function useContextQuery<A extends Action = any, U = never>() {
  const response = useContext(QueryContext) as QueryContextResponse<A, U>
  return response
}

export default MutuableQuery

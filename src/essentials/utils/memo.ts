export function Memo<T>(fn: T & Function) {
  const cache = new Map()
  return function (this: 1, ...args: any) {
    const props = args.toString()
    if (cache.has(props)) {
      return cache.get(props)
    } else {
      const result = fn.call(this, ...args)
      cache.set(props, result)
      return result
    }
  } as unknown as T
}

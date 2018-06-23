export const map = f => arr => Array.isArray(arr) ? arr.map(f) : arr
export const isPromise = x => x && 'then' in x && typeof x.then === 'function'
export const pipe = (...fns) => x => fns.reduce((m, f) => m.then(f), isPromise(x) ? x : Promise.resolve(x))
export const parallel = (...fns) => x => Promise.all(fns.map(f => f(x)))
export const format = x => JSON.stringify(x, null, 4)
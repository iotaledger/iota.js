import tape from 'tape'

export const test = (msg, ...assertations) =>
    tape(msg, t => {
        t.plan(assertations.length)
        assertations.forEach(f => f(t))
    })

export const deepEqual = (...args) => t => t.deepEqual(...args)
export const equal = (...args) => t => t.equal(...args)
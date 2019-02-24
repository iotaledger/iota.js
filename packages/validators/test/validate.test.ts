import test from 'ava'
import { validate, Validator } from '../src'

test('validate() does not throw error for valid input.', t => {
    const validator: Validator<string> = input => [input, (v: any): v is string => typeof v === 'string', 'error']

    t.notThrows(() => validate(validator('test')), 'validate() should not throw error for valid input.')
})

test('validate() throws correct error for invalid input.', t => {
    const errorMessage = 'validation error'
    const validator: Validator<string> = input => [input, (v: any): v is string => false, errorMessage]
    const value = 'test'

    t.is(
        t.throws(() => validate(validator(value)), Error).message,
        `${errorMessage}: ${JSON.stringify(value, null, 1)}`,
        'validate() should throw correct error for invalid input.'
    )
})

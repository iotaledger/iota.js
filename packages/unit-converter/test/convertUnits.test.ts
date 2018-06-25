import test from 'ava'
import { convertUnits, Unit } from '../src'

test('convertUnits()', t => {
    const tests: Array<{
        value: string | number
        fromUnit: Unit
        toUnit: Unit
        expected: number
    }> = [
        {
            value: 100,
            fromUnit: Unit.Mi,
            toUnit: Unit.i,
            expected: 100000000,
        },
        {
            value: 10.1,
            fromUnit: Unit.Gi,
            toUnit: Unit.i,
            expected: 10100000000,
        },
        {
            value: '10.1000',
            fromUnit: Unit.Gi,
            toUnit: Unit.i,
            expected: 10100000000,
        },
        {
            value: 1,
            fromUnit: Unit.i,
            toUnit: Unit.Ti,
            expected: 0.000000000001,
        },
        {
            value: 1,
            fromUnit: Unit.Ti,
            toUnit: Unit.i,
            expected: 1000000000000,
        },
        {
            value: 1000,
            fromUnit: Unit.Gi,
            toUnit: Unit.Ti,
            expected: 1,
        },
        {
            value: 133.999111111,
            fromUnit: Unit.Gi,
            toUnit: Unit.i,
            expected: 133999111111,
        },
    ]

    tests.forEach(sample =>
        t.is(
            convertUnits(sample.value, sample.fromUnit, sample.toUnit),
            sample.expected,
            `convertUnits() should convert:
            ${sample.value} ${sample.fromUnit} to:
            ${sample.expected} ${sample.toUnit}`
        )
    )
})

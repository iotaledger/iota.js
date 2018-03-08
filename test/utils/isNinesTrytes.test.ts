import test from 'ava'
import { isEmpty } from '../../lib/utils'

test('isEmpty', t => {
    const all9s = '999999999999999999'
    const notAll9s = 'JALLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLSJMPIVGPNE'

    t.is(
        isEmpty(all9s),
        true,
        'isEmpty() should return true for empty tryte fields. (all 9s)'
    )

    t.is(
        isEmpty(notAll9s),
        false,
        'isEmpty() should return false for non-empty tryte fields. (contain A-Z besides 9s)'
    )
});

import { GetInclusionStatesResponse } from '../types/response'
import { getReturnOfExpression } from './foo'

export function parseGetInclusionStates(res: GetInclusionStatesResponse) {
    return res.states
}

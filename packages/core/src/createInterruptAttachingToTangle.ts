import * as Promise from 'bluebird'
import {
    Callback,
    InterruptAttachingToTangleCommand,
    InterruptAttachingToTangleResponse,
    IRICommand,
    Provider,
} from '../../types'

export const createInterruptAttachingToTangle = ({ send }: Provider) => (callback?: Callback<void>): Promise<void> =>
    send<InterruptAttachingToTangleCommand, InterruptAttachingToTangleResponse>({
        command: IRICommand.INTERRUPT_ATTACHING_TO_TANGLE,
    }).asCallback(callback)

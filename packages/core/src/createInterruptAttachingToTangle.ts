import * as Promise from 'bluebird'
import { BaseCommand, Callback, IRICommand, Provider } from './types'

export interface InterruptAttachingToTangleCommand extends BaseCommand {
    command: IRICommand.INTERRUPT_ATTACHING_TO_TANGLE
}

export type InterruptAttachingToTangleResponse = void

export const createInterruptAttachingToTangle = ({ send }: Provider) =>
    (callback?: Callback<void>): Promise<void> =>
        send<InterruptAttachingToTangleCommand, InterruptAttachingToTangleResponse>({
            command: IRICommand.INTERRUPT_ATTACHING_TO_TANGLE,
        }).asCallback(callback)


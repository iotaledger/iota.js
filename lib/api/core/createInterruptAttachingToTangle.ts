import * as Promise from 'bluebird'
import { BaseCommand, Callback, IRICommand, Provider } from '../types'

export interface InterruptAttachingToTangleCommand extends BaseCommand {
    command: IRICommand.INTERRUPT_ATTACHING_TO_TANGLE
}

export type InterruptAttachingToTangleResponse = void

/**
 *   @method interruptAttachingToTangle
 *   @returns {function} callback
 *   @returns {object} success
 **/
export const createInterruptAttachingToTangle = (provider: Provider) =>
    (callback?: Callback<void>): Promise<void> =>
        provider.sendCommand<InterruptAttachingToTangleCommand, InterruptAttachingToTangleResponse>({
            command: IRICommand.INTERRUPT_ATTACHING_TO_TANGLE,
        }).asCallback(callback)


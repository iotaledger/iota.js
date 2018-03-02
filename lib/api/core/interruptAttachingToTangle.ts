import * as Promise from 'bluebird'
import { BaseCommand, Callback, IRICommand } from '../types'
import { sendCommand } from './sendCommand'

export interface InterruptAttachingToTangleCommand extends BaseCommand {
    command: IRICommand.INTERRUPT_ATTACHING_TO_TANGLE
}

export type InterruptAttachingToTangleResponse = void

/**
 *   @method interruptAttachingToTangle
 *   @returns {function} callback
 *   @returns {object} success
 **/
export const interruptAttachingToTangle = (callback?: Callback<void>): Promise<void> =>
    sendCommand<InterruptAttachingToTangleCommand, InterruptAttachingToTangleResponse>({
        command: IRICommand.INTERRUPT_ATTACHING_TO_TANGLE,
    }).asCallback(callback)

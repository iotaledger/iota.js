import * as Promise from 'bluebird'
import { BaseCommand, Callback, IRICommand, Settings } from '../types'
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
export const createInterruptAttachingToTangle = (settings: Settings) => {
    let { provider } = settings

    const interruptAttachingToTangle = (callback?: Callback<void>): Promise<void> =>
        sendCommand<InterruptAttachingToTangleCommand, InterruptAttachingToTangleResponse>(provider, {
            command: IRICommand.INTERRUPT_ATTACHING_TO_TANGLE,
        }).asCallback(callback)

    const setSettings = (newSettings: Settings) => {
        provider = newSettings.provider
    }

    // tslint:disable-next-line prefer-object-spread
    return Object.assign(interruptAttachingToTangle, { setSettings })
}

import { API, BaseCommand, Callback,  IRICommand } from '../types'

export interface InterruptAttachingToTangleCommand extends BaseCommand {
    command: IRICommand.INTERRUPT_ATTACHING_TO_TANGLE
}

export type InterruptAttachingToTangleResponse = void


/**
 *   @method interruptAttachingToTangle
 *   @returns {function} callback
 *   @returns {object} success
 **/
export default function interruptAttachingToTangle(this: API, callback?: Callback<void>): Promise<void> {
    return this.sendCommand<InterruptAttachingToTangleCommand, InterruptAttachingToTangleResponse>(
        { 
            command: IRICommand.INTERRUPT_ATTACHING_TO_TANGLE
        },
        callback
    )
}

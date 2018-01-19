import errors from '../../errors/inputErrors'
import inputValidator from '../../utils/inputValidator'
import { Callback } from '../types/commands'
import { AddNeighborsResponse } from '../types/responses'
import { addNeighborsCommand } from './commands'


/**
 *   @method addNeighbors
 *   @param {Array} uris List of URI's
 *   @returns {Promise}
 **/
function addNeighbors(this: any, uris: string[], callback: Callback<AddNeighborsResponse>): Promise<AddNeighborsResponse> {
  const promise: Promise<AddNeighborsResponse> = new Promise((resolve, reject) => {
    if (!uris.every(uri => inputValidator.isUri(uri))) {
      reject(errors.INVALID_URI)
    } else {
      resolve(this.sendCommand(addNeighborsCommand(uris)))
    }
  })

  if (typeof callback === 'function') {
    promise.then(
      res => callback(null, res),
      err => callback(err)
    )
  }

  return promise
}

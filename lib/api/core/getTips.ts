import { API, BaseCommand, Callback, IRICommand } from '../types'

export interface GetTipsCommand extends BaseCommand {
    command: IRICommand.GET_TIPS
}

export interface GetTipsResponse {
    hashes: string[]
    duration: number
}

/**
 *   @method getTips
 *   @returns {function} callback
 *   @returns {object} success
 **/
export default function getTips(this: API, callback?: Callback<string[]>): Promise<string[]> {
  const promise: Promise<string[]> = new Promise((resolve, reject) => {
      resolve(
          this.sendCommand<GetTipsCommand, GetTipsResponse>(
              {
                  command: IRICommand.GET_TIPS
              }
          )
              .then(res => res.hashes)
      )        
  })

  if (typeof callback === 'function') {
      promise.then(callback.bind(null, null), callback)
  }

  return promise
}

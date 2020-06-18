//
//  Created by Rajiv Shah on 4/6/18.
//

#import <Foundation/Foundation.h>
#import "PearlDiver.h"

@implementation PearlDiver

RCT_EXPORT_MODULE();

// PoW
RCT_EXPORT_METHOD(doPOW:(NSString *)trytes minWeightMagnitude:(int)minWeightMagnitude resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
        char * trytesChars = [trytes cStringUsingEncoding:NSUTF8StringEncoding];
        char * nonce = iota_pow_trytes(trytesChars, minWeightMagnitude);
        resolve([NSString stringWithFormat:@"%s", nonce]);
    });
}

@end

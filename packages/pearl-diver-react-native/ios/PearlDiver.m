//
//  Created by Rajiv Shah on 4/6/18.
//

#import <Foundation/Foundation.h>
#import "PearlDiver.h"

@implementation PearlDiver

RCT_EXPORT_MODULE();

// Checksum

RCT_EXPORT_METHOD(getChecksum:(NSString *)trytes length:(int)length resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    char * trytesChars = [trytes cStringUsingEncoding:NSUTF8StringEncoding];
    char * checksum = iota_checksum(trytesChars, strlen(trytesChars), length);
    memset_s(trytesChars, strlen(trytesChars), 0, strlen(trytesChars));
    resolve([NSString stringWithFormat:@"%s", checksum]);
}

// Hashing
RCT_EXPORT_METHOD(getDigest:(NSString *)trytes resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    char * digest = iota_digest([trytes cStringUsingEncoding:NSUTF8StringEncoding]);
    resolve([NSString stringWithFormat:@"%s", digest]);
}

// PoW
RCT_EXPORT_METHOD(doPOW:(NSString *)trytes minWeightMagnitude:(int)minWeightMagnitude resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
        char * trytesChars = [trytes cStringUsingEncoding:NSUTF8StringEncoding];
        char * nonce = iota_pow(trytesChars, minWeightMagnitude);
        resolve([NSString stringWithFormat:@"%s", nonce]);
    });
}


// Single address generation
RCT_EXPORT_METHOD(generateAddress:(NSString *)seed index:(int)index security:(int)security resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    char * seedChars = [seed cStringUsingEncoding:NSUTF8StringEncoding];
    char * address = iota_sign_address_gen(seedChars, index, security);
    memset_s(seedChars, strlen(seedChars), 0, strlen(seedChars));
    resolve([NSString stringWithFormat:@"%s", address]);
}

// Multi address generation
RCT_EXPORT_METHOD(generateAddresses:(NSString *)seed index:(int)index security:(int)security total:(int)total resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
        char * seedChars = [seed cStringUsingEncoding:NSUTF8StringEncoding];
        NSMutableArray * addresses = [NSMutableArray array];
        int i = 0;
        int addressIndex = index;
        
        do {
            char * address = iota_sign_address_gen(seedChars, addressIndex, security);
            NSString * addressObj = [NSString stringWithFormat:@"%s", address];
            [addresses addObject:addressObj];
            i++;
            addressIndex++;
        } while (i < total);
        memset_s(seedChars, strlen(seedChars), 0, strlen(seedChars));
        resolve(addresses);
    });
}

// Signature generation
RCT_EXPORT_METHOD(generateSignature:(NSString *)seed index:(int)index security:(int)security bundleHash:(NSString *)bundleHash resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    char * seedChars = [seed cStringUsingEncoding:NSUTF8StringEncoding];
    char * bundleHashChars = [bundleHash cStringUsingEncoding:NSUTF8StringEncoding];
    char * signature = iota_sign_signature_gen(seedChars, index, security, bundleHashChars);
    memset_s(seedChars, strlen(seedChars), 0, strlen(seedChars));
    resolve(@[[NSString stringWithFormat:@"%s", signature]]);
}

@end

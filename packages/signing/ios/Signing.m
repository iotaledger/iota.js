//
//  EntangledIOS.m
//  iotaWallet
//
//  Created by Rajiv Shah on 4/6/18.
//

#import <Foundation/Foundation.h>
#import "Signing.h"

@implementation Signing

RCT_EXPORT_MODULE();


// Hashing
RCT_EXPORT_METHOD(getDigest:(NSString *)trytes resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  NSString * digest = [EntangledIOSBindings iota_ios_digest:trytes];
  resolve(digest);
}

// Trytes String Proof of Work
RCT_EXPORT_METHOD(trytesPow:(NSString *)trytes minWeightMagnitude:(int)minWeightMagnitude resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
    NSString * nonce = [EntangledIOSBindings iota_ios_pow_trytes:trytes mwm:minWeightMagnitude];
    resolve(nonce);
  });
}

// Bundle Proof of Work
RCT_EXPORT_METHOD(bundlePow:(NSArray *)trytes trunk:(NSString*)trunk branch:(NSString*)branch minWeightMagnitude:(int)minWeightMagnitude resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
    NSArray * attachedTrytes = [EntangledIOSBindings iota_ios_pow_bundle:trytes trunk:trunk branch:branch mwm:minWeightMagnitude];
    resolve(attachedTrytes);
  });
}


// Single address generation
RCT_EXPORT_METHOD(generateAddress:(NSArray<NSNumber*>*)seed index:(int)index security:(int)security resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  int8_t seedTrits[243];
  int8_t* seedTrits_ptr = NULL;
  for (int i = 0; i < (int)seed.count; i++)
  {
      seedTrits[i] = (int8_t)seed[i].charValue;
  }
  seedTrits_ptr = seedTrits;
  int8_t * address = NULL;
  address = [EntangledIOSBindings iota_ios_sign_address_gen_trits:seedTrits_ptr index:index security:security];
  memset_s(seedTrits, strlen(seedTrits), 0, strlen(seedTrits));
  for (int i = 0; i < 243; i++) {
    printf("%hhd", address[i]);
  }
  resolve([NSString stringWithFormat:@"%s", address]);
}

// Multi address generation
RCT_EXPORT_METHOD(generateAddresses:(NSArray<NSNumber*>*)seed index:(int)index security:(int)security total:(int)total resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
    NSMutableArray * addresses = [NSMutableArray array];
    int i = 0;
    int addressIndex = index;


    int8_t seedTrits[243];
    int8_t* seedTrits_ptr = NULL;
    int8_t* address = NULL;

    for (int i = 0; i < (int)seed.count; i++)
    {
        seedTrits[i] = (int8_t)seed[i].charValue;
    }

    do {
      address = [EntangledIOSBindings iota_ios_sign_address_gen_trits:seedTrits index:addressIndex security:security];
      NSString * addressObj = [NSString stringWithFormat:@"%s", address];
      [addresses addObject:addressObj];
      i++;
      addressIndex++;
    } while (i < total);
    memset_s(seedTrits, strlen(seedTrits), 0, strlen(seedTrits));
    resolve(addresses);
  });
}

// Signature generation
RCT_EXPORT_METHOD(generateSignature:(NSArray *)seed index:(int)index security:(int)security bundleHash:(NSArray *)bundleHash resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  int8_t seedTrits[sizeof(seed)] = "";
  for (int i = 0; i < sizeof(seed); i++)
  {
      seedTrits[i] = (int8_t)seed[i];
  }
  int8_t bundleTrits[sizeof(bundleHash)] = "";
  for (int i = 0; i < sizeof(seed); i++)
  {
      bundleTrits[i] = (int8_t)bundleHash[i];
  }
  int8_t * signature = [EntangledIOSBindings iota_ios_sign_signature_gen_trits:seedTrits index:index security:security bundleHash:bundleTrits];
  memset_s(seedTrits, strlen(seedTrits), 0, strlen(seedTrits));

  NSMutableArray * signatureTrits = [NSMutableArray array];
  for (int i = 0; i < sizeof(signature); i++)
  {
      NSInteger item = signature[i];
      [signatureTrits addObject:[NSNumber numberWithInteger:item]];
  }
  resolve(signatureTrits);
}

@end

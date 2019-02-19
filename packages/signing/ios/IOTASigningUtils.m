//
//  IOTASigningUtils.m
//  Signing
//
//  Created by Rajiv Shah on 2/18/19.
//  Copyright © 2019 IOTA Foundation. All rights reserved.
//

#import "IOTASigningUtils.h"
#import <Foundation/Foundation.h>

@implementation IOTASigningUtils


/**
 Converts a NSMutableArray representation of trits into an int8_t representation
 
 @param trits NSMutableArray representation of trits
 @return int8_t representation of trits
 */
+ (int8_t*)NSMutableArrayTritsToInt8:(NSMutableArray<NSNumber *> *)trits {
    int8_t* trits_int8_ptr = (int8_t*)calloc(trits.count, sizeof(int8_t));
    for (int i = 0; i < (int)trits.count; i++) {
        trits_int8_ptr[i] = (int8_t)trits[i].charValue;
    }
    return trits_int8_ptr;
}


/**
 Converts an int8_t representation of trits into a NSMutableArray representation
 
 @param trits Pointer to int8_t representation of trits
 @param count Number of trits
 @return NSMutableArray representation of trits
 */
+ (NSMutableArray<NSNumber*>*)Int8TritsToNSMutableArray:(int8_t *)trits count:(int)count {
    NSMutableArray<NSNumber*>* trits_array = [NSMutableArray array];
    for (int i = 0; i < count; i++) {
        [trits_array addObject:[NSNumber numberWithChar:trits[i]]];
    }
    return trits_array;
}

@end

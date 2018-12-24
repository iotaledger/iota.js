//
//  Created by Rajiv Shah on 4/6/18.
//  Copyright © 2018 IOTA Foundation. All rights reserved.
//
#ifndef __MOBILE_INTERFACE_BINDINGS_H_
#define __MOBILE_INTERFACE_BINDINGS_H_

#include <stddef.h>

#ifdef __cplusplus
extern "C" {
#endif
    
    char* do_pow(const char* trytes, int mwm);
    char* generate_address(const char* seed, const size_t index,
                           const size_t security);
    char* generate_signature(const char* seed, const size_t index,
                             const size_t security, const char* bundleHash);
    
#ifdef __cplusplus
}
#endif

#endif /* bindings_h */

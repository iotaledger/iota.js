// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { RandomHelper } from "./utils/randomHelper";
// Random
if (!RandomHelper.randomPolyfill) {
    RandomHelper.randomPolyfill = length => {
        const randomBytes = new Uint8Array(length);
        window.crypto.getRandomValues(randomBytes);
        return randomBytes;
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9seWZpbGwtYnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9wb2x5ZmlsbC1icm93c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLCtCQUErQjtBQUMvQixzQ0FBc0M7QUFDdEMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXBELFNBQVM7QUFDVCxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBRTtJQUM5QixZQUFZLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQyxFQUFFO1FBQ25DLE1BQU0sV0FBVyxHQUFHLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNDLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzNDLE9BQU8sV0FBVyxDQUFDO0lBQ3ZCLENBQUMsQ0FBQztDQUNMIn0=
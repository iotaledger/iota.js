// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { randomBytes } from "crypto";
import { RandomHelper } from "./utils/randomHelper";
// Random
if (!RandomHelper.randomPolyfill) {
    RandomHelper.randomPolyfill = length => randomBytes(length);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9seWZpbGwtbm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9wb2x5ZmlsbC1ub2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLCtCQUErQjtBQUMvQixzQ0FBc0M7QUFDdEMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUNyQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFcEQsU0FBUztBQUNULElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxFQUFFO0lBQzlCLFlBQVksQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFlLENBQUM7Q0FDN0UifQ==
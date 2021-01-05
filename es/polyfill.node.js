"use strict";
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
// Fetch
if (!globalThis.fetch) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    globalThis.fetch = require("node-fetch");
}
// Base 64 Conversion
if (!globalThis.btoa) {
    globalThis.btoa = function (a) { return Buffer.from(a).toString("base64"); };
    globalThis.atob = function (a) { return Buffer.from(a, "base64").toString(); };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9seWZpbGwubm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9wb2x5ZmlsbC5ub2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBRXRDLFFBQVE7QUFDUixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRTtJQUNuQixpRUFBaUU7SUFDakUsVUFBVSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7Q0FDNUM7QUFFRCxxQkFBcUI7QUFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUU7SUFDbEIsVUFBVSxDQUFDLElBQUksR0FBRyxVQUFBLENBQUMsSUFBSSxPQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFqQyxDQUFpQyxDQUFDO0lBQ3pELFVBQVUsQ0FBQyxJQUFJLEdBQUcsVUFBQSxDQUFDLElBQUksT0FBQSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBbkMsQ0FBbUMsQ0FBQztDQUM5RCJ9
"use strict";
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Polyfills for NodeJS
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
__exportStar(require("./index"), exports);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgubm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5ub2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDOzs7Ozs7Ozs7Ozs7QUFFdEMsdUJBQXVCO0FBRXZCLFFBQVE7QUFDUixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRTtJQUNuQixpRUFBaUU7SUFDakUsVUFBVSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7Q0FDNUM7QUFFRCxxQkFBcUI7QUFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUU7SUFDbEIsVUFBVSxDQUFDLElBQUksR0FBRyxVQUFBLENBQUMsSUFBSSxPQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFqQyxDQUFpQyxDQUFDO0lBQ3pELFVBQVUsQ0FBQyxJQUFJLEdBQUcsVUFBQSxDQUFDLElBQUksT0FBQSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBbkMsQ0FBbUMsQ0FBQztDQUM5RDtBQUVELDBDQUF3QiJ9
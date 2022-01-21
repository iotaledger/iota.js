"use strict";
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
// Fetch
if (globalThis && !globalThis.fetch) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
    const fetch = require("node-fetch");
    globalThis.Headers = fetch.Headers;
    globalThis.Request = fetch.Request;
    globalThis.Response = fetch.Response;
    globalThis.fetch = fetch;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9seWZpbGwtbm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9wb2x5ZmlsbC1ub2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBRXRDLFFBQVE7QUFDUixJQUFJLFVBQVUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUU7SUFDakMscUdBQXFHO0lBQ3JHLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNwQyxVQUFVLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7SUFDbkMsVUFBVSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO0lBQ25DLFVBQVUsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQztJQUNyQyxVQUFVLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztDQUM1QiJ9
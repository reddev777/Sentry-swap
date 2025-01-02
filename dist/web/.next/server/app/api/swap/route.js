"use strict";
(() => {
var exports = {};
exports.id = 924;
exports.ids = [924];
exports.modules = {

/***/ 7783:
/***/ ((module) => {

module.exports = require("next/dist/compiled/@edge-runtime/cookies");

/***/ }),

/***/ 8530:
/***/ ((module) => {

module.exports = require("next/dist/compiled/@opentelemetry/api");

/***/ }),

/***/ 4426:
/***/ ((module) => {

module.exports = require("next/dist/compiled/chalk");

/***/ }),

/***/ 252:
/***/ ((module) => {

module.exports = require("next/dist/compiled/cookie");

/***/ }),

/***/ 4300:
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ 3685:
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ 5687:
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ 5477:
/***/ ((module) => {

module.exports = require("punycode");

/***/ }),

/***/ 2781:
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ 1576:
/***/ ((module) => {

module.exports = require("string_decoder");

/***/ }),

/***/ 7310:
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ 9796:
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ 1696:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "headerHooks": () => (/* binding */ headerHooks),
  "originalPathname": () => (/* binding */ originalPathname),
  "requestAsyncStorage": () => (/* binding */ requestAsyncStorage),
  "routeModule": () => (/* binding */ routeModule),
  "serverHooks": () => (/* binding */ serverHooks),
  "staticGenerationAsyncStorage": () => (/* binding */ staticGenerationAsyncStorage),
  "staticGenerationBailout": () => (/* binding */ staticGenerationBailout)
});

// NAMESPACE OBJECT: ./app/api/swap/route.ts
var route_namespaceObject = {};
__webpack_require__.r(route_namespaceObject);
__webpack_require__.d(route_namespaceObject, {
  "POST": () => (POST)
});

// EXTERNAL MODULE: ../node_modules/next/dist/server/node-polyfill-headers.js
var node_polyfill_headers = __webpack_require__(9247);
// EXTERNAL MODULE: ../node_modules/next/dist/server/future/route-modules/app-route/module.js
var app_route_module = __webpack_require__(5837);
var module_default = /*#__PURE__*/__webpack_require__.n(app_route_module);
// EXTERNAL MODULE: ../node_modules/cross-fetch/dist/node-ponyfill.js
var node_ponyfill = __webpack_require__(8315);
var node_ponyfill_default = /*#__PURE__*/__webpack_require__.n(node_ponyfill);
;// CONCATENATED MODULE: ./app/api/swap/route.ts
// UNTESTED 
//Can use this to pay tx fees for users :)

async function POST(request) {
    const { quoteResponse , userPublicKey , wrapAndUnwrapSol =true , feeAccount  } = await request.json();
    console.log("Request to swap from", userPublicKey);
    try {
        const swapTxResponse = await node_ponyfill_default()("https://quote-api.jup.ag/v6/swap", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                quoteResponse,
                userPublicKey,
                wrapAndUnwrapSol,
                feeAccount
            })
        });
        if (!swapTxResponse.ok) {
            throw new Error(`HTTP error! status: ${swapTxResponse.status}`);
        }
        const swapTransaction = await swapTxResponse.json();
        return new Response(JSON.stringify(swapTransaction), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (error) {
        return new Response(JSON.stringify({
            message: "Error fetching from Jupiter API",
            error
        }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}

;// CONCATENATED MODULE: ../node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Fapi%2Fswap%2Froute&name=app%2Fapi%2Fswap%2Froute&pagePath=private-next-app-dir%2Fapi%2Fswap%2Froute.ts&appDir=%2FUsers%2Fstoicpawn%2FDocuments%2FGitHub%2FSentry-swap%2Fweb%2Fapp&appPaths=%2Fapi%2Fswap%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=!

    

    

    

    const routeModule = new (module_default())({
    userland: route_namespaceObject,
    pathname: "/api/swap",
    resolvedPagePath: "/Users/stoicpawn/Documents/GitHub/Sentry-swap/web/app/api/swap/route.ts",
    nextConfigOutput: undefined,
  })

    // Pull out the exports that we need to expose from the module. This should
    // be eliminated when we've moved the other routes to the new format. These
    // are used to hook into the route.
    const {
      requestAsyncStorage,
      staticGenerationAsyncStorage,
      serverHooks,
      headerHooks,
      staticGenerationBailout
    } = routeModule

    const originalPathname = "/api/swap/route"

    

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [883,464,315], () => (__webpack_exec__(1696)));
module.exports = __webpack_exports__;

})();
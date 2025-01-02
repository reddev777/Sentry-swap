exports.id = 613;
exports.ids = [613];
exports.modules = {

/***/ 807:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 1410));
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 3221));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 5573, 23))

/***/ }),

/***/ 1410:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClusterNetwork": () => (/* binding */ ClusterNetwork),
/* harmony export */   "ClusterProvider": () => (/* binding */ ClusterProvider),
/* harmony export */   "toWalletAdapterNetwork": () => (/* binding */ toWalletAdapterNetwork),
/* harmony export */   "useCluster": () => (/* binding */ useCluster)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _solana_wallet_adapter_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6326);
/* harmony import */ var _solana_web3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9962);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* __next_internal_client_entry_do_not_use__ ClusterNetwork,toWalletAdapterNetwork,ClusterProvider,useCluster auto */ 



var ClusterNetwork;
(function(ClusterNetwork) {
    ClusterNetwork["Mainnet"] = "mainnet-beta";
    ClusterNetwork["Testnet"] = "testnet";
    ClusterNetwork["Devnet"] = "devnet";
    ClusterNetwork["Custom"] = "custom";
})(ClusterNetwork || (ClusterNetwork = {}));
function toWalletAdapterNetwork(cluster) {
    switch(cluster){
        case ClusterNetwork.Mainnet:
            return _solana_wallet_adapter_base__WEBPACK_IMPORTED_MODULE_3__/* .WalletAdapterNetwork.Mainnet */ .Q.Mainnet;
        case ClusterNetwork.Testnet:
            return _solana_wallet_adapter_base__WEBPACK_IMPORTED_MODULE_3__/* .WalletAdapterNetwork.Testnet */ .Q.Testnet;
        case ClusterNetwork.Devnet:
            return _solana_wallet_adapter_base__WEBPACK_IMPORTED_MODULE_3__/* .WalletAdapterNetwork.Devnet */ .Q.Devnet;
        default:
            return undefined;
    }
}
const Context = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_2__.createContext)({});
function ClusterProvider({ children  }) {
    const value = {
        cluster: {
            endpoint: (0,_solana_web3_js__WEBPACK_IMPORTED_MODULE_1__.clusterApiUrl)("mainnet-beta")
        }
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Context.Provider, {
        value: value,
        children: children
    });
}
function useCluster() {
    return (0,react__WEBPACK_IMPORTED_MODULE_2__.useContext)(Context);
}


/***/ }),

/***/ 3221:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SolanaProvider": () => (/* binding */ SolanaProvider),
/* harmony export */   "WalletButton": () => (/* binding */ WalletButton)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1041);
/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_dynamic__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4812);
/* harmony import */ var _solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9542);
/* harmony import */ var _solana_wallet_adapter_react_ui__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8655);
/* harmony import */ var _solana_wallet_adapter_solflare__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4730);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _cluster_cluster_data_access__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1410);
/* __next_internal_client_entry_do_not_use__ WalletButton,SolanaProvider auto */ 






__webpack_require__(7956);
const WalletButton = next_dynamic__WEBPACK_IMPORTED_MODULE_1___default()(null, {
    loadableGenerated: {
        modules: [
            "/Users/stoicpawn/Documents/GitHub/Sentry-swap/web/components/solana/solana-provider.tsx -> " + "@solana/wallet-adapter-react-ui"
        ]
    },
    ssr: false
});
function SolanaProvider({ children  }) {
    const { cluster  } = (0,_cluster_cluster_data_access__WEBPACK_IMPORTED_MODULE_3__.useCluster)();
    const endpoint = (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(()=>cluster.endpoint, [
        cluster
    ]);
    const wallets = (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(()=>[
            new _solana_wallet_adapter_solflare__WEBPACK_IMPORTED_MODULE_4__/* .SolflareWalletAdapter */ .e({
                network: (0,_cluster_cluster_data_access__WEBPACK_IMPORTED_MODULE_3__.toWalletAdapterNetwork)(cluster.network)
            })
        ], [
        cluster
    ]);
    const onError = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)((error)=>{
        console.error(error);
    }, []);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_5__/* .ConnectionProvider */ .U, {
        endpoint: endpoint,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_6__/* .WalletProvider */ .n, {
            wallets: wallets,
            onError: onError,
            autoConnect: true,
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_solana_wallet_adapter_react_ui__WEBPACK_IMPORTED_MODULE_7__/* .WalletModalProvider */ .s, {
                children: children
            })
        })
    });
}


/***/ }),

/***/ 9102:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ RootLayout),
  "metadata": () => (/* binding */ metadata)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(6786);
// EXTERNAL MODULE: ./app/global.css
var global = __webpack_require__(2097);
// EXTERNAL MODULE: ../node_modules/next/link.js
var next_link = __webpack_require__(1487);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ../node_modules/next/dist/build/webpack/loaders/next-flight-loader/module-proxy.js
var module_proxy = __webpack_require__(4626);
;// CONCATENATED MODULE: ./components/solana/solana-provider.tsx

const proxy = (0,module_proxy.createProxy)(String.raw`/Users/stoicpawn/Documents/GitHub/Sentry-swap/web/components/solana/solana-provider.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
const __default__ = proxy.default;

const e0 = proxy["WalletButton"];

const e1 = proxy["SolanaProvider"];

;// CONCATENATED MODULE: ./components/ui/app-layout.tsx



function AppLayout({ children  }) {
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        style: {
            display: "flex",
            flexDirection: "column",
            height: "100%"
        },
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "6px 12px"
                },
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                            href: "https://google.com",
                            children: /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                src: "/solana-logo.png",
                                height: 50,
                                alt: "Solana Logo"
                            })
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        children: /*#__PURE__*/ jsx_runtime_.jsx(e0, {})
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                style: {
                    flexGrow: 1,
                    padding: "6px"
                },
                children: children
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("footer", {
                style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "6px 10px"
                }
            })
        ]
    });
}

;// CONCATENATED MODULE: ./components/cluster/cluster-data-access.tsx

const cluster_data_access_proxy = (0,module_proxy.createProxy)(String.raw`/Users/stoicpawn/Documents/GitHub/Sentry-swap/web/components/cluster/cluster-data-access.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule: cluster_data_access_esModule, $$typeof: cluster_data_access_$$typeof } = cluster_data_access_proxy;
const cluster_data_access_default_ = cluster_data_access_proxy.default;

const cluster_data_access_e0 = cluster_data_access_proxy["ClusterNetwork"];

const cluster_data_access_e1 = cluster_data_access_proxy["toWalletAdapterNetwork"];

const e2 = cluster_data_access_proxy["ClusterProvider"];

const e3 = cluster_data_access_proxy["useCluster"];

// EXTERNAL MODULE: ../node_modules/next/dist/client/components/noop-head.js
var noop_head = __webpack_require__(6083);
var noop_head_default = /*#__PURE__*/__webpack_require__.n(noop_head);
;// CONCATENATED MODULE: ./app/layout.tsx






const metadata = {
    title: "Sentry swap",
    description: "Powered by $Sentry",
    favicon: "create-solana-dapp/web/public/favicon.ico"
};
function RootLayout({ children  }) {
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("html", {
        lang: "en",
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)((noop_head_default()), {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("title", {
                        children: metadata.title
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                        name: "description",
                        content: metadata.description
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("script", {
                        src: "https://terminal.jup.ag/main-v2.js",
                        "data-preload": true
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("link", {
                        rel: "icon",
                        href: metadata.favicon,
                        type: "image/x-icon"
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("body", {
                children: /*#__PURE__*/ jsx_runtime_.jsx(e2, {
                    children: /*#__PURE__*/ jsx_runtime_.jsx(e1, {
                        children: /*#__PURE__*/ jsx_runtime_.jsx(AppLayout, {
                            children: children
                        })
                    })
                })
            })
        ]
    });
}


/***/ }),

/***/ 2097:
/***/ (() => {



/***/ })

};
;
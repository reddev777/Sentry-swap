"use strict";
exports.id = 400;
exports.ids = [400];
exports.modules = {

/***/ 4775:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var eventemitter3_1 = __importDefault(__webpack_require__(4045));
var web3_js_1 = __webpack_require__(9962);
var bs58_1 = __importDefault(__webpack_require__(3264));
var Wallet = /** @class */ (function (_super) {
    __extends(Wallet, _super);
    function Wallet(provider, network) {
        var _this = _super.call(this) || this;
        _this._handleMessage = function (e) {
            if ((_this._injectedProvider && e.source === window) ||
                (e.origin === _this._providerUrl.origin && e.source === _this._popup)) {
                if (e.data.method === 'connected') {
                    var newPublicKey = new web3_js_1.PublicKey(e.data.params.publicKey);
                    if (!_this._publicKey || !_this._publicKey.equals(newPublicKey)) {
                        if (_this._publicKey && !_this._publicKey.equals(newPublicKey)) {
                            _this._handleDisconnect();
                        }
                        _this._publicKey = newPublicKey;
                        _this._autoApprove = !!e.data.params.autoApprove;
                        _this.emit('connect', _this._publicKey);
                    }
                }
                else if (e.data.method === 'disconnected') {
                    _this._handleDisconnect();
                }
                else if (e.data.result || e.data.error) {
                    if (_this._responsePromises.has(e.data.id)) {
                        var _a = __read(_this._responsePromises.get(e.data.id), 2), resolve = _a[0], reject = _a[1];
                        if (e.data.result) {
                            resolve(e.data.result);
                        }
                        else {
                            reject(new Error(e.data.error));
                        }
                    }
                }
            }
        };
        _this._handleConnect = function () {
            if (!_this._handlerAdded) {
                _this._handlerAdded = true;
                window.addEventListener('message', _this._handleMessage);
                window.addEventListener('beforeunload', _this.disconnect);
            }
            if (_this._injectedProvider) {
                return new Promise(function (resolve) {
                    _this._sendRequest('connect', {});
                    resolve();
                });
            }
            else {
                window.name = 'parent';
                _this._popup = window.open(_this._providerUrl.toString(), '_blank', 'location,resizable,width=460,height=675');
                return new Promise(function (resolve) {
                    _this.once('connect', resolve);
                });
            }
        };
        _this._handleDisconnect = function () {
            if (_this._handlerAdded) {
                _this._handlerAdded = false;
                window.removeEventListener('message', _this._handleMessage);
                window.removeEventListener('beforeunload', _this.disconnect);
            }
            if (_this._publicKey) {
                _this._publicKey = null;
                _this.emit('disconnect');
            }
            _this._responsePromises.forEach(function (_a, id) {
                var _b = __read(_a, 2), resolve = _b[0], reject = _b[1];
                _this._responsePromises.delete(id);
                reject('Wallet disconnected');
            });
        };
        _this._sendRequest = function (method, params) { return __awaiter(_this, void 0, void 0, function () {
            var requestId;
            var _this = this;
            return __generator(this, function (_a) {
                if (method !== 'connect' && !this.connected) {
                    throw new Error('Wallet not connected');
                }
                requestId = this._nextRequestId;
                ++this._nextRequestId;
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this._responsePromises.set(requestId, [resolve, reject]);
                        if (_this._injectedProvider) {
                            _this._injectedProvider.postMessage({
                                jsonrpc: '2.0',
                                id: requestId,
                                method: method,
                                params: __assign({ network: _this._network }, params),
                            });
                        }
                        else {
                            _this._popup.postMessage({
                                jsonrpc: '2.0',
                                id: requestId,
                                method: method,
                                params: params,
                            }, _this._providerUrl.origin);
                            if (!_this.autoApprove) {
                                _this._popup.focus();
                            }
                        }
                    })];
            });
        }); };
        _this.connect = function () {
            if (_this._popup) {
                _this._popup.close();
            }
            return _this._handleConnect();
        };
        _this.disconnect = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._injectedProvider) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._sendRequest('disconnect', {})];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (this._popup) {
                            this._popup.close();
                        }
                        this._handleDisconnect();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.sign = function (data, display) { return __awaiter(_this, void 0, void 0, function () {
            var response, signature, publicKey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(data instanceof Uint8Array)) {
                            throw new Error('Data must be an instance of Uint8Array');
                        }
                        return [4 /*yield*/, this._sendRequest('sign', {
                                data: data,
                                display: display,
                            })];
                    case 1:
                        response = _a.sent();
                        signature = bs58_1.default.decode(response.signature);
                        publicKey = new web3_js_1.PublicKey(response.publicKey);
                        return [2 /*return*/, {
                                signature: signature,
                                publicKey: publicKey,
                            }];
                }
            });
        }); };
        _this.signTransaction = function (transaction) { return __awaiter(_this, void 0, void 0, function () {
            var response, signature, publicKey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._sendRequest('signTransaction', {
                            message: bs58_1.default.encode(transaction.serializeMessage()),
                        })];
                    case 1:
                        response = _a.sent();
                        signature = bs58_1.default.decode(response.signature);
                        publicKey = new web3_js_1.PublicKey(response.publicKey);
                        transaction.addSignature(publicKey, signature);
                        return [2 /*return*/, transaction];
                }
            });
        }); };
        _this.signAllTransactions = function (transactions) { return __awaiter(_this, void 0, void 0, function () {
            var response, signatures, publicKey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._sendRequest('signAllTransactions', {
                            messages: transactions.map(function (tx) { return bs58_1.default.encode(tx.serializeMessage()); }),
                        })];
                    case 1:
                        response = _a.sent();
                        signatures = response.signatures.map(function (s) { return bs58_1.default.decode(s); });
                        publicKey = new web3_js_1.PublicKey(response.publicKey);
                        transactions = transactions.map(function (tx, idx) {
                            tx.addSignature(publicKey, signatures[idx]);
                            return tx;
                        });
                        return [2 /*return*/, transactions];
                }
            });
        }); };
        _this.signAndSendTransaction = function (transaction, options) {
            if (options === void 0) { options = {}; }
            return __awaiter(_this, void 0, void 0, function () {
                var response, publicKey, signature;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._sendRequest('signAndSendTransaction', __assign({ transaction: bs58_1.default.encode(transaction.serialize({ requireAllSignatures: false, verifySignatures: false })) }, options))];
                        case 1:
                            response = _a.sent();
                            publicKey = response.publicKey, signature = response.signature;
                            return [2 /*return*/, { publicKey: new web3_js_1.PublicKey(publicKey), signature: signature }];
                    }
                });
            });
        };
        if (isInjectedProvider(provider)) {
            _this._injectedProvider = provider;
        }
        else if (isString(provider)) {
            _this._providerUrl = new URL(provider);
            _this._providerUrl.hash = new URLSearchParams({
                origin: window.location.origin,
                network: network,
            }).toString();
        }
        else {
            throw new Error('provider parameter must be an injected provider or a URL string.');
        }
        _this._network = network;
        _this._publicKey = null;
        _this._autoApprove = false;
        _this._popup = null;
        _this._handlerAdded = false;
        _this._nextRequestId = 1;
        _this._responsePromises = new Map();
        return _this;
    }
    Object.defineProperty(Wallet.prototype, "publicKey", {
        get: function () {
            return this._publicKey;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Wallet.prototype, "connected", {
        get: function () {
            return this._publicKey !== null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Wallet.prototype, "autoApprove", {
        get: function () {
            return this._autoApprove;
        },
        enumerable: false,
        configurable: true
    });
    return Wallet;
}(eventemitter3_1.default));
exports["default"] = Wallet;
function isString(a) {
    return typeof a === 'string';
}
function isInjectedProvider(a) {
    return isObject(a) && isFunction(a.postMessage);
}
function isObject(a) {
    return typeof a === 'object' && a !== null;
}
function isFunction(a) {
    return typeof a === 'function';
}


/***/ }),

/***/ 1011:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var eventemitter3_1 = __importDefault(__webpack_require__(4045));
var WalletAdapter = /** @class */ (function (_super) {
    __extends(WalletAdapter, _super);
    function WalletAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return WalletAdapter;
}(eventemitter3_1.default));
exports["default"] = WalletAdapter;


/***/ }),

/***/ 7330:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var web3_js_1 = __webpack_require__(9962);
var base_1 = __importDefault(__webpack_require__(1011));
var uuid_1 = __webpack_require__(6697);
var bs58_1 = __importDefault(__webpack_require__(3264));
var IframeAdapter = /** @class */ (function (_super) {
    __extends(IframeAdapter, _super);
    function IframeAdapter(iframe, publicKey) {
        var _this = this;
        var _a;
        _this = _super.call(this) || this;
        _this._publicKey = null;
        _this._messageHandlers = {};
        _this.handleMessage = function (data) {
            if (_this._messageHandlers[data.id]) {
                var _a = _this._messageHandlers[data.id], resolve = _a.resolve, reject = _a.reject;
                delete _this._messageHandlers[data.id];
                if (data.error) {
                    reject(data.error);
                }
                else {
                    resolve(data.result);
                }
            }
        };
        _this._sendMessage = function (data) {
            if (!_this.connected) {
                throw new Error('Wallet not connected');
            }
            return new Promise(function (resolve, reject) {
                var _a, _b;
                var messageId = (0, uuid_1.v4)();
                _this._messageHandlers[messageId] = { resolve: resolve, reject: reject };
                (_b = (_a = _this._iframe) === null || _a === void 0 ? void 0 : _a.contentWindow) === null || _b === void 0 ? void 0 : _b.postMessage({
                    channel: 'solflareWalletAdapterToIframe',
                    data: __assign({ id: messageId }, data)
                }, '*');
            });
        };
        _this._iframe = iframe;
        _this._publicKey = new web3_js_1.PublicKey((_a = publicKey === null || publicKey === void 0 ? void 0 : publicKey.toString) === null || _a === void 0 ? void 0 : _a.call(publicKey));
        return _this;
    }
    Object.defineProperty(IframeAdapter.prototype, "publicKey", {
        get: function () {
            return this._publicKey || null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IframeAdapter.prototype, "connected", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    IframeAdapter.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    IframeAdapter.prototype.disconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._sendMessage({
                            method: 'disconnect'
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    IframeAdapter.prototype.signTransaction = function (message) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var signature, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.connected) {
                            throw new Error('Wallet not connected');
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this._sendMessage({
                                method: 'signTransaction',
                                params: {
                                    message: bs58_1.default.encode(message)
                                }
                            })];
                    case 2:
                        signature = (_b.sent()).signature;
                        return [2 /*return*/, bs58_1.default.decode(signature)];
                    case 3:
                        e_1 = _b.sent();
                        throw new Error(((_a = e_1 === null || e_1 === void 0 ? void 0 : e_1.toString) === null || _a === void 0 ? void 0 : _a.call(e_1)) || 'Failed to sign transaction');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    IframeAdapter.prototype.signAllTransactions = function (messages) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var signatures, e_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.connected) {
                            throw new Error('Wallet not connected');
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this._sendMessage({
                                method: 'signAllTransactions',
                                params: {
                                    messages: messages.map(function (message) { return bs58_1.default.encode(message); })
                                }
                            })];
                    case 2:
                        signatures = (_b.sent()).signatures;
                        return [2 /*return*/, signatures.map(function (signature) { return bs58_1.default.decode(signature); })];
                    case 3:
                        e_2 = _b.sent();
                        throw new Error(((_a = e_2 === null || e_2 === void 0 ? void 0 : e_2.toString) === null || _a === void 0 ? void 0 : _a.call(e_2)) || 'Failed to sign transactions');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    IframeAdapter.prototype.signAndSendTransaction = function (transaction, options) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var result, e_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.connected) {
                            throw new Error('Wallet not connected');
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this._sendMessage({
                                method: 'signAndSendTransaction',
                                params: {
                                    transaction: bs58_1.default.encode(transaction),
                                    options: options
                                }
                            })];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, result];
                    case 3:
                        e_3 = _b.sent();
                        throw new Error(((_a = e_3 === null || e_3 === void 0 ? void 0 : e_3.toString) === null || _a === void 0 ? void 0 : _a.call(e_3)) || 'Failed to sign and send transaction');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    IframeAdapter.prototype.signMessage = function (data, display) {
        var _a;
        if (display === void 0) { display = 'hex'; }
        return __awaiter(this, void 0, void 0, function () {
            var result, e_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.connected) {
                            throw new Error('Wallet not connected');
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this._sendMessage({
                                method: 'signMessage',
                                params: {
                                    data: data,
                                    display: display
                                }
                            })];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, Uint8Array.from(bs58_1.default.decode(result))];
                    case 3:
                        e_4 = _b.sent();
                        throw new Error(((_a = e_4 === null || e_4 === void 0 ? void 0 : e_4.toString) === null || _a === void 0 ? void 0 : _a.call(e_4)) || 'Failed to sign message');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return IframeAdapter;
}(base_1.default));
exports["default"] = IframeAdapter;


/***/ }),

/***/ 769:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var base_1 = __importDefault(__webpack_require__(1011));
var WalletProvider_1 = __importDefault(__webpack_require__(4775));
var bs58_1 = __importDefault(__webpack_require__(3264));
var WebAdapter = /** @class */ (function (_super) {
    __extends(WebAdapter, _super);
    // @ts-ignore
    function WebAdapter(iframe, network, provider) {
        var _this = _super.call(this) || this;
        _this._instance = null;
        // @ts-ignore
        _this.handleMessage = function (data) {
            // nothing to do here
        };
        _this._sendRequest = function (method, params) { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!((_a = this._instance) === null || _a === void 0 ? void 0 : _a.sendRequest)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._instance.sendRequest(method, params)];
                    case 1: return [2 /*return*/, _c.sent()];
                    case 2:
                        if (!((_b = this._instance) === null || _b === void 0 ? void 0 : _b._sendRequest)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this._instance._sendRequest(method, params)];
                    case 3: return [2 /*return*/, _c.sent()];
                    case 4: throw new Error('Unsupported version of `@project-serum/sol-wallet-adapter`');
                }
            });
        }); };
        _this._handleConnect = function () {
            _this.emit('connect');
        };
        _this._handleDisconnect = function () {
            window.clearInterval(_this._pollTimer);
            _this.emit('disconnect');
        };
        _this._network = network;
        _this._provider = provider;
        return _this;
    }
    Object.defineProperty(WebAdapter.prototype, "publicKey", {
        get: function () {
            return this._instance.publicKey || null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WebAdapter.prototype, "connected", {
        get: function () {
            return this._instance.connected || false;
        },
        enumerable: false,
        configurable: true
    });
    WebAdapter.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._instance = new WalletProvider_1.default(this._provider, this._network);
                        this._instance.on('connect', this._handleConnect);
                        this._instance.on('disconnect', this._handleDisconnect);
                        this._pollTimer = window.setInterval(function () {
                            var _a, _b;
                            // @ts-ignore
                            if (((_b = (_a = _this._instance) === null || _a === void 0 ? void 0 : _a._popup) === null || _b === void 0 ? void 0 : _b.closed) !== false) {
                                _this._handleDisconnect();
                            }
                        }, 200);
                        return [4 /*yield*/, this._instance.connect()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WebAdapter.prototype.disconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.connected) {
                            throw new Error('Wallet not connected');
                        }
                        this._instance.removeAllListeners('connect');
                        this._instance.removeAllListeners('disconnect');
                        return [4 /*yield*/, this._instance.disconnect()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WebAdapter.prototype.signTransaction = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.connected) {
                            throw new Error('Wallet not connected');
                        }
                        return [4 /*yield*/, this._sendRequest('signTransaction', {
                                message: bs58_1.default.encode(message)
                            })];
                    case 1:
                        response = (_a.sent());
                        return [2 /*return*/, bs58_1.default.decode(response.signature)];
                }
            });
        });
    };
    WebAdapter.prototype.signAllTransactions = function (messages) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.connected) {
                            throw new Error('Wallet not connected');
                        }
                        return [4 /*yield*/, this._sendRequest('signAllTransactions', {
                                messages: messages.map(function (message) { return bs58_1.default.encode(message); })
                            })];
                    case 1:
                        response = (_a.sent());
                        return [2 /*return*/, response.signatures.map(function (signature) { return bs58_1.default.decode(signature); })];
                }
            });
        });
    };
    WebAdapter.prototype.signAndSendTransaction = function (transaction, options) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.connected) {
                            throw new Error('Wallet not connected');
                        }
                        return [4 /*yield*/, this._sendRequest('signAndSendTransaction', {
                                transaction: bs58_1.default.encode(transaction),
                                options: options
                            })];
                    case 1:
                        response = (_a.sent());
                        return [2 /*return*/, response.signature];
                }
            });
        });
    };
    WebAdapter.prototype.signMessage = function (data, display) {
        if (display === void 0) { display = 'hex'; }
        return __awaiter(this, void 0, void 0, function () {
            var signature;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.connected) {
                            throw new Error('Wallet not connected');
                        }
                        return [4 /*yield*/, this._instance.sign(data, display)];
                    case 1:
                        signature = (_a.sent()).signature;
                        return [2 /*return*/, Uint8Array.from(signature)];
                }
            });
        });
    };
    return WebAdapter;
}(base_1.default));
exports["default"] = WebAdapter;


/***/ }),

/***/ 7400:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var eventemitter3_1 = __importDefault(__webpack_require__(4045));
var web_1 = __importDefault(__webpack_require__(769));
var iframe_1 = __importDefault(__webpack_require__(7330));
var utils_1 = __webpack_require__(6516);
var version_1 = __webpack_require__(3348);
var Solflare = /** @class */ (function (_super) {
    __extends(Solflare, _super);
    function Solflare(config) {
        var _this = _super.call(this) || this;
        _this._network = 'mainnet-beta';
        _this._provider = null;
        _this._iframeParams = {};
        _this._adapterInstance = null;
        _this._element = null;
        _this._iframe = null;
        _this._connectHandler = null;
        _this._flutterHandlerInterval = null;
        _this._handleEvent = function (event) {
            var _a, _b, _c, _d;
            switch (event.type) {
                case 'connect_native_web': {
                    _this._collapseIframe();
                    _this._adapterInstance = new web_1.default(_this._iframe, _this._network, ((_a = event.data) === null || _a === void 0 ? void 0 : _a.provider) || _this._provider || 'https://solflare.com/provider');
                    _this._adapterInstance.on('connect', _this._webConnected);
                    _this._adapterInstance.on('disconnect', _this._webDisconnected);
                    _this._adapterInstance.connect();
                    _this._setPreferredAdapter('native_web');
                    return;
                }
                case 'connect': {
                    _this._collapseIframe();
                    _this._adapterInstance = new iframe_1.default(_this._iframe, ((_b = event.data) === null || _b === void 0 ? void 0 : _b.publicKey) || '');
                    _this._adapterInstance.connect();
                    _this._setPreferredAdapter((_c = event.data) === null || _c === void 0 ? void 0 : _c.adapter);
                    if (_this._connectHandler) {
                        _this._connectHandler.resolve();
                        _this._connectHandler = null;
                    }
                    _this.emit('connect', _this.publicKey);
                    return;
                }
                case 'disconnect': {
                    if (_this._connectHandler) {
                        _this._connectHandler.reject();
                        _this._connectHandler = null;
                    }
                    _this._disconnected();
                    _this.emit('disconnect');
                    return;
                }
                case 'accountChanged': {
                    if ((_d = event.data) === null || _d === void 0 ? void 0 : _d.publicKey) {
                        _this._adapterInstance = new iframe_1.default(_this._iframe, event.data.publicKey);
                        _this._adapterInstance.connect();
                        _this.emit('accountChanged', _this.publicKey);
                    }
                    else {
                        _this.emit('accountChanged', undefined);
                    }
                    return;
                }
                // legacy event, use resize message type instead
                case 'collapse': {
                    _this._collapseIframe();
                    return;
                }
                default: {
                    return;
                }
            }
        };
        _this._handleResize = function (data) {
            if (data.resizeMode === 'full') {
                if (data.params.mode === 'fullscreen') {
                    _this._expandIframe();
                }
                else if (data.params.mode === 'hide') {
                    _this._collapseIframe();
                }
            }
            else if (data.resizeMode === 'coordinates') {
                if (_this._iframe) {
                    _this._iframe.style.top = isFinite(data.params.top) ? "".concat(data.params.top, "px") : '';
                    _this._iframe.style.bottom = isFinite(data.params.bottom) ? "".concat(data.params.bottom, "px") : '';
                    _this._iframe.style.left = isFinite(data.params.left) ? "".concat(data.params.left, "px") : '';
                    _this._iframe.style.right = isFinite(data.params.right) ? "".concat(data.params.right, "px") : '';
                    _this._iframe.style.width = isFinite(data.params.width) ? "".concat(data.params.width, "px") : data.params.width;
                    _this._iframe.style.height = isFinite(data.params.height) ? "".concat(data.params.height, "px") : data.params.height;
                }
            }
        };
        _this._handleMessage = function (event) {
            var _a;
            if (((_a = event.data) === null || _a === void 0 ? void 0 : _a.channel) !== 'solflareIframeToWalletAdapter') {
                return;
            }
            var data = event.data.data || {};
            if (data.type === 'event') {
                _this._handleEvent(data.event);
            }
            else if (data.type === 'resize') {
                _this._handleResize(data);
            }
            else if (data.type === 'response') {
                if (_this._adapterInstance) {
                    _this._adapterInstance.handleMessage(data);
                }
            }
        };
        _this._removeElement = function () {
            if (_this._flutterHandlerInterval !== null) {
                clearInterval(_this._flutterHandlerInterval);
                _this._flutterHandlerInterval = null;
            }
            if (_this._element) {
                _this._element.remove();
                _this._element = null;
            }
        };
        _this._removeDanglingElements = function () {
            var e_1, _a;
            var elements = document.getElementsByClassName('solflare-wallet-adapter-iframe');
            try {
                for (var elements_1 = __values(elements), elements_1_1 = elements_1.next(); !elements_1_1.done; elements_1_1 = elements_1.next()) {
                    var element = elements_1_1.value;
                    if (element.parentElement) {
                        element.remove();
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (elements_1_1 && !elements_1_1.done && (_a = elements_1.return)) _a.call(elements_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        _this._injectElement = function () {
            _this._removeElement();
            _this._removeDanglingElements();
            var params = __assign(__assign({}, _this._iframeParams), { cluster: _this._network || 'mainnet-beta', origin: window.location.origin || '', title: document.title || '', version: 1, sdkVersion: version_1.VERSION || 'unknown' });
            var preferredAdapter = _this._getPreferredAdapter();
            if (preferredAdapter) {
                params.adapter = preferredAdapter;
            }
            if (_this._provider) {
                params.provider = _this._provider;
            }
            var queryString = Object.keys(params)
                .map(function (key) { return "".concat(key, "=").concat(encodeURIComponent(params[key])); })
                .join('&');
            var iframeUrl = "".concat(Solflare.IFRAME_URL, "?").concat(queryString);
            _this._element = document.createElement('div');
            _this._element.className = 'solflare-wallet-adapter-iframe';
            _this._element.innerHTML = "\n      <iframe src='".concat(iframeUrl, "' referrerPolicy='strict-origin-when-cross-origin' style='position: fixed; top: 0; bottom: 0; left: 0; right: 0; width: 100%; height: 100%; border: none; border-radius: 0; z-index: 99999; color-scheme: auto;' allowtransparency='true'></iframe>\n    ");
            document.body.appendChild(_this._element);
            _this._iframe = _this._element.querySelector('iframe');
            // @ts-ignore
            window.fromFlutter = _this._handleMobileMessage;
            _this._flutterHandlerInterval = setInterval(function () {
                // @ts-ignore
                window.fromFlutter = _this._handleMobileMessage;
            }, 100);
            window.addEventListener('message', _this._handleMessage, false);
        };
        _this._collapseIframe = function () {
            if (_this._iframe) {
                _this._iframe.style.top = '';
                _this._iframe.style.right = '';
                _this._iframe.style.height = '2px';
                _this._iframe.style.width = '2px';
            }
        };
        _this._expandIframe = function () {
            if (_this._iframe) {
                _this._iframe.style.top = '0px';
                _this._iframe.style.bottom = '0px';
                _this._iframe.style.left = '0px';
                _this._iframe.style.right = '0px';
                _this._iframe.style.width = '100%';
                _this._iframe.style.height = '100%';
            }
        };
        _this._getPreferredAdapter = function () {
            if (localStorage) {
                return localStorage.getItem('solflarePreferredWalletAdapter') || null;
            }
            return null;
        };
        _this._setPreferredAdapter = function (adapter) {
            if (localStorage && adapter) {
                localStorage.setItem('solflarePreferredWalletAdapter', adapter);
            }
        };
        _this._clearPreferredAdapter = function () {
            if (localStorage) {
                localStorage.removeItem('solflarePreferredWalletAdapter');
            }
        };
        _this._webConnected = function () {
            if (_this._connectHandler) {
                _this._connectHandler.resolve();
                _this._connectHandler = null;
            }
            _this.emit('connect', _this.publicKey);
        };
        _this._webDisconnected = function () {
            if (_this._connectHandler) {
                _this._connectHandler.reject();
                _this._connectHandler = null;
            }
            _this._disconnected();
            _this.emit('disconnect');
        };
        _this._disconnected = function () {
            window.removeEventListener('message', _this._handleMessage, false);
            _this._removeElement();
            _this._clearPreferredAdapter();
            _this._adapterInstance = null;
        };
        _this._handleMobileMessage = function (data) {
            var _a, _b;
            (_b = (_a = _this._iframe) === null || _a === void 0 ? void 0 : _a.contentWindow) === null || _b === void 0 ? void 0 : _b.postMessage({
                channel: 'solflareMobileToIframe',
                data: data
            }, '*');
        };
        if (config === null || config === void 0 ? void 0 : config.network) {
            _this._network = config === null || config === void 0 ? void 0 : config.network;
        }
        if (config === null || config === void 0 ? void 0 : config.provider) {
            _this._provider = config === null || config === void 0 ? void 0 : config.provider;
        }
        if (config === null || config === void 0 ? void 0 : config.params) {
            _this._iframeParams = __assign({}, config === null || config === void 0 ? void 0 : config.params);
        }
        return _this;
    }
    Object.defineProperty(Solflare.prototype, "publicKey", {
        get: function () {
            var _a;
            return ((_a = this._adapterInstance) === null || _a === void 0 ? void 0 : _a.publicKey) || null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Solflare.prototype, "isConnected", {
        get: function () {
            var _a;
            return !!((_a = this._adapterInstance) === null || _a === void 0 ? void 0 : _a.connected);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Solflare.prototype, "connected", {
        get: function () {
            return this.isConnected;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Solflare.prototype, "autoApprove", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Solflare.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.connected) {
                            return [2 /*return*/];
                        }
                        this._injectElement();
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                _this._connectHandler = { resolve: resolve, reject: reject };
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Solflare.prototype.disconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._adapterInstance) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this._adapterInstance.disconnect()];
                    case 1:
                        _a.sent();
                        this._disconnected();
                        this.emit('disconnect');
                        return [2 /*return*/];
                }
            });
        });
    };
    Solflare.prototype.signTransaction = function (transaction) {
        return __awaiter(this, void 0, void 0, function () {
            var serializedMessage, signature, signerPubkeys, signerIndex;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.connected) {
                            throw new Error('Wallet not connected');
                        }
                        serializedMessage = (0, utils_1.isLegacyTransactionInstance)(transaction) ? transaction.serializeMessage() : transaction.message.serialize();
                        return [4 /*yield*/, this._adapterInstance.signTransaction(serializedMessage)];
                    case 1:
                        signature = _a.sent();
                        if ((0, utils_1.isLegacyTransactionInstance)(transaction)) {
                            transaction.addSignature(this.publicKey, Buffer.from(signature));
                        }
                        else {
                            signerPubkeys = transaction.message.staticAccountKeys.slice(0, transaction.message.header.numRequiredSignatures);
                            signerIndex = signerPubkeys.findIndex(function (pubkey) { return pubkey.equals(_this.publicKey); });
                            if (signerIndex >= 0) {
                                transaction.signatures[signerIndex] = signature;
                            }
                        }
                        return [2 /*return*/, transaction];
                }
            });
        });
    };
    Solflare.prototype.signAllTransactions = function (transactions) {
        return __awaiter(this, void 0, void 0, function () {
            var serializedMessages, signatures, i, transaction, signerPubkeys, signerIndex;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.connected) {
                            throw new Error('Wallet not connected');
                        }
                        serializedMessages = transactions.map(function (transaction) {
                            return (0, utils_1.isLegacyTransactionInstance)(transaction) ? transaction.serializeMessage() : transaction.message.serialize();
                        });
                        return [4 /*yield*/, this._adapterInstance.signAllTransactions(serializedMessages)];
                    case 1:
                        signatures = _a.sent();
                        for (i = 0; i < transactions.length; i++) {
                            transaction = transactions[i];
                            if ((0, utils_1.isLegacyTransactionInstance)(transaction)) {
                                transaction.addSignature(this.publicKey, Buffer.from(signatures[i]));
                            }
                            else {
                                signerPubkeys = transaction.message.staticAccountKeys.slice(0, transaction.message.header.numRequiredSignatures);
                                signerIndex = signerPubkeys.findIndex(function (pubkey) { return pubkey.equals(_this.publicKey); });
                                if (signerIndex >= 0) {
                                    transaction.signatures[signerIndex] = signatures[i];
                                }
                            }
                        }
                        return [2 /*return*/, transactions];
                }
            });
        });
    };
    Solflare.prototype.signAndSendTransaction = function (transaction, options) {
        return __awaiter(this, void 0, void 0, function () {
            var serializedTransaction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.connected) {
                            throw new Error('Wallet not connected');
                        }
                        serializedTransaction = (0, utils_1.isLegacyTransactionInstance)(transaction) ? transaction.serialize({ verifySignatures: false, requireAllSignatures: false }) : transaction.serialize();
                        return [4 /*yield*/, this._adapterInstance.signAndSendTransaction(serializedTransaction, options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Solflare.prototype.signMessage = function (data, display) {
        if (display === void 0) { display = 'utf8'; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.connected) {
                            throw new Error('Wallet not connected');
                        }
                        return [4 /*yield*/, this._adapterInstance.signMessage(data, display)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Solflare.prototype.sign = function (data, display) {
        if (display === void 0) { display = 'utf8'; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.signMessage(data, display)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Solflare.prototype.detectWallet = function (timeout) {
        var _a;
        if (timeout === void 0) { timeout = 10; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                if (window.SolflareApp || ((_a = window.solflare) === null || _a === void 0 ? void 0 : _a.isSolflare)) {
                    return [2 /*return*/, true];
                }
                return [2 /*return*/, new Promise(function (resolve) {
                        var pollInterval, pollTimeout;
                        pollInterval = setInterval(function () {
                            var _a;
                            if (window.SolflareApp || ((_a = window.solflare) === null || _a === void 0 ? void 0 : _a.isSolflare)) {
                                clearInterval(pollInterval);
                                clearTimeout(pollTimeout);
                                resolve(true);
                            }
                        }, 500);
                        pollTimeout = setTimeout(function () {
                            clearInterval(pollInterval);
                            resolve(false);
                        }, timeout * 1000);
                    })];
            });
        });
    };
    Solflare.IFRAME_URL = 'https://connect.solflare.com/';
    return Solflare;
}(eventemitter3_1.default));
exports["default"] = Solflare;


/***/ }),

/***/ 6516:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isLegacyTransactionInstance = void 0;
function isLegacyTransactionInstance(transaction) {
    return transaction.version === undefined;
}
exports.isLegacyTransactionInstance = isLegacyTransactionInstance;


/***/ }),

/***/ 3348:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VERSION = void 0;
exports.VERSION = "1.4.1";


/***/ }),

/***/ 4045:
/***/ ((module) => {



var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if (true) {
  module.exports = EventEmitter;
}


/***/ }),

/***/ 6697:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "NIL": () => (/* reexport */ nil),
  "parse": () => (/* reexport */ esm_node_parse),
  "stringify": () => (/* reexport */ esm_node_stringify),
  "v1": () => (/* reexport */ esm_node_v1),
  "v3": () => (/* reexport */ esm_node_v3),
  "v4": () => (/* reexport */ esm_node_v4),
  "v5": () => (/* reexport */ esm_node_v5),
  "validate": () => (/* reexport */ esm_node_validate),
  "version": () => (/* reexport */ esm_node_version)
});

// EXTERNAL MODULE: external "crypto"
var external_crypto_ = __webpack_require__(6113);
var external_crypto_default = /*#__PURE__*/__webpack_require__.n(external_crypto_);
;// CONCATENATED MODULE: ../node_modules/@solflare-wallet/sdk/node_modules/uuid/dist/esm-node/rng.js

const rnds8Pool = new Uint8Array(256); // # of random values to pre-allocate

let poolPtr = rnds8Pool.length;
function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    external_crypto_default().randomFillSync(rnds8Pool);
    poolPtr = 0;
  }

  return rnds8Pool.slice(poolPtr, poolPtr += 16);
}
;// CONCATENATED MODULE: ../node_modules/@solflare-wallet/sdk/node_modules/uuid/dist/esm-node/regex.js
/* harmony default export */ const regex = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);
;// CONCATENATED MODULE: ../node_modules/@solflare-wallet/sdk/node_modules/uuid/dist/esm-node/validate.js


function validate(uuid) {
  return typeof uuid === 'string' && regex.test(uuid);
}

/* harmony default export */ const esm_node_validate = (validate);
;// CONCATENATED MODULE: ../node_modules/@solflare-wallet/sdk/node_modules/uuid/dist/esm-node/stringify.js

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}

function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
}

function stringify(arr, offset = 0) {
  const uuid = unsafeStringify(arr, offset); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!esm_node_validate(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ const esm_node_stringify = (stringify);
;// CONCATENATED MODULE: ../node_modules/@solflare-wallet/sdk/node_modules/uuid/dist/esm-node/v1.js

 // **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

let _nodeId;

let _clockseq; // Previous uuid creation time


let _lastMSecs = 0;
let _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details

function v1(options, buf, offset) {
  let i = buf && offset || 0;
  const b = buf || new Array(16);
  options = options || {};
  let node = options.node || _nodeId;
  let clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189

  if (node == null || clockseq == null) {
    const seedBytes = options.random || (options.rng || rng)();

    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }

    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.


  let msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock

  let nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)

  const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression

  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval


  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  } // Per 4.2.1.2 Throw error if too many uuids are requested


  if (nsecs >= 10000) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch

  msecs += 12219292800000; // `time_low`

  const tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff; // `time_mid`

  const tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff; // `time_high_and_version`

  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version

  b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)

  b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`

  b[i++] = clockseq & 0xff; // `node`

  for (let n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf || unsafeStringify(b);
}

/* harmony default export */ const esm_node_v1 = (v1);
;// CONCATENATED MODULE: ../node_modules/@solflare-wallet/sdk/node_modules/uuid/dist/esm-node/parse.js


function parse(uuid) {
  if (!esm_node_validate(uuid)) {
    throw TypeError('Invalid UUID');
  }

  let v;
  const arr = new Uint8Array(16); // Parse ########-....-....-....-............

  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 0xff;
  arr[2] = v >>> 8 & 0xff;
  arr[3] = v & 0xff; // Parse ........-####-....-....-............

  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 0xff; // Parse ........-....-####-....-............

  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 0xff; // Parse ........-....-....-####-............

  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 0xff; // Parse ........-....-....-....-############
  // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)

  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;
  arr[11] = v / 0x100000000 & 0xff;
  arr[12] = v >>> 24 & 0xff;
  arr[13] = v >>> 16 & 0xff;
  arr[14] = v >>> 8 & 0xff;
  arr[15] = v & 0xff;
  return arr;
}

/* harmony default export */ const esm_node_parse = (parse);
;// CONCATENATED MODULE: ../node_modules/@solflare-wallet/sdk/node_modules/uuid/dist/esm-node/v35.js



function stringToBytes(str) {
  str = unescape(encodeURIComponent(str)); // UTF8 escape

  const bytes = [];

  for (let i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }

  return bytes;
}

const DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
const URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
function v35(name, version, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    var _namespace;

    if (typeof value === 'string') {
      value = stringToBytes(value);
    }

    if (typeof namespace === 'string') {
      namespace = esm_node_parse(namespace);
    }

    if (((_namespace = namespace) === null || _namespace === void 0 ? void 0 : _namespace.length) !== 16) {
      throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
    } // Compute hash of namespace and value, Per 4.3
    // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
    // hashfunc([...namespace, ... value])`


    let bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 0x0f | version;
    bytes[8] = bytes[8] & 0x3f | 0x80;

    if (buf) {
      offset = offset || 0;

      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }

      return buf;
    }

    return unsafeStringify(bytes);
  } // Function#name is not settable on some platforms (#270)


  try {
    generateUUID.name = name; // eslint-disable-next-line no-empty
  } catch (err) {} // For CommonJS default export support


  generateUUID.DNS = DNS;
  generateUUID.URL = URL;
  return generateUUID;
}
;// CONCATENATED MODULE: ../node_modules/@solflare-wallet/sdk/node_modules/uuid/dist/esm-node/md5.js


function md5(bytes) {
  if (Array.isArray(bytes)) {
    bytes = Buffer.from(bytes);
  } else if (typeof bytes === 'string') {
    bytes = Buffer.from(bytes, 'utf8');
  }

  return external_crypto_default().createHash('md5').update(bytes).digest();
}

/* harmony default export */ const esm_node_md5 = (md5);
;// CONCATENATED MODULE: ../node_modules/@solflare-wallet/sdk/node_modules/uuid/dist/esm-node/v3.js


const v3 = v35('v3', 0x30, esm_node_md5);
/* harmony default export */ const esm_node_v3 = (v3);
;// CONCATENATED MODULE: ../node_modules/@solflare-wallet/sdk/node_modules/uuid/dist/esm-node/native.js

/* harmony default export */ const esm_node_native = ({
  randomUUID: (external_crypto_default()).randomUUID
});
;// CONCATENATED MODULE: ../node_modules/@solflare-wallet/sdk/node_modules/uuid/dist/esm-node/v4.js




function v4(options, buf, offset) {
  if (esm_node_native.randomUUID && !buf && !options) {
    return esm_node_native.randomUUID();
  }

  options = options || {};
  const rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return unsafeStringify(rnds);
}

/* harmony default export */ const esm_node_v4 = (v4);
;// CONCATENATED MODULE: ../node_modules/@solflare-wallet/sdk/node_modules/uuid/dist/esm-node/sha1.js


function sha1(bytes) {
  if (Array.isArray(bytes)) {
    bytes = Buffer.from(bytes);
  } else if (typeof bytes === 'string') {
    bytes = Buffer.from(bytes, 'utf8');
  }

  return external_crypto_default().createHash('sha1').update(bytes).digest();
}

/* harmony default export */ const esm_node_sha1 = (sha1);
;// CONCATENATED MODULE: ../node_modules/@solflare-wallet/sdk/node_modules/uuid/dist/esm-node/v5.js


const v5 = v35('v5', 0x50, esm_node_sha1);
/* harmony default export */ const esm_node_v5 = (v5);
;// CONCATENATED MODULE: ../node_modules/@solflare-wallet/sdk/node_modules/uuid/dist/esm-node/nil.js
/* harmony default export */ const nil = ('00000000-0000-0000-0000-000000000000');
;// CONCATENATED MODULE: ../node_modules/@solflare-wallet/sdk/node_modules/uuid/dist/esm-node/version.js


function version(uuid) {
  if (!esm_node_validate(uuid)) {
    throw TypeError('Invalid UUID');
  }

  return parseInt(uuid.slice(14, 15), 16);
}

/* harmony default export */ const esm_node_version = (version);
;// CONCATENATED MODULE: ../node_modules/@solflare-wallet/sdk/node_modules/uuid/dist/esm-node/index.js










/***/ })

};
;
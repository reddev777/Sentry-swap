"use strict";
exports.id = 466;
exports.ids = [466];
exports.modules = {

/***/ 4059:
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.detectProvider = exports.isSnapSupported = void 0;
function isSnapSupported(provider) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield provider.request({ method: 'wallet_getSnaps' });
            return true;
        }
        catch (error) {
            return false;
        }
    });
}
exports.isSnapSupported = isSnapSupported;
function detectProvider() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const provider = window.ethereum;
            if (!provider) {
                return null;
            }
            if (provider.providers && Array.isArray(provider.providers)) {
                const providers = provider.providers;
                for (const provider of providers) {
                    if (yield isSnapSupported(provider)) {
                        return provider;
                    }
                }
            }
            if (provider.detected && Array.isArray(provider.detected)) {
                const providers = provider.detected;
                for (const provider of providers) {
                    if (yield isSnapSupported(provider)) {
                        return provider;
                    }
                }
            }
            if (yield isSnapSupported(provider)) {
                return provider;
            }
            return null;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    });
}
exports.detectProvider = detectProvider;


/***/ }),

/***/ 7560:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const web3_js_1 = __webpack_require__(9962);
const eventemitter3_1 = __importDefault(__webpack_require__(9974));
const bs58_1 = __importDefault(__webpack_require__(3264));
const uuid_1 = __webpack_require__(9134);
const utils_1 = __webpack_require__(9576);
const detectProvider_1 = __webpack_require__(4059);
const account_1 = __webpack_require__(2192);
const solana_1 = __webpack_require__(6460);
__exportStar(__webpack_require__(11), exports);
__exportStar(__webpack_require__(2192), exports);
class SolflareMetaMask extends eventemitter3_1.default {
    constructor(config) {
        super();
        this._network = 'mainnet-beta';
        this._iframeParams = {};
        this._element = null;
        this._iframe = null;
        this._publicKey = null;
        this._account = null;
        this._isConnected = false;
        this._connectHandler = null;
        this._messageHandlers = {};
        this._handleEvent = (event) => {
            var _a, _b;
            switch (event.type) {
                case 'connect': {
                    this._collapseIframe();
                    if ((_a = event.data) === null || _a === void 0 ? void 0 : _a.publicKey) {
                        this._publicKey = event.data.publicKey;
                        this._isConnected = true;
                        if (this._connectHandler) {
                            this._connectHandler.resolve();
                            this._connectHandler = null;
                        }
                        this._connected();
                    }
                    else {
                        if (this._connectHandler) {
                            this._connectHandler.reject();
                            this._connectHandler = null;
                        }
                        this._disconnected();
                    }
                    return;
                }
                case 'disconnect': {
                    if (this._connectHandler) {
                        this._connectHandler.reject();
                        this._connectHandler = null;
                    }
                    this._disconnected();
                    return;
                }
                case 'accountChanged': {
                    if ((_b = event.data) === null || _b === void 0 ? void 0 : _b.publicKey) {
                        this._publicKey = event.data.publicKey;
                        this.emit('accountChanged', this.publicKey);
                        this._standardConnected();
                    }
                    else {
                        this.emit('accountChanged', undefined);
                        this._standardDisconnected();
                    }
                    return;
                }
                default: {
                    return;
                }
            }
        };
        this._handleResize = (data) => {
            if (data.resizeMode === 'full') {
                if (data.params.mode === 'fullscreen') {
                    this._expandIframe();
                }
                else if (data.params.mode === 'hide') {
                    this._collapseIframe();
                }
            }
            else if (data.resizeMode === 'coordinates') {
                this._resizeIframe(data.params);
            }
        };
        this._handleMessage = (event) => {
            var _a;
            if (((_a = event.data) === null || _a === void 0 ? void 0 : _a.channel) !== 'solflareIframeToWalletAdapter') {
                return;
            }
            const data = event.data.data || {};
            if (data.type === 'event') {
                this._handleEvent(data.event);
            }
            else if (data.type === 'resize') {
                this._handleResize(data);
            }
            else if (data.type === 'response') {
                if (this._messageHandlers[data.id]) {
                    const { resolve, reject } = this._messageHandlers[data.id];
                    delete this._messageHandlers[data.id];
                    if (data.error) {
                        reject(data.error);
                    }
                    else {
                        resolve(data.result);
                    }
                }
            }
        };
        this._removeElement = () => {
            if (this._element) {
                this._element.remove();
                this._element = null;
            }
        };
        this._removeDanglingElements = () => {
            const elements = document.getElementsByClassName('solflare-metamask-wallet-adapter-iframe');
            for (const element of elements) {
                if (element.parentElement) {
                    element.remove();
                }
            }
        };
        this._injectElement = () => {
            this._removeElement();
            this._removeDanglingElements();
            const params = Object.assign(Object.assign({}, this._iframeParams), { mm: true, v: 1, cluster: this._network || 'mainnet-beta', origin: window.location.origin || '', title: document.title || '' });
            const queryString = Object.keys(params)
                .map((key) => `${key}=${encodeURIComponent(params[key])}`)
                .join('&');
            const iframeUrl = `${SolflareMetaMask.IFRAME_URL}?${queryString}`;
            this._element = document.createElement('div');
            this._element.className = 'solflare-metamask-wallet-adapter-iframe';
            this._element.innerHTML = `
      <iframe src='${iframeUrl}' style='position: fixed; top: 0; bottom: 0; left: 0; right: 0; width: 100%; height: 100%; border: none; border-radius: 0; z-index: 99999; color-scheme: auto;' allowtransparency='true'></iframe>
    `;
            document.body.appendChild(this._element);
            this._iframe = this._element.querySelector('iframe');
            window.addEventListener('message', this._handleMessage, false);
        };
        this._collapseIframe = () => {
            if (this._iframe) {
                this._iframe.style.top = '';
                this._iframe.style.right = '';
                this._iframe.style.height = '2px';
                this._iframe.style.width = '2px';
            }
        };
        this._expandIframe = () => {
            if (this._iframe) {
                this._iframe.style.top = '0px';
                this._iframe.style.bottom = '0px';
                this._iframe.style.left = '0px';
                this._iframe.style.right = '0px';
                this._iframe.style.width = '100%';
                this._iframe.style.height = '100%';
            }
        };
        this._resizeIframe = (params) => {
            if (!this._iframe) {
                return;
            }
            this._iframe.style.top = isFinite(params.top) ? `${params.top}px` : '';
            this._iframe.style.bottom = isFinite(params.bottom) ? `${params.bottom}px` : '';
            this._iframe.style.left = isFinite(params.left) ? `${params.left}px` : '';
            this._iframe.style.right = isFinite(params.right) ? `${params.right}px` : '';
            this._iframe.style.width = isFinite(params.width)
                ? `${params.width}px`
                : params.width;
            this._iframe.style.height = isFinite(params.height)
                ? `${params.height}px`
                : params.height;
        };
        this._sendIframeMessage = (data) => {
            if (!this.connected || !this.publicKey) {
                throw new Error('Wallet not connected');
            }
            return new Promise((resolve, reject) => {
                var _a, _b;
                const messageId = (0, uuid_1.v4)();
                this._messageHandlers[messageId] = { resolve, reject };
                (_b = (_a = this._iframe) === null || _a === void 0 ? void 0 : _a.contentWindow) === null || _b === void 0 ? void 0 : _b.postMessage({
                    channel: 'solflareWalletAdapterToIframe',
                    data: Object.assign({ id: messageId }, data)
                }, '*');
            });
        };
        this._connected = () => {
            this._isConnected = true;
            this.emit('connect', this.publicKey);
            this._standardConnected();
        };
        this._disconnected = () => {
            this._publicKey = null;
            this._isConnected = false;
            window.removeEventListener('message', this._handleMessage, false);
            this._removeElement();
            this.emit('disconnect');
            this._standardDisconnected();
        };
        this._standardConnected = () => {
            if (!this.publicKey) {
                return;
            }
            const address = this.publicKey.toString();
            if (!this._account || this._account.address !== address) {
                this._account = new account_1.StandardSolflareMetaMaskWalletAccount({
                    address,
                    publicKey: this.publicKey.toBytes()
                });
                this.emit('standard_change', { accounts: this.standardAccounts });
            }
        };
        this._standardDisconnected = () => {
            if (this._account) {
                this._account = null;
                this.emit('standard_change', { accounts: this.standardAccounts });
            }
        };
        if (config === null || config === void 0 ? void 0 : config.network) {
            this._network = config === null || config === void 0 ? void 0 : config.network;
        }
        if (window.SolflareMetaMaskParams) {
            this._iframeParams = Object.assign(Object.assign({}, this._iframeParams), window.SolflareMetaMaskParams);
        }
        if (config === null || config === void 0 ? void 0 : config.params) {
            this._iframeParams = Object.assign(Object.assign({}, this._iframeParams), config === null || config === void 0 ? void 0 : config.params);
        }
    }
    get publicKey() {
        return this._publicKey ? new web3_js_1.PublicKey(this._publicKey) : null;
    }
    get standardAccount() {
        return this._account;
    }
    get standardAccounts() {
        return this._account ? [this._account] : [];
    }
    get isConnected() {
        return this._isConnected;
    }
    get connected() {
        return this.isConnected;
    }
    get autoApprove() {
        return false;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.connected) {
                return;
            }
            this._injectElement();
            yield new Promise((resolve, reject) => {
                this._connectHandler = { resolve, reject };
            });
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._sendIframeMessage({
                method: 'disconnect'
            });
            this._disconnected();
        });
    }
    signTransaction(transaction) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.connected || !this.publicKey) {
                throw new Error('Wallet not connected');
            }
            try {
                const serializedMessage = (0, utils_1.serializeTransactionMessage)(transaction);
                const { signature } = yield this._sendIframeMessage({
                    method: 'signTransaction',
                    params: {
                        message: bs58_1.default.encode(serializedMessage)
                    }
                });
                (0, utils_1.addSignature)(transaction, this.publicKey, bs58_1.default.decode(signature));
                return transaction;
            }
            catch (e) {
                throw new Error(((_a = e === null || e === void 0 ? void 0 : e.toString) === null || _a === void 0 ? void 0 : _a.call(e)) || 'Failed to sign transaction');
            }
        });
    }
    signAllTransactions(transactions) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.connected || !this.publicKey) {
                throw new Error('Wallet not connected');
            }
            try {
                const serializedMessages = transactions.map((transaction) => (0, utils_1.serializeTransactionMessage)(transaction));
                const { signatures } = yield this._sendIframeMessage({
                    method: 'signAllTransactions',
                    params: {
                        messages: serializedMessages.map((message) => bs58_1.default.encode(message))
                    }
                });
                for (let i = 0; i < transactions.length; i++) {
                    (0, utils_1.addSignature)(transactions[i], this.publicKey, bs58_1.default.decode(signatures[i]));
                }
                return transactions;
            }
            catch (e) {
                throw new Error(((_a = e === null || e === void 0 ? void 0 : e.toString) === null || _a === void 0 ? void 0 : _a.call(e)) || 'Failed to sign transactions');
            }
        });
    }
    signAndSendTransaction(transaction, options) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.connected || !this.publicKey) {
                throw new Error('Wallet not connected');
            }
            try {
                const serializedTransaction = (0, utils_1.serializeTransaction)(transaction);
                const { signature } = yield this._sendIframeMessage({
                    method: 'signAndSendTransaction',
                    params: {
                        transaction: bs58_1.default.encode(serializedTransaction),
                        options
                    }
                });
                return signature;
            }
            catch (e) {
                throw new Error(((_a = e === null || e === void 0 ? void 0 : e.toString) === null || _a === void 0 ? void 0 : _a.call(e)) || 'Failed to sign and send transaction');
            }
        });
    }
    signMessage(data, display = 'utf8') {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.connected || !this.publicKey) {
                throw new Error('Wallet not connected');
            }
            try {
                const { signature } = yield this._sendIframeMessage({
                    method: 'signMessage',
                    params: {
                        data: bs58_1.default.encode(data),
                        display
                    }
                });
                return Uint8Array.from(bs58_1.default.decode(signature));
            }
            catch (e) {
                throw new Error(((_a = e === null || e === void 0 ? void 0 : e.toString) === null || _a === void 0 ? void 0 : _a.call(e)) || 'Failed to sign message');
            }
        });
    }
    sign(data, display = 'utf8') {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.signMessage(data, display);
        });
    }
    static isSupported() {
        return __awaiter(this, void 0, void 0, function* () {
            const provider = yield (0, detectProvider_1.detectProvider)();
            return !!provider;
        });
    }
    standardSignAndSendTransaction(...inputs) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.connected)
                throw new Error('not connected');
            const outputs = [];
            if (inputs.length === 1) {
                const { transaction, account, chain, options } = inputs[0];
                const { minContextSlot, preflightCommitment, skipPreflight, maxRetries } = options || {};
                if (account !== this._account)
                    throw new Error('invalid account');
                if (!(0, solana_1.isSolanaChain)(chain))
                    throw new Error('invalid chain');
                const signature = yield this.signAndSendTransaction(web3_js_1.VersionedTransaction.deserialize(transaction), {
                    preflightCommitment,
                    minContextSlot,
                    maxRetries,
                    skipPreflight
                });
                outputs.push({ signature: bs58_1.default.decode(signature) });
            }
            else if (inputs.length > 1) {
                for (const input of inputs) {
                    outputs.push(...(yield this.standardSignAndSendTransaction(input)));
                }
            }
            return outputs;
        });
    }
    standardSignTransaction(...inputs) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.connected)
                throw new Error('not connected');
            const outputs = [];
            if (inputs.length === 1) {
                const { transaction, account, chain } = inputs[0];
                if (account !== this._account)
                    throw new Error('invalid account');
                if (chain && !(0, solana_1.isSolanaChain)(chain))
                    throw new Error('invalid chain');
                const signedTransaction = yield this.signTransaction(web3_js_1.VersionedTransaction.deserialize(transaction));
                outputs.push({ signedTransaction: signedTransaction.serialize() });
            }
            else if (inputs.length > 1) {
                let chain;
                for (const input of inputs) {
                    if (input.account !== this._account)
                        throw new Error('invalid account');
                    if (input.chain) {
                        if (!(0, solana_1.isSolanaChain)(input.chain))
                            throw new Error('invalid chain');
                        if (chain) {
                            if (input.chain !== chain)
                                throw new Error('conflicting chain');
                        }
                        else {
                            chain = input.chain;
                        }
                    }
                }
                const transactions = inputs.map(({ transaction }) => web3_js_1.VersionedTransaction.deserialize(transaction));
                const signedTransactions = yield this.signAllTransactions(transactions);
                outputs.push(...signedTransactions.map((signedTransaction) => ({
                    signedTransaction: signedTransaction.serialize()
                })));
            }
            return outputs;
        });
    }
    standardSignMessage(...inputs) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.connected)
                throw new Error('not connected');
            const outputs = [];
            if (inputs.length === 1) {
                const { message, account } = inputs[0];
                if (account !== this._account)
                    throw new Error('invalid account');
                const signature = yield this.signMessage(message);
                outputs.push({ signedMessage: message, signature });
            }
            else if (inputs.length > 1) {
                for (const input of inputs) {
                    outputs.push(...(yield this.standardSignMessage(input)));
                }
            }
            return outputs;
        });
    }
}
SolflareMetaMask.IFRAME_URL = 'https://widget.solflare.com/';
exports["default"] = SolflareMetaMask;


/***/ }),

/***/ 2192:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


// This is copied with modification from @wallet-standard/wallet
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _StandardSolflareMetaMaskWalletAccount_address, _StandardSolflareMetaMaskWalletAccount_publicKey, _StandardSolflareMetaMaskWalletAccount_chains, _StandardSolflareMetaMaskWalletAccount_features, _StandardSolflareMetaMaskWalletAccount_label, _StandardSolflareMetaMaskWalletAccount_icon;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StandardSolflareMetaMaskWalletAccount = void 0;
const wallet_standard_features_1 = __webpack_require__(8663);
const solana_js_1 = __webpack_require__(6460);
const chains = solana_js_1.SOLANA_CHAINS;
const features = [wallet_standard_features_1.SolanaSignAndSendTransaction, wallet_standard_features_1.SolanaSignTransaction, wallet_standard_features_1.SolanaSignMessage];
class StandardSolflareMetaMaskWalletAccount {
    get address() {
        return __classPrivateFieldGet(this, _StandardSolflareMetaMaskWalletAccount_address, "f");
    }
    get publicKey() {
        return __classPrivateFieldGet(this, _StandardSolflareMetaMaskWalletAccount_publicKey, "f").slice();
    }
    get chains() {
        return __classPrivateFieldGet(this, _StandardSolflareMetaMaskWalletAccount_chains, "f").slice();
    }
    get features() {
        return __classPrivateFieldGet(this, _StandardSolflareMetaMaskWalletAccount_features, "f").slice();
    }
    get label() {
        return __classPrivateFieldGet(this, _StandardSolflareMetaMaskWalletAccount_label, "f");
    }
    get icon() {
        return __classPrivateFieldGet(this, _StandardSolflareMetaMaskWalletAccount_icon, "f");
    }
    constructor({ address, publicKey, label, icon }) {
        _StandardSolflareMetaMaskWalletAccount_address.set(this, void 0);
        _StandardSolflareMetaMaskWalletAccount_publicKey.set(this, void 0);
        _StandardSolflareMetaMaskWalletAccount_chains.set(this, void 0);
        _StandardSolflareMetaMaskWalletAccount_features.set(this, void 0);
        _StandardSolflareMetaMaskWalletAccount_label.set(this, void 0);
        _StandardSolflareMetaMaskWalletAccount_icon.set(this, void 0);
        if (new.target === StandardSolflareMetaMaskWalletAccount) {
            Object.freeze(this);
        }
        __classPrivateFieldSet(this, _StandardSolflareMetaMaskWalletAccount_address, address, "f");
        __classPrivateFieldSet(this, _StandardSolflareMetaMaskWalletAccount_publicKey, publicKey, "f");
        __classPrivateFieldSet(this, _StandardSolflareMetaMaskWalletAccount_chains, chains, "f");
        __classPrivateFieldSet(this, _StandardSolflareMetaMaskWalletAccount_features, features, "f");
        __classPrivateFieldSet(this, _StandardSolflareMetaMaskWalletAccount_label, label, "f");
        __classPrivateFieldSet(this, _StandardSolflareMetaMaskWalletAccount_icon, icon, "f");
    }
}
exports.StandardSolflareMetaMaskWalletAccount = StandardSolflareMetaMaskWalletAccount;
_StandardSolflareMetaMaskWalletAccount_address = new WeakMap(), _StandardSolflareMetaMaskWalletAccount_publicKey = new WeakMap(), _StandardSolflareMetaMaskWalletAccount_chains = new WeakMap(), _StandardSolflareMetaMaskWalletAccount_features = new WeakMap(), _StandardSolflareMetaMaskWalletAccount_label = new WeakMap(), _StandardSolflareMetaMaskWalletAccount_icon = new WeakMap();


/***/ }),

/***/ 6460:
/***/ ((__unused_webpack_module, exports) => {


// This is copied from @solana/wallet-standard-chains
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isSolanaChain = exports.SOLANA_CHAINS = exports.SOLANA_LOCALNET_CHAIN = exports.SOLANA_TESTNET_CHAIN = exports.SOLANA_DEVNET_CHAIN = exports.SOLANA_MAINNET_CHAIN = void 0;
/** Solana Mainnet (beta) cluster, e.g. https://api.mainnet-beta.solana.com */
exports.SOLANA_MAINNET_CHAIN = 'solana:mainnet';
/** Solana Devnet cluster, e.g. https://api.devnet.solana.com */
exports.SOLANA_DEVNET_CHAIN = 'solana:devnet';
/** Solana Testnet cluster, e.g. https://api.testnet.solana.com */
exports.SOLANA_TESTNET_CHAIN = 'solana:testnet';
/** Solana Localnet cluster, e.g. http://localhost:8899 */
exports.SOLANA_LOCALNET_CHAIN = 'solana:localnet';
/** Array of all Solana clusters */
exports.SOLANA_CHAINS = [
    exports.SOLANA_MAINNET_CHAIN,
    exports.SOLANA_DEVNET_CHAIN,
    exports.SOLANA_TESTNET_CHAIN,
    exports.SOLANA_LOCALNET_CHAIN
];
/**
 * Check if a chain corresponds with one of the Solana clusters.
 */
function isSolanaChain(chain) {
    return exports.SOLANA_CHAINS.includes(chain);
}
exports.isSolanaChain = isSolanaChain;


/***/ }),

/***/ 11:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ 9576:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.addSignature = exports.serializeTransactionMessage = exports.serializeTransaction = exports.isLegacyTransactionInstance = void 0;
function isLegacyTransactionInstance(transaction) {
    return transaction.version === undefined;
}
exports.isLegacyTransactionInstance = isLegacyTransactionInstance;
function serializeTransaction(transaction) {
    return isLegacyTransactionInstance(transaction)
        ? transaction.serialize({
            verifySignatures: false,
            requireAllSignatures: false
        })
        : transaction.serialize();
}
exports.serializeTransaction = serializeTransaction;
function serializeTransactionMessage(transaction) {
    return isLegacyTransactionInstance(transaction)
        ? transaction.serializeMessage()
        : transaction.message.serialize();
}
exports.serializeTransactionMessage = serializeTransactionMessage;
function addSignature(transaction, publicKey, signature) {
    if (isLegacyTransactionInstance(transaction)) {
        transaction.addSignature(publicKey, Buffer.from(signature));
    }
    else {
        const signerPubkeys = transaction.message.staticAccountKeys.slice(0, transaction.message.header.numRequiredSignatures);
        const signerIndex = signerPubkeys.findIndex((pubkey) => pubkey.equals(publicKey));
        if (signerIndex >= 0) {
            transaction.signatures[signerIndex] = signature;
        }
    }
}
exports.addSignature = addSignature;


/***/ }),

/***/ 9974:
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

/***/ 9134:
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
;// CONCATENATED MODULE: ../node_modules/@solflare-wallet/metamask-sdk/node_modules/uuid/dist/esm-node/rng.js

const rnds8Pool = new Uint8Array(256); // # of random values to pre-allocate

let poolPtr = rnds8Pool.length;
function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    external_crypto_default().randomFillSync(rnds8Pool);
    poolPtr = 0;
  }

  return rnds8Pool.slice(poolPtr, poolPtr += 16);
}
;// CONCATENATED MODULE: ../node_modules/@solflare-wallet/metamask-sdk/node_modules/uuid/dist/esm-node/regex.js
/* harmony default export */ const regex = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);
;// CONCATENATED MODULE: ../node_modules/@solflare-wallet/metamask-sdk/node_modules/uuid/dist/esm-node/validate.js


function validate(uuid) {
  return typeof uuid === 'string' && regex.test(uuid);
}

/* harmony default export */ const esm_node_validate = (validate);
;// CONCATENATED MODULE: ../node_modules/@solflare-wallet/metamask-sdk/node_modules/uuid/dist/esm-node/stringify.js

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
;// CONCATENATED MODULE: ../node_modules/@solflare-wallet/metamask-sdk/node_modules/uuid/dist/esm-node/v1.js

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
;// CONCATENATED MODULE: ../node_modules/@solflare-wallet/metamask-sdk/node_modules/uuid/dist/esm-node/parse.js


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
;// CONCATENATED MODULE: ../node_modules/@solflare-wallet/metamask-sdk/node_modules/uuid/dist/esm-node/v35.js



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
;// CONCATENATED MODULE: ../node_modules/@solflare-wallet/metamask-sdk/node_modules/uuid/dist/esm-node/md5.js


function md5(bytes) {
  if (Array.isArray(bytes)) {
    bytes = Buffer.from(bytes);
  } else if (typeof bytes === 'string') {
    bytes = Buffer.from(bytes, 'utf8');
  }

  return external_crypto_default().createHash('md5').update(bytes).digest();
}

/* harmony default export */ const esm_node_md5 = (md5);
;// CONCATENATED MODULE: ../node_modules/@solflare-wallet/metamask-sdk/node_modules/uuid/dist/esm-node/v3.js


const v3 = v35('v3', 0x30, esm_node_md5);
/* harmony default export */ const esm_node_v3 = (v3);
;// CONCATENATED MODULE: ../node_modules/@solflare-wallet/metamask-sdk/node_modules/uuid/dist/esm-node/native.js

/* harmony default export */ const esm_node_native = ({
  randomUUID: (external_crypto_default()).randomUUID
});
;// CONCATENATED MODULE: ../node_modules/@solflare-wallet/metamask-sdk/node_modules/uuid/dist/esm-node/v4.js




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
;// CONCATENATED MODULE: ../node_modules/@solflare-wallet/metamask-sdk/node_modules/uuid/dist/esm-node/sha1.js


function sha1(bytes) {
  if (Array.isArray(bytes)) {
    bytes = Buffer.from(bytes);
  } else if (typeof bytes === 'string') {
    bytes = Buffer.from(bytes, 'utf8');
  }

  return external_crypto_default().createHash('sha1').update(bytes).digest();
}

/* harmony default export */ const esm_node_sha1 = (sha1);
;// CONCATENATED MODULE: ../node_modules/@solflare-wallet/metamask-sdk/node_modules/uuid/dist/esm-node/v5.js


const v5 = v35('v5', 0x50, esm_node_sha1);
/* harmony default export */ const esm_node_v5 = (v5);
;// CONCATENATED MODULE: ../node_modules/@solflare-wallet/metamask-sdk/node_modules/uuid/dist/esm-node/nil.js
/* harmony default export */ const nil = ('00000000-0000-0000-0000-000000000000');
;// CONCATENATED MODULE: ../node_modules/@solflare-wallet/metamask-sdk/node_modules/uuid/dist/esm-node/version.js


function version(uuid) {
  if (!esm_node_validate(uuid)) {
    throw TypeError('Invalid UUID');
  }

  return parseInt(uuid.slice(14, 15), 16);
}

/* harmony default export */ const esm_node_version = (version);
;// CONCATENATED MODULE: ../node_modules/@solflare-wallet/metamask-sdk/node_modules/uuid/dist/esm-node/index.js










/***/ }),

/***/ 8663:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(8730), exports);
__exportStar(__webpack_require__(171), exports);
__exportStar(__webpack_require__(5746), exports);
__exportStar(__webpack_require__(6957), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 8730:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SolanaSignAndSendTransaction = void 0;
/** Name of the feature. */
exports.SolanaSignAndSendTransaction = 'solana:signAndSendTransaction';
//# sourceMappingURL=signAndSendTransaction.js.map

/***/ }),

/***/ 171:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SolanaSignIn = void 0;
/** Name of the feature. */
exports.SolanaSignIn = 'solana:signIn';
//# sourceMappingURL=signIn.js.map

/***/ }),

/***/ 5746:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SolanaSignMessage = void 0;
/** Name of the feature. */
exports.SolanaSignMessage = 'solana:signMessage';
//# sourceMappingURL=signMessage.js.map

/***/ }),

/***/ 6957:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SolanaSignTransaction = void 0;
/** Name of the feature. */
exports.SolanaSignTransaction = 'solana:signTransaction';
//# sourceMappingURL=signTransaction.js.map

/***/ })

};
;
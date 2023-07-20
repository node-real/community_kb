"use strict";
exports.__esModule = true;
var wagmi_1 = require("wagmi");
var react_1 = require("react");
var public_1 = require("wagmi/providers/public");
var metaMask_1 = require("wagmi/connectors/metaMask");
// import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
var injected_1 = require("wagmi/connectors/injected");
// import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
var uikit_1 = require("@totejs/uikit");
var chains_1 = require("wagmi/chains");
var Index_1 = require("./components/layout/Index");
var Home_1 = require("./pages/Home");
var Profile_1 = require("./pages/Profile");
var Resource_1 = require("./pages/Resource");
var Folder_1 = require("./pages/Folder");
var theme_1 = require("./theme");
var react_router_dom_1 = require("react-router-dom");
var modal_1 = require("./context/modal");
var global_1 = require("./context/global");
var walletModal_1 = require("./context/walletModal");
require("./base/global.css");
var env = require("./env");
var index_1 = require("./router/index");
var routes = [{
        path: '/',
        element: react_1["default"].createElement(Home_1["default"], null)
    },
    {
        path: '/profile',
        element: react_1["default"].createElement(Profile_1["default"], null)
    },
    {
        path: '/resource',
        element: react_1["default"].createElement(Resource_1["default"], null)
    },
    {
        path: '/folder',
        element: react_1["default"].createElement(Folder_1["default"], null)
    },
];
// var gfChain = {
//     id: env.GF_CHAIN_ID,
//     network: 'greenfield',
//     rpcUrls: {
//         "default": {
//             http: [env.GF_RPC_URL]
//         },
//         public: {
//             http: [env.GF_RPC_URL]
//         }
//     },
//     name: 'Greenfield Testnet',
//     nativeCurrency: {
//         name: 'tBNB',
//         symbol: 'tBNB',
//         decimals: 18
//     }
// };
const opBNBChain: Chain = {
    id: env.OPBNB_CHAIN_ID,
    network: 'opBnb',
    rpcUrls: {
        default: {
            http: [env.OPBNB_RPC_URL],
        },
        public: {
            http: [env.OPBNB_RPC_URL],
        },
    },
    name: 'OpBnb Testnet',
    nativeCurrency: {
        name: 'tBNB',
        symbol: 'tBNB',
        decimals: 18,
    },
};
var _a = wagmi_1.configureChains([chains_1.bscTestnet, opBNBChain], [public_1.publicProvider()]),
    chains = _a.chains,
    provider = _a.provider;

function App() {
    var handleClick = function () {
        console.log('Button clicked!');
    };
    var client = wagmi_1.createClient({
        autoConnect: true,
        connectors: [
            new metaMask_1.MetaMaskConnector({
                chains: chains
            }),
            new injected_1.InjectedConnector({
                chains: chains,
                options: {
                    name: 'Trust Wallet',
                    shimDisconnect: true,
                    getProvider: function () {
                        try {
                            if (typeof window !== 'undefined' &&
                                typeof (window === null || window === void 0 ? void 0 : window.trustWallet) !== 'undefined') {
                                // window.ethereum = window?.trustWallet;
                                // eslint-disable-next-line
                                Object.defineProperty(window.trustWallet, 'removeListener', {
                                    value: window.trustWallet.off
                                });
                                return window === null || window === void 0 ? void 0 : window.trustWallet;
                            } else {
                                return null;
                            }
                        } catch (e) {
                            // eslint-disable-next-line no-console
                            console.log(e);
                        }
                    }
                }
            }),
        ],
        provider: provider,
        logger: {
            warn: function (message) {
                return console.log(message);
            }
        }
    });
    return (react_1["default"].createElement(wagmi_1.WagmiConfig, {
            client: client
        },
        react_1["default"].createElement(uikit_1.ThemeProvider, {
                theme: theme_1.theme
            },
            react_1["default"].createElement(global_1.GlobalProvider, null,
                react_1["default"].createElement(modal_1.ModalProvider, null,
                    react_1["default"].createElement(walletModal_1.WalletModalProvider, null,
                        react_1["default"].createElement(react_router_dom_1.HashRouter, null,
                            react_1["default"].createElement(Index_1["default"], null,
                                react_1["default"].createElement("button", {
                                    onClick: handleClick
                                }, "Click me!"),
                                react_1["default"].createElement(react_router_dom_1.Routes, null, routes.map(function (item) {
                                    return (react_1["default"].createElement(react_router_dom_1.Route, {
                                        key: item.path,
                                        path: item.path,
                                        element: react_1["default"].createElement(index_1["default"], null, item.element)
                                    }));
                                }))))))))));
}
exports["default"] = App;
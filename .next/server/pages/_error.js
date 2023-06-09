"use strict";
(() => {
var exports = {};
exports.id = 820;
exports.ids = [820];
exports.modules = {

/***/ 6543:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* reexport */ Custom404)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
;// CONCATENATED MODULE: external "next/error"
const error_namespaceObject = require("next/error");
var error_default = /*#__PURE__*/__webpack_require__.n(error_namespaceObject);
;// CONCATENATED MODULE: ./pages/_error.js


function Custom404({ statusCode  }) {
    return /*#__PURE__*/ jsx_runtime.jsx((error_default()), {
        statusCode: statusCode
    });
}
Custom404.getInitialProps = ({ res , err  })=>{
    const statusCode = res?.statusCode || err?.statusCode;
    return {
        statusCode
    };
}; // Custom400.getInitialProps = ({ res, err }) => {
 //     const statusCode = res?.statusCode || err?.statusCode || 400;
 //     return { statusCode };
 // }

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-route-loader.js?page=%2F_error&absolutePagePath=private-next-pages%2F_error.js&preferredRegion=!

        // Next.js Route Loader
        
        
    

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [893], () => (__webpack_exec__(6543)));
module.exports = __webpack_exports__;

})();
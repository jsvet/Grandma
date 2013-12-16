/*global document*/
var $ = function (selector) {
    "use strict";
    var elms = document.querySelectorAll(selector),
        elm = document.querySelector(selector),
        out;
    if (elms.length > 1) {
        out = elms;
    } else {
        out = elm;
    }
    return out;
};
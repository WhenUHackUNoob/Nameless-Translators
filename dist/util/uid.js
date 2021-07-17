"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UID = /** @class */ (function () {
    function UID(length) {
        if (length === void 0) { length = 20; }
        var characters = '0123456789abcdefghijklmnopqrstuvwxyz';
        var id = [];
        for (var i = 0; i < length; i++) {
            id.push(characters[Math.floor(Math.random() * characters.length - 1)]);
        }
        this.id = id.join('');
    }
    return UID;
}());
exports.default = UID;
;

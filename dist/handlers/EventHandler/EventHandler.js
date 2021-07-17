"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var fs_1 = require("fs");
var __1 = require("../..");
var EventHandler = /** @class */ (function () {
    function EventHandler(dir) {
        fs_1.readdir(dir, function (err, files) {
            if (err)
                console.error(err);
            files.forEach(function (file) {
                if (file.startsWith('@'))
                    return;
                var eventFile = require(path_1.default.join(dir, file));
                var eventData = eventFile.default ? eventFile.default : eventFile;
                var eventName = eventData.name;
                var eventOnce = eventData.once;
                __1.client[eventOnce ? 'once' : 'on'](eventName, function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    return eventData.run.apply(eventData, args);
                });
            });
        });
    }
    return EventHandler;
}());
exports.default = EventHandler;

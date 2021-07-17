"use strict";
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
        while (_) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../index");
var uid_1 = __importDefault(require("../../util/uid"));
var events_1 = require("events");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var BaseCommand_1 = __importDefault(require("./BaseCommand"));
var Prefixes_1 = __importDefault(require("../../constants/Prefixes"));
var __1 = require("../..");
var LanguageManager_1 = __importDefault(require("../LanguageManager/LanguageManager"));
var CommandHandler = /** @class */ (function (_super) {
    __extends(CommandHandler, _super);
    function CommandHandler(config) {
        if (config === void 0) { config = { ignoreToken: '@' }; }
        var _this = _super.call(this) || this;
        //	settings
        _this.setup = false;
        //	Command data
        _this.aliases = new Map();
        _this.commands = new Map();
        _this.commandData = new Map();
        _this.config = {
            ignoreToken: config.ignoreToken
        };
        _this.start();
        return _this;
    }
    CommandHandler.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_b) {
                if (this.setup)
                    return [2 /*return*/];
                //	This listens for the commands
                index_1.client.on('message', function (msg) { return __awaiter(_this, void 0, void 0, function () {
                    var prefix, args, cmd, command, commandData, member, e_1, e_2;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 7, , 8]);
                                // Do not respond to bots or dm messages
                                if (!msg.guild)
                                    return [2 /*return*/];
                                if (msg.author.bot)
                                    return [2 /*return*/];
                                prefix = __1.config.prefix;
                                if (!prefix)
                                    return [2 /*return*/, console.log(Prefixes_1.default.BOT + "no prefix provided. Please configure this in the config.json")];
                                //	Checking if the command starts witht he bot prefix
                                if (!msg.content.toLowerCase().startsWith(prefix.trim().toLowerCase()) && !msg.content.startsWith("<@" + index_1.client.user.id + ">"))
                                    return [2 /*return*/];
                                args = msg.content.substring(prefix.length).split(/ +/);
                                cmd = args.shift().toLowerCase();
                                //	Emit event
                                if (!cmd)
                                    return [2 /*return*/, this.emit('invalidCommand', cmd, args, msg)];
                                command = this.commands.get(cmd);
                                if (command == null) {
                                    //	If not set, check aliases
                                    command = this.aliases.get(cmd);
                                    //	Emit event of command non exist
                                    if (command == null)
                                        return [2 /*return*/, this.emit('invalidCommand', cmd, args, msg)];
                                }
                                commandData = this.commandData.get(command);
                                if (commandData.ownerOnly) {
                                    if (!__1.config.owners.includes(msg.author.id)) {
                                        return [2 /*return*/, msg.reply(commandData.permissionMessage)];
                                    }
                                }
                                if (!__1.config.modules[commandData.category.toLowerCase()]) {
                                    return [2 /*return*/];
                                }
                                if (!(commandData.permissions != null && !__1.config.owners.includes(msg.author.id))) return [3 /*break*/, 2];
                                return [4 /*yield*/, msg.guild.members.fetch(msg.author.id)];
                            case 1:
                                member = (_b.sent());
                                if (!member.permissions.has(commandData.permissions)) {
                                    return [2 /*return*/, msg.reply(commandData.permissionMessage)];
                                }
                                _b.label = 2;
                            case 2:
                                _b.trys.push([2, 5, , 6]);
                                // Run language manager to make sure base language for the user exists
                                return [4 /*yield*/, LanguageManager_1.default.getString(msg.author.id, "general.usage")];
                            case 3:
                                // Run language manager to make sure base language for the user exists
                                _b.sent();
                                return [4 /*yield*/, commandData.run(cmd, args, msg)];
                            case 4:
                                _b.sent();
                                return [3 /*break*/, 6];
                            case 5:
                                e_1 = _b.sent();
                                msg.reply('Somemething went wrong! ' + e_1.message);
                                console.error(e_1);
                                return [3 /*break*/, 6];
                            case 6: return [3 /*break*/, 8];
                            case 7:
                                e_2 = _b.sent();
                                console.error(e_2);
                                return [3 /*break*/, 8];
                            case 8: return [2 /*return*/];
                        }
                    });
                }); });
                this.setup = true;
                return [2 /*return*/];
            });
        });
    };
    /**
     * Add a command to the command handler
     * @param cmd command class to add
     */
    CommandHandler.prototype.loadCommand = function (cmd) {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            var _this = this;
            return __generator(this, function (_b) {
                id = new uid_1.default();
                //	Setup the command
                cmd.preSetup(id);
                //	adding command to the database
                this.commandData.set(id, cmd);
                //	adding a new command
                if (this.commands.get(cmd.command.toLowerCase()) != null)
                    throw new TypeError('Error: command ' + cmd.command + ' is already defined.');
                this.commands.set(cmd.command.toLowerCase(), id);
                //	adding the aliases
                cmd.aliases.forEach(function (a) {
                    _this.aliases.set(a.toLowerCase(), id);
                });
                return [2 /*return*/];
            });
        });
    };
    /**
     * Load an directory to the CommandHandler
     * @param dir absoulte path of this directory
     */
    CommandHandler.prototype.loadDir = function (dir) {
        return __awaiter(this, void 0, void 0, function () {
            var files;
            var _this = this;
            return __generator(this, function (_b) {
                files = fs_1.default.readdirSync(dir);
                files.forEach(function (file) { return __awaiter(_this, void 0, void 0, function () {
                    var fdir, stats, _a, temp;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                fdir = path_1.default.join(dir, file);
                                stats = fs_1.default.lstatSync(fdir);
                                //	Checking if file/folder should be read
                                if (file.startsWith(this.config.ignoreToken)) {
                                    return [2 /*return*/];
                                }
                                if (!stats.isDirectory()) return [3 /*break*/, 2];
                                return [4 /*yield*/, this.loadDir(fdir)];
                            case 1: return [2 /*return*/, _b.sent()];
                            case 2:
                                try {
                                    _a = require(fdir);
                                    temp = new ((_a.default ? _a.default : _a));
                                    //	Checking if its the right class
                                    if (!(temp instanceof BaseCommand_1.default))
                                        return [2 /*return*/];
                                    //	Adding to command handler
                                    this.loadCommand(temp);
                                }
                                catch (ignored) {
                                    console.log(ignored);
                                }
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    return CommandHandler;
}(events_1.EventEmitter));
exports.default = CommandHandler;

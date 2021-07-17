"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (remainingTime) {
    var roundTowardsZero = remainingTime > 0 ? Math.floor : Math.ceil;
    var days = roundTowardsZero(remainingTime / 86400000);
    var hours = roundTowardsZero(remainingTime / 3600000) % 24;
    var minutes = roundTowardsZero(remainingTime / 60000) % 60;
    var seconds = roundTowardsZero(remainingTime / 1000) % 60;
    var isDay = days > 0;
    var isHour = hours > 0;
    var isMinute = minutes > 0;
    var isSecond = seconds > 0;
    var dayUnit = days < 2 ? "day" : "days";
    var hourUnit = hours < 2 ? "hour" : "hours";
    var minuteUnit = minutes < 1 ? "minute" : "minutes";
    var secondUnit = seconds < 1 ? "second" : "seconds";
    var pattern = (!isDay ? '' : "{days} " + dayUnit + (isHour ? ', ' : '')) + (!isHour ? '' : "{hours} " + hourUnit + (isMinute ? ", " : '')) + (!isMinute ? '' : "{minutes} " + minuteUnit + (isSecond ? ', ' : '')) + (!isSecond ? '' : "{seconds} " + secondUnit);
    var content = "{duration}"
        .replace('{duration}', pattern)
        .replace('{days}', days.toString())
        .replace('{hours}', hours.toString())
        .replace('{minutes}', minutes.toString())
        .replace('{seconds}', seconds.toString());
    return content;
});

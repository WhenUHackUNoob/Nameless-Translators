export default (remainingTime: number) => {
	const roundTowardsZero = remainingTime > 0 ? Math.floor : Math.ceil;

	const days = roundTowardsZero(remainingTime / 86400000);
	const hours = roundTowardsZero(remainingTime / 3600000) % 24;
	const minutes = roundTowardsZero(remainingTime / 60000) % 60;

	const seconds = roundTowardsZero(remainingTime / 1000) % 60;

	const isDay = days > 0;
	const isHour = hours > 0;
	const isMinute = minutes > 0;
	const isSecond = seconds > 0;

	const dayUnit = days < 2 ? "day" : "days";
	const hourUnit = hours < 2 ? "hour" : "hours";
	const minuteUnit = minutes < 1 ? "minute" : "minutes";
	const secondUnit = seconds < 1 ? "second" : "seconds";

	const pattern = (!isDay ? '' : `{days} ${dayUnit}${isHour ? ', ' : ''}`) + (!isHour ? '' : `{hours} ${hourUnit}${isMinute ? ", " : ''}`) + (!isMinute ? '' : `{minutes} ${minuteUnit}${isSecond ? ', ' : ''}`) + ( !isSecond ? '' : `{seconds} ${secondUnit}`);
	const content = "{duration}"
		.replace('{duration}', pattern)
		.replace('{days}', days.toString())
		.replace('{hours}', hours.toString())
		.replace('{minutes}', minutes.toString())
		.replace('{seconds}', seconds.toString());

	return content;
}
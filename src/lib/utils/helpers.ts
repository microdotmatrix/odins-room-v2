export const createUrl = (pathname: string, params: string) => {
	const paramsString = params.toString();
	const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

	return `${pathname}${queryString}`;
};

/**
 * Function to parse a date object into a string and format it
 * into something easier to read by humans.
 * @param {string | number | Date} input
 */
export function formatDate(input: string | number | Date) {
	const date = new Date(input);
	return date.toLocaleString('en-US', {
		dateStyle: 'short',
		timeStyle: 'short',
		timeZone: 'America/Chicago'
	});
}

// Artificially delay a function call to simulate a slow network connection.
export async function sleep(ms = 500) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Function to keep integer values passed into it within a certain range.
 * @param {number} value
 */
export function clampRange(value: number, min = 0, max = 1) {
	return value < min ? min : value > max ? max : value;
}

/**
 * Function to parse a string value and trim/replace unwanted characters into a slug.
 * @param {any} str
 */
export function toSlug(str: string) {
	let s = str;
	if (!s) {
		return '';
	}
	s = s.toLowerCase().trim();
	s = s.replace(/ & /g, ' and ');
	s = s.replace(/[ ]+/g, '-');
	s = s.replace(/[-]+/g, '-');
	s = s.replace(/[^a-z0-9-]+/g, '');
	return s;
}

/**
 * Functions for generating random integer and boolean values.
 * @param {*} min
 * @param {*} max
 * @returns
 */
export const getRandomFloat = (min: number, max: number) => Math.random() * (max - min) + min;
/**
 * Function for returning a random integer between preset min & max values.
 * @param {*} min
 * @param {*} max
 * @returns
 */
export const getRandomInt = (min: number, max: number) =>
	Math.floor(Math.random() * (max - min + 1) + min);
export const getRandomBool = () => Math.random() >= 0.5;

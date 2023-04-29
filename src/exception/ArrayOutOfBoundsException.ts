export default class ArrayOutOfBoundsException extends Error {
	constructor(index: number, size: number) {
		super(
			`Error: array index out of bounds.\nSize of array: ${size}; element requested at index: ${index}`
		);
	}
}

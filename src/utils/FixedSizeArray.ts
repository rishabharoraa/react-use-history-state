import _ from "lodash";
import ArrayOutOfBoundsException from "../exception/ArrayOutOfBoundsException";

export interface IFixedSizedArray<T> {
	/**
	 * Inserts an element at the given index.
	 * @param index index at which the element is to be inserted
	 * @param element element to be inserted
	 * @throws `ArrayOutOfBoundsException` if index is out of bounds
	 */
	insert(_index: number, _element: T): void;

	/**
	 * Returns the size of the array.
	 */
	size(): number;

	/**
	 * Gets the item at given index, throws an error if index is out of bounds.
	 * @param _index index at which to look at
	 * @throws `ArrayOutOfBoundsException` if index is out of bounds
	 */
	at(_index: number): T;
}

export default class FixedSizeArray<T> implements IFixedSizedArray<T> {
	private len: number;
	private array: Array<T>;

	constructor(size: number) {
		this.len = size;
	}

	private checkIndex(index: number): void {
		if (index < 0 || index >= this.len) {
			throw new ArrayOutOfBoundsException(index, this.len);
		}
	}

	size(): number {
		return this.len;
	}

	at(index: number): T | undefined {
		this.checkIndex(index);
		return this.array[index];
	}

	insert(index: number, element: T): void {
		this.checkIndex(index);
		this.array[index] = _.cloneDeep(element);
	}
}

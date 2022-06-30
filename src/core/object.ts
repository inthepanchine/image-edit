// libraries
import { fabric } from "fabric";

/** General representation of an object displayed in canvas. */
export class CanvasObject {
	protected object: fabric.Object;

	/**
	 * Constructor of `CanvasObject` class.
	 *
	 * @param object The fabric object represented by the class.
	 */
	constructor(object: fabric.Object) {
		this.object = object;
	}

	/**
	 * Get the fabric object represented by the class.
	 *
	 * @returns The fabric objecet represented by the class.
	 */
	getObject = (): fabric.Object => this.object;
}

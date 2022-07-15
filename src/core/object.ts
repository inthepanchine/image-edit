// libraries
import { fabric } from "fabric";
import { Position, Size } from "../interfaces/quantity";
import _ from "lodash";

/** General representation of an object displayed in canvas. */
export class CanvasObject {
	/** The fabric.Object binded to object. */
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
	 * @returns The fabric object represented by the class.
	 */
	getObject = (): fabric.Object => this.object;

	/**
	 * Get the size of the fabric object represented by the class.
	 *
	 * @returns The size of the fabric object represented by the class.
	 */
	getSize = (): Size => ({
		width: this.object.getScaledWidth(),
		height: this.object.getScaledHeight(),
	});

	/**
	 * Get the position of the fabric object represented by the class.
	 *
	 * @returns The position of the fabric object represented by the class.
	 */
	getPosition = (): Position => {
		// check if `this.object.oCoords` isn't undefined
		if (this.object.oCoords === undefined) {
			throw new Error("this.object.oCoords is undefined.");
		}

		return {
			x: this.object.oCoords.bl.x,
			y: this.object.oCoords.bl.y,
		};
	};

	/**
	 * Checks if a `CanvasObject`'s `fabric.Object` corrispond to `obj`.
	 *
	 * @param obj The object to compare with.
	 * @returns True if it corrispond, else false.
	 */
	checkObject = (obj: fabric.Object): boolean =>
		_.isEqual(obj.toObject(), this.object.toObject());
}

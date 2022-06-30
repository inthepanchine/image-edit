// classes
import { CanvasObject } from "./object";

// libraries
import { fabric } from "fabric";
import { Position, Size } from "../interfaces/quantity";

/** Representation of an image displayed in canvas. */
export class CanvasImage extends CanvasObject {
	/**
	 * Constructor of `CanvasImage` class.
	 *
	 * @param src The source of the image.
	 * @param size The sizes of the image.
	 * @param position The initial position of the image.
	 */
	constructor(
		src: string | HTMLImageElement,
		size: Size,
		position: Position,
	) {
		// create new image, resize it and super call to parent class
		const img = new fabric.Image(src, { left: position.x, top: position.y});
		img.scaleToWidth(size.width);
		img.scaleToHeight(size.height);
		
		super(img);
	}
}

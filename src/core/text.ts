// classes
import { CanvasObject } from "./object";

// libraries
import { fabric } from "fabric";
import { TextStyle } from "../interfaces/text";

/** Representation of text displayed in the canvas. */
export class CanvasText extends CanvasObject {
	/** Constructor of `CanvasText` class. */
	constructor(style: TextStyle, text = "Insert text") {
		// init and super a text
		const itext = new fabric.IText(text, style);
		super(itext);
	}

	/**
	 * Change text's style.
	 *
	 * @param style The style to apply.
	 */
	setStyle = (style: TextStyle) => this.object.set(style);
}

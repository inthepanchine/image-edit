// classes
import { Position, Size } from "../interfaces/quantity";
import { CanvasObject } from "./object";

// libraries
import { fabric } from "fabric";

// interfaces
import { ShapeStyle } from "../interfaces/shape";

/** Representation of a shape displayed in canvas. */
export class CanvasShape extends CanvasObject {
	/**
	 * Constructor of `CanvasShape` class.
	 *
	 * @param shape The shape to render. The shapes accepted values are `rect`
	 * or `circle`.
	 * @param size The sizes of the shape. Note that if `shape` is `circle`,
	 * as radius will be used `size.width / 2`
	 * @param position The initial position of the shape.
	 * @param style The style of the shape.
	 */
	constructor(
		shape: string,
		size: Size,
		position: Position,
		style: ShapeStyle = {
			stroke: "rgba(0, 0, 0, 1)",
			strokeWidth: 1,
			fill: "rgba(0, 0, 0, 0)",
		}) {
		let object;

		switch(shape) {
		case "rect":
			object = new fabric.Rect({
				...style,
				...size,
				left: position.x,
				top: position.y,
			});
			break;
		case "circle":
			object = new fabric.Circle({
				...style,
				radius: size.width / 2,
				left: position.x,
				top: position.y,
			});
			break;
		default:
			throw new Error(`${shape} is not an available shape.`);
		}

		super(object);
	}

	/** 
	 * Change shape's style.
	 *
	 * @param style The style to apply.
	 */
	setStyle = (style: ShapeStyle) => this.object.set(style);
}

// interfaces
import { Position } from "../interfaces/quantity";
import { SelectedRegion } from "../interfaces/region";

// classes
import { CanvasObject } from "../core/object";

// libraries
import { fabric } from "fabric";

/** Handles selection of region in the canvas. */
export class CanvasRegion extends CanvasObject {
	/** The objects loaded on the canvas. */
	private objLoaded: CanvasObject[];

	/** 
	 * Constructor of `CanvasRegion`.
	 *
	 * @param pos The initial render position of the object.
	 * @param obj The objects loaded on the canvas.
	 */
	constructor(pos: Position, obj: CanvasObject[]) {
		// init 100x100 semi-transparent rect for selection
		const rect = new fabric.Rect({
			width: 100,
			height: 100,
			fill: "rgba(0, 0, 0, 0.5)",
			left: pos.x,
			top: pos.y,
		});

		super(rect);

		// assign obj
		this.objLoaded = obj;
	}

	/**
	 * Return a selection of a region of the canvas.
	 *
	 * @returns A selection of a region of the canvas.
	 */
	getSelection = (): SelectedRegion => {
		// loop through all the loaded objects, check for intersection, else
		// throw error
		for (const obj of this.objLoaded) {
			if (this.object.intersectsWithObject(obj.getObject())) {
				return {
					relativeTo: obj,
					size: obj.getSize(),
					position: obj.getPosition(),
				};
			}
		}

		throw new Error("Can't select empty space.");
	};
}

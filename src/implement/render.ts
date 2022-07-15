// interfaces
import { Position, Size } from "../interfaces/quantity";
import { TextStyle } from "../interfaces/text";
import { ShapeStyle } from "../interfaces/shape";

// classes
import { Canvas } from "../core/canvas";
import { CanvasImage } from "../core/image";
import { CanvasObject } from "../core/object";
import { CanvasText } from "../core/text";
import { CanvasShape } from "../core/shape";
import { CanvasRegion } from "./region";

/** Handles the interaction between canvas and the objects. */
export class Render {
	/** The editor where the files will be rendered. */
	private canvas: Canvas;

	/** The element where the files will be loaded in. */
	private input: HTMLInputElement;

	/**
	 * All the elements loaded inside the canvas.
	 *
	 * @default A empty array.
	 */
	private objLoaded: CanvasObject[] = [];

	/** 
	 * The representation of the selection on the canvas.
	 * If it's `undefined` means there is no selection on the canvas.
	 */
	private selection: CanvasRegion | undefined;

	/** 
	 * Constructor of `FileHandler` class.
	 *
	 * @param canvas The editor where the files will be rendered.
	 * @param input The element where the files will be loaded in.
	 */
	constructor(canvas: Canvas, input: HTMLInputElement) {
		// assign properties
		this.canvas = canvas;
		this.input = input;

		// listen on `this.input` for uploaded files
		this.input.addEventListener("change", (event) => {
			// check if target is undefined
			if (event.target === undefined) {
				throw new Error("event.target is undefined.");
			}
			const target = event.target as HTMLInputElement;

			// check if there are files to load
			if (target.files === null) {
				throw new Error("There are no files to load.");
			}
			
			this.loadImage(target.files);
		});
	}

	/** 
	 * Add a text object to the canvas.
	 *
	 * @param style The style of the text.
	 */
	addText = (style: TextStyle) => {
		const text = new CanvasText(style);
		this.canvas.renderObject(text.getObject());
		this.objLoaded.push(text);
	};

	/** 
	 * Add a shape object to the canvas.
	 *
	 * @param shape The shape to render. The shapes accepted values are `rect`
	 * or `circle`.
	 * @param style The style of the text.
	 */
	addShape = (shape: string, style: ShapeStyle) => {
		const shapeObj = new CanvasShape(
			shape,
			{ width: 100, height: 100 },
			this.canvas.getCenter(),
			style
		);
		this.canvas.renderObject(shapeObj.getObject());
		this.objLoaded.push(shapeObj);
	};

	/** Create a selection region.   */
	addSelection = () => {
		if (this.selection !== undefined) {
			throw new Error("Can't create multiple selections.");
		}

		this.selection = new CanvasRegion(
			this.canvas.getCenter(), this.objLoaded
		);
		this.canvas.renderObject(this.selection.getObject());

		this.canvas.addEvent("selection:updated", this.selectionEvent);
		this.canvas.addEvent("selection:cleared", this.selectionEvent);
	};

	/**
	 * Remove `elements` from canvas. If `elements` is undefined remove the
	 * selected objects.
	 * 
	 * @param elements The elements to be removed.
	 */
	removeObject = (elements?: CanvasObject[]) => {
		// if elements is undefined get the selected objects and their
		// `CanvasObject` references
		if (elements === undefined) {
			elements = [];

			for (const obj of this.canvas.selectedObjects()) {
				elements.push(this.getCanvasFromFabric(obj));
			}
		}

		for (const el of elements) {
			console.log(el);
			// remove from canvas
			this.canvas.removeObject(el.getObject());

			// remove object from `this.loadedObjects`, if is an image remove
			// also from input's loaded files
			const index = this.objLoaded.indexOf(el);

			if (index === -1) {
				throw new Error("Element not found inside this.loadedObject.");
			}

			this.objLoaded.splice(index, 1);

			// if is a `CanvasImage` remove also from loaded files
			if (el instanceof CanvasImage) {
				this.input.value = "";
			}
		}
	};

	/**
	 * Get the corrispondant `CanvasObject` of a `fabric.Object` from the object
	 * loaded inside the canvas.
	 *
	 * @param obj The object to search the corrispondant to.
	 * @returns The corrispondant `CanvasObject`.
	 */
	private getCanvasFromFabric = (obj: fabric.Object): CanvasObject => {
		const corrispondant = this.objLoaded.filter((value) => {
			return value.checkObject(obj);
		});

		// checks if there was a corrispondant
		if (corrispondant.length === 0) {
			throw new Error("No corrispondant found.");
		}

		return corrispondant[0];
	};

	/**
	 * Load images from `files`.
	 *
	 * @param files The list of images' files.
	 */
	private loadImage = (files: FileList) => {
		// loop through files
		for (const file of files) {
			const img = new Image();

			// when a new image is loaded (via `img.src`) render in the editor
			img.onload = () => {
				// make image fit canvas 
				const editorSize = this.canvas.getSize();
				const size: Size = { width: img.width, height: img.height};
				
				if (size.width > editorSize.width) {
					size.height = (editorSize.width * size.height) / size.width;
					size.width = editorSize.width;
				}

				if (size.height > editorSize.height) {
					size.width = (size.width * editorSize.height) / size.height;
					size.height = editorSize.height;
				}

				// calculate position for having the image centered
				const position: Position = {
					x: editorSize.width - (editorSize.width + size.width) / 2,
					y: editorSize.height - (editorSize.height + size.height) / 2,
				};

				// create image object, push to loaded objects and reder
				const imgObj = new CanvasImage(img, size, position);
				this.objLoaded.push(imgObj);
				this.canvas.renderObject(imgObj.getObject());
			};

			// load `file` into `img`
			img.src = URL.createObjectURL(file);
		}
	};

	/** 
	 * Handles update selections on the canvas, when `this.selection` is
	 * defined.
	 */
	private selectionEvent = () => {
		// for safety wrapping a if check for `this.selection` value but it
		// should be always defined from where it's called
		if (this.selection === undefined) {
			throw new Error("Can't remove undefined selection");
		}

		this.canvas.removeObject(this.selection.getObject());

		this.canvas.disableEvent("selection:updated", this.selectionEvent);
		this.canvas.disableEvent("selection:cleared", this.selectionEvent);

		this.selection = undefined;
	};
}

// libraries
import { fabric } from "fabric";

// interfaces
import { ControlStyle } from "../interfaces/canvas";
import { Size } from "../interfaces/quantity";

/** Handles all the interaction with the canvas. */
export class Canvas {
	/** Canvas where images are displayed. */
	private canvas: fabric.Canvas;

	/** Sizes of the canvas. */
	private size: Size;

	/** 
	 * Constructor of `Editor` class.
	 *
	 * @param id The id of the canvas or the canvas element.
	 * @param size The sizes of the canvas.
	 * @param responsive Define wether the canvas is responsive or not.
	 */
	constructor(
		id: string | HTMLCanvasElement,
		size: Size,
		responsive = false,
		controlStyle: ControlStyle = {
			borderColor: "rgba(0, 0, 0, 1)",
			cornerColor: "rgba(0, 0, 0, 1)",
			cornerSize: 10,
			transparentCorners: false,
			lockRotation: false,
		}
	) {
		// init canvas
		this.canvas = new fabric.Canvas(id);

		// set sizes of canvas and store in corrispondent property
		this.canvas.setDimensions(size);
		this.size = size;

		// add listener on window resize for handle responsiveness of canvas
		if(responsive) {
			this.canvasResponsive();
			window.addEventListener("resize", () => this.canvasResponsive());
		}

		// assign control style, if `lockRotation` is true make the rotation
		// controller invisible
		fabric.Object.prototype.set(controlStyle);

		if (controlStyle.lockRotation) {
			fabric.Object.prototype.controls = {
				...fabric.Object.prototype.controls,
				mtr: new fabric.Control({ visible: false })
			};
		}
	}

	/**
	 * Set new size of canvas.
	 *
	 * @param size The new size.
	 */
	setSize = (size: Size) => {
		this.size = size;
		this.canvas.setDimensions(size);
	};

	/** 
	 * Get size of canvas.
	 *
	 * @returns The size of the canvas.
	 */
	getSize = (): Size => ({...this.size});

	/**
	 * Load object into canvas.
	 *
	 * @param obj The object to load.
	 */
	renderObject = (obj: fabric.Object) => {
		this.canvas.add(obj);
		this.canvas.renderAll();
	};

	/**
	 * Remove `el` from canvas. If `el` is undefined remove the selected
	 * objects.
	 * 
	 * @param el The elements to be removed.
	 */
	removeObject = (el?: fabric.Object[] | fabric.Object) => {
		if (el === undefined) {
			for (const obj of this.canvas.getActiveObjects()) {
				this.canvas.remove(obj);
				this.canvas.renderAll();
			}
		} else if (Array.isArray(el)) {
			for (const obj of el) {
				this.canvas.remove(obj);
				this.canvas.renderAll();
			}
		} else {
			this.canvas.remove(el);
			this.canvas.renderAll();
		}
	};

	/** Handle canvas reponsiveness. */
	private canvasResponsive = () => {
		// get canvas wrapper width and check if it's undefined
		const wrapper = this.canvas.getElement().parentElement;

		if (wrapper === null) {
			throw new Error(
				"Can't make responsive a canvas without parent element"
			);
		}

		wrapper.style.width = "100%";

		// set new canvas' sizes
		const newHeight =
			(this.size.height * wrapper.clientWidth) / this.size.width;
		this.setSize({
			width: wrapper.clientWidth, height: newHeight
		});


		// transformation of the content
		const scale =
			this.canvas.getZoom() * (wrapper.clientWidth / this.size.width);
		this.canvas.setViewportTransform([scale, 0, 0, scale, 0, 0]);
	};
}

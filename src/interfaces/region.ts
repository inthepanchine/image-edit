// Interfaces of `CanvasSelection` class.

import { CanvasObject } from "../core/object";
import { Position, Size } from "./quantity";

/** Representation of a selected region. */
export interface SelectedRegion {
	/** What `CanvasObject` the selection is relative to. */
	relativeTo: CanvasObject;
	/** Size of the region. */
	size: Size;
	/** Position of the region. */
	position: Position;
}

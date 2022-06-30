// Interfaces relative to Editor's class.

/** Representation of the controls for moving canvas' elements. */
export interface ControlStyle {
	/* The selection's border color. */
	borderColor: string;
	/* The resize corner's color. */
	cornerColor: string;
	/* The the resize corner's size. */
	cornerSize: number;
	/* Define whether corners are transparent or not. */
	transparentCorners: boolean;
	/* Define whether the image is rotable or not. */
	lockRotation: boolean;
}

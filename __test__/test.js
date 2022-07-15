// library test file
requirejs(["main"], (util) => {
	// get elements
	// files
	const fileInput = document.getElementById("input");
	const exportBtn = document.getElementById("export");

	// editing
	const removeBtn = document.getElementById("remove");
	const regionBtn = document.getElementById("region");
	const cropBtn = document.getElementById("crop");
	const blurBtn = document.getElementById("blur");

	// shapes
	const textBtn = document.getElementById("text");
	const circleBtn = document.getElementById("circle");
	const rectBtn = document.getElementById("rect");

	let canvas = new util.Canvas(
		"canvas",
		{ width: 1500, height: 750 },
		true,
		{
			borderColor: "rgba(0, 0, 255, 1)",
			cornerColor: "rgba(0, 0, 255, 1)",
			cornerSize: 10,
			transparentCorners: false,
			lockRotation: false,
		}
	);
	let render = new util.Render(canvas, fileInput);

	removeBtn.addEventListener("click", () => {
		render.removeObject();
	});

	textBtn.addEventListener("click", () => {
		render.addText({ fill: "orange", fontFamily: "helvetica" });
	});

	circleBtn.addEventListener("click", () => {
		render.addShape("circle", {
			stroke: "black",
			strokeWidth: 1,
			fill: "transparent"
		});
	});

	rectBtn.addEventListener("click", () => {
		render.addShape("rect", {
			stroke: "black",
			strokeWidth: 1,
			fill: "transparent"
		});
	});

	regionBtn.addEventListener("click", () => {
		render.addSelection();
	});
});

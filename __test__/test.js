// library test file
requirejs(["main"], (util) => {
	var editor = new util.Canvas(
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
});

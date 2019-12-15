const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave');
let painting = false;
let filling = false;

function changeSize(event) {
	ctx.lineWidth = event.target.value;
}

function changeColor(event) {
	const c = event.target.style.backgroundColor;
	ctx.strokeStyle = c;
	ctx.fillStyle = c;
}

function onMouseMove(event) {
	const x = event.offsetX;
		const y = event.offsetY;
		if (!painting) {
			ctx.beginPath();
			ctx.moveTo(x, y);
		} else {
			ctx.lineTo(x, y);
			ctx.stroke();
		}
}

function startPainting(event) {
	painting = true;
}

function stopPainting(event) {
	painting = false;
}

function toggleMode(event) {
	if (filling) {
		filling = false;
		mode.textContent = 'fill';
	} else {
		filling = true;
		mode.textContent = 'paint';
	}
}

function savePaint(event) {
	const image = canvas.toDataURL('image/jpeg');
	const link = document.createElement('a');
	link.href = image;
	link.download = "hello.png";
	link.click();
}

function setup() {
	canvas.width = 500;
	canvas.height = 500;
	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "#2c2c2c";
	ctx.strokeStyle = "#2c2c2c";
	ctx.lineWidth = 2.5;
}

function init() {
	if (canvas) {
		canvas.addEventListener("mousemove", onMouseMove);
		canvas.addEventListener("mousedown", startPainting);
		canvas.addEventListener("mouseup", stopPainting);
		canvas.addEventListener("mouseleave", stopPainting);
		canvas.addEventListener("click", (event) => {
			if (filling)
				ctx.fillRect(0, 0, canvas.width, canvas.height);
		});
		canvas.addEventListener("contextmenu", (event) => {
			event.preventDefault();
		})
	}

	if (range) {
		range.addEventListener('input', changeSize);
	}
	
	if (colors) {
		Array.from(colors).forEach(color => color.addEventListener('click', changeColor));
	}
	
	if (mode) {
		mode.addEventListener('click', toggleMode);
	}
	
	if (saveBtn) {
		saveBtn.addEventListener('click', savePaint);
	}
}

setup();
init();
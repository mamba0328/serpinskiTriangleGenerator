//import TrianglesCanvas from "./TriangleCanvas"

class TrianglesCanvas {
    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.ctx.fillStyle = 'black';
        this.sizeOfDots = 1;
        this.corners = [[0, 997], [500, 0], [997, 997]];
        this.firstPoint = this.corners[0];
    }

    drawCorners() {
        this.ctx.fillRect(...this.corners[0], 3, 3);
        this.ctx.fillRect(...this.corners[1], 3, 3);
        this.ctx.fillRect(...this.corners[2], 3, 3);
    }

    makeTriangles(repeatTimes) {
        for (let i = 0; i < repeatTimes; i++) {
            //take randome point from corners
            let randomPoint = this.firstPoint[0] == this.corners[0][0] && this.firstPoint[1] == this.corners[0][1] ? this.corners[Math.round(Math.random() + 1)] : this.corners[Math.round(Math.random() * 2)];

            //place new point on the halfway from first to seconde
            let halfPoint = [(this.firstPoint[0] + randomPoint[0]) / 2, (this.firstPoint[1] + randomPoint[1]) / 2];
            this.ctx.fillRect(...halfPoint, this.sizeOfDots, this.sizeOfDots);

            //repeat with new point as a first point
            this.firstPoint = halfPoint;
        }
    }

    clear() { 
        this.ctx.clearRect(0, 0, 999, 999);
        this.ctx.fillStyle = 'black';
        this.drawCorners();
    }
}

const canvas = new TrianglesCanvas(document.querySelector('canvas'));
canvas.drawCorners();



const createTriangleButton = document.getElementById('generate')
createTriangleButton.addEventListener('click', (e) => {
    e.preventDefault();

    canvas.ctx.fillStyle = document.getElementById('color').value;
    const radioElems = Array.from(document.querySelectorAll('.radio'));
    for (let i = 0; i < radioElems.length; i++){ 
        if (radioElems[i].checked) {
            canvas.sizeOfDots = i + 1; 
        }
    }
    canvas.makeTriangles(document.getElementById('quantity-of-dots').value);
})

const clearButton = document.getElementById('clear'); 
clearButton.addEventListener('click', () => { 
    canvas.clear()
})
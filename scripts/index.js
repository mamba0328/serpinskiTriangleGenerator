//import TrianglesCanvas from "./TriangleCanvas"

class TrianglesCanvas {
    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.ctx.fillStyle = 'black';
        this.sizeOfDots = 1;
        this.corners = [[0, 997], [500, 0], [997, 997]];
        this.firstPoint = this.corners[0];
        this.dotByDot = false; 
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

    makeTrianglesWithDefer(repeatTimes) {
        for (let i = 0; i < repeatTimes; i++) {
            setTimeout(() => {
                this.makeTriangles(1)
            }, repeatTimes - i)
        }
        
    }

    clear() { 
        this.ctx.clearRect(0, 0, 1000, 1000);
        this.ctx.fillStyle = 'black';
        this.drawCorners();
    }
}

const canvas = new TrianglesCanvas(document.querySelector('canvas'));
canvas.drawCorners();

const createTriangleButton = document.getElementById('generate')
createTriangleButton.addEventListener('click', (e) => {
    e.preventDefault();
    collectSettings()
    startGeneration()
})

const clearButton = document.getElementById('clear'); 
clearButton.addEventListener('click', () => { 
    canvas.clear()
})

function collectSettings(e){ 
    canvas.ctx.fillStyle = document.getElementById('color').value;
    const radioElems = Array.from(document.querySelectorAll('.radio'));
    for (let i = 0; i < radioElems.length; i++){ 
        if (radioElems[i].checked) {
            canvas.sizeOfDots = i + 1; 
        }
    }

    const modeToggler = document.getElementById('dotByDotMode');

    modeToggler.checked ? canvas.dotByDot = true : canvas.dotByDot = false;
        
    if (modeToggler.checked && document.getElementById('quantity-of-dots').value > 999999) {
        alert('Дохуя ты хочешь, фраерок')
        alert('Свыше 999 999 с покрапочным модом страница крашится')
        alert('Так что я урезал твои хотелки до 999 999, наслаждайся')
        document.getElementById('quantity-of-dots').value = 999999;
    }
}

function startGeneration() {
    canvas.dotByDot ? canvas.makeTrianglesWithDefer(document.getElementById('quantity-of-dots').value) : canvas.makeTriangles(document.getElementById('quantity-of-dots').value);
}
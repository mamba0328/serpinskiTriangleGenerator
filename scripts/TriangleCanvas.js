class TrianglesCanvas { 
    constructor(canvas) { 
        this.ctx = canvas.getContext('2d');
        this.ctx.fillStyle = 'red';
        this.sizeOfDots = 1;
        this.corners = [[0, 999], [500, 0], [999, 999]];
        this.firstPoint = this.corners[0];
    }

    drawCorners() { 
        this.ctx.fillRect(...this.corners[0], 1, 1);
        this.ctx.fillRect(...this.corners[1], 1, 1);
        this.ctx.fillRect(...this.corners[2], 1, 1);
    }

    makeTriangles(repeatTimes) { 
        for (let i = 0; i < repeatTimes; i++){ 
        //take randome point from corners
        let randomPoint = this.firstPoint[0] == this.corners[0][0] && this.firstPoint[1] == this.corners[0][1] ? this.corners[Math.round(Math.random() + 1)] : this.corners[Math.round(Math.random() * 2)];   

        //place new point on the halfway from first to seconde
        let halfPoint = [(this.firstPoint[0] + randomPoint[0])/2, (this.firstPoint[1] + randomPoint[1])/2]
        this.ctx.fillRect(...halfPoint, this.sizeOfDots, this.sizeOfDots);

        //repeat with new point as a first point
        this.firstPoint = halfPoint;
    }
}

}

export default TrianglesCanvas
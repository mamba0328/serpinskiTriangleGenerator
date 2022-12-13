const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const corners = [[0,999], [500,0], [999,999]]

ctx.fillRect(...corners[0], 1, 1);
ctx.fillRect(...corners[1], 1, 1);
ctx.fillRect(...corners[2], 1, 1);

function makeTriangles(repeatTimes) { 
    //take first point
    let firstpoint = corners[0];
    
    for (let i = 0; i < repeatTimes; i++){ 
    //take randome point from corners
    let randomPoint = firstpoint[0] == corners[0][0] && firstpoint[1] == corners[0][1] ? corners[Math.round(Math.random() + 1)] : corners[Math.round(Math.random() * 2)];   

    //place new point on the halfway from first to seconde
    let halfPoint = [(firstpoint[0] + randomPoint[0])/2, (firstpoint[1] + randomPoint[1])/2]
    ctx.fillRect(...halfPoint, 1, 1);

    //repeat with new point as a first point
    firstpoint = halfPoint;
    }
    
}

makeTriangles(100000000)
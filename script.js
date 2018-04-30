var squareSize = 5,
    numSquares = 160,
    x0 = 80,
    y0 = 80,
    head0 = 1;

var gridState = new Array(numSquares*numSquares);

var ant = {
    x: x0,
    y: y0,
    heading: head0,
    context: null
};
ant.fillSquare = function(x, y) {
    ant.context.fillRect(squareSize*x, squareSize*y, squareSize, squareSize);
};
ant.clearSquare = function(x, y) {
    ant.context.clearRect(squareSize*x, squareSize*y, squareSize, squareSize);
};
ant.turnRight = function() {
    if (ant.heading == 4) {
        ant.heading = 1;
    } else {
        ant.heading += 1;
    }
};
ant.turnLeft = function() {
    if (ant.heading == 1) {
        ant.heading = 4;
    } else {
        ant.heading -= 1;
    }
};
ant.move = function() {
    if (ant.heading == 1) {
        ant.y -= 1;
    } else if (ant.heading == 2) {
        ant.x -= 1;
    } else if (ant.heading == 3) {
        ant.y += 1;
    } else if (ant.heading == 4) {
        ant.x += 1;
    }
};
ant.progress = function() {
    // console.log(ant.x, ant.y, ant.y*numSquares + ant.x, gridState[ant.y*numSquares + ant.x]);
    if (ant.x < 0 || ant.x >= numSquares || ant.y < 0 || ant.y >= numSquares) {
        console.error("Reached edge of grid");
        return false;
    }
    var gridIndex = ant.y*numSquares + ant.x;
    if (gridState[gridIndex] === 1) {
        ant.clearSquare(ant.x, ant.y);
        gridState[gridIndex] = 0;
        ant.turnRight();
        ant.move();
        return true;
    } else {
        ant.fillSquare(ant.x, ant.y);
        gridState[gridIndex] = 1;
        ant.turnLeft();
        ant.move();
        return true;
    }
};


window.onload = function() {
    var canvas = document.getElementById("canvas");

    if (canvas.getContext) {
        ctx = canvas.getContext("2d");

        ant.context = ctx;

        // Add periodic black squares to make things interesting:
        // for (var j = 0; j < gridState.length; j+=78) {
        //     gridState[j] = 1;
        //     ant.fillSquare(j % numSquares, Math.floor(j / numSquares));
        // }

        var intervalID = setInterval(function () {
            var canProgress = ant.progress();
            if (canProgress === false){
                clearInterval(intervalID);
            }
        }, 0);

        // setTimeout(function() {
        //     clearInterval(intervalID);
        // }, 120000);
    }
};

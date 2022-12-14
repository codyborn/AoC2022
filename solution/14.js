const fs = require('fs');

// https://adventofcode.com/2022/day/14
const inputFileName = '14'

class Point {
    constructor(x, y) {
        this.x = parseInt(x)
        this.y = parseInt(y)
    }
    toString() {
        this.x + " " + this.y
    }
}

// Expected to run from root directory
fs.readFile('input/'+inputFileName+'.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const board = []
  let lowestY = 0
  const inputLines = data.split('\n')
  inputLines.forEach(line => {

    let prevPoint = undefined
    const rockPath = line.split(' -> ')
    rockPath.forEach((point) =>{
        const coord = point.split(',')
        const newPoint = new Point(coord[0], coord[1])
        lowestY = Math.max(lowestY, newPoint.y)
        if (!prevPoint) {
            prevPoint = newPoint
        }
        else {
            if (prevPoint.x == newPoint.x) {
                // draw vertical line
                for(let i = Math.min(prevPoint.y, newPoint.y); i <= Math.max(prevPoint.y, newPoint.y); i++){
                    board[prevPoint.x + " " + i] = '#'
                }
            }
            else if (prevPoint.y == newPoint.y) {
                // draw horizontal line
                for(let i = Math.min(prevPoint.x, newPoint.x); i <= Math.max(prevPoint.x, newPoint.x); i++){
                    board[i + " " + prevPoint.y] = '#'
                }
            }
            prevPoint = newPoint
        }
    })
  })

  let count = 0
  while(sandIsStable(board, lowestY)){
      count++
    //   printBoard(board)
    //   sleep(200)
  }

  console.log(count + 1)
  printBoard(board)
});

function sleep(ms) 
{
  var e = new Date().getTime() + (ms);
  while (new Date().getTime() <= e) {}
}

function printBoard(board) {
    for (let y = 0; y < 150; y++) {
        let line = ''
        for (let x = 480; x < 550; x++) {
            if (board[x + " " + y]){
                line += board[x + " " + y]
            }
            else {
                line += '.'
            }
        }
        console.log(line)
    }
}

function sandIsStable(board, lowestY) {
    let currX = 500
    let currY = 0

    while(true) {

        if (!board[currX + " " + (currY+1)] && currY+1 < lowestY+2) {
            // below is clear
            currY++
        }
        else if (!board[(currX-1) + " " + (currY+1)] && currY+1 < lowestY+2 ) {
            // diagonal left
            currY++
            currX--
        }
        else if (!board[(currX+1) + " " + (currY+1)] && currY+1 < lowestY+2 ) {
            // diagonal right
            currY++
            currX++
        }
        else {
            // stop
            board[currX + " " + currY] = 'O'
            // pt 1
            // return currY != lowestY 
            // pt 2
            return (currX != 500 || currY != 0)
        }
    }
}
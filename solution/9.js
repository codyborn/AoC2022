const fs = require('fs');

// https://adventofcode.com/2022/day/9
const inputFileName = '9'

class Location {
    constructor() {
        this.x = 0
        this.y = 0
    }

    isAdjacent(to) {
        return (Math.abs(to.x - this.x) <= 1 &&
            Math.abs(to.y - this.y) <= 1)
    }

    move(dx, dy) {
        this.x += dx
        this.y += dy
    }

    moveWith(parent) {
        if (this.isAdjacent(parent)) {
            return
        }
        const dx = parent.x - this.x
        const dy = parent.y - this.y
        if (Math.abs(dx) == Math.abs(dy)) {
            this.x += Math.floor(dx/2)
            this.y += Math.floor(dy/2)
        }
        else if (Math.abs(dx) > Math.abs(dy)) {
            this.y = parent.y
            this.x += Math.floor(dx/2)
        }
        else {
            this.x = parent.x
            this.y += Math.floor(dy/2)
        }
    }
    
    posToString() {
        return this.x + " " + this.y
    }
}

// Expected to run from root directory
fs.readFile('input/'+inputFileName+'.txt', 'utf8', (err, data) => {

    const tracker = []
    let uniqueSpots = 0
    const nodeCount = 10
    const displaySize = 15
    const nodes = []
    for (let i = 0; i < nodeCount; i++) {
        nodes.push(new Location())
    }
    const head = nodes[0]
    const tail = nodes[nodes.length-1]
    const inputLines = data.split('\n')
    inputLines.forEach(line => {

        const direction = line.split(' ')[0]
        const magnitude = line.split(' ')[1]

        for (let i = 0; i < magnitude; i++) {
                if(direction == 'U'){
                    head.move(0, -1)
                }
                else if(direction == 'D'){
                    head.move(0, 1)
                }
                else if(direction == 'L'){
                    head.move(-1, 0)
                }
                else if(direction == 'R'){
                    head.move(1, 0)
                }

            for (let i = 1; i < nodeCount; i++) {
                nodes[i].moveWith(nodes[i-1])
            }
            sleep(200)
            printNodes(nodes, displaySize)
            
            if (!tracker[tail.posToString()]){
                tracker[tail.posToString()] = true
                uniqueSpots++
            }
        }
    })
    console.log(uniqueSpots)
});

function sleep(ms) 
{
  var e = new Date().getTime() + (ms);
  while (new Date().getTime() <= e) {}
}

function printNodes(nodes, displaySize) {
    const minX = displaySize * -1 
    const minY = displaySize * -1 
    const maxX = displaySize
    const maxY = displaySize
    const display = new Array(maxY - minY)
    for (let i = 0; i < display.length; i++) {
        display[i] = new Array(maxX - minX)
        for (let j = 0; j < display[i].length; j++) {
            display[i][j] = '.'
        }
    }

    for (let i = nodes.length-1; i >= 0; i--) {
        display[nodes[i].y - minY][nodes[i].x - minX] = i
    }

    for (let i = 0; i < display.length; i++) {
        console.log(display[i].reduce((a,b) => a+b))
    }
    console.log()
}
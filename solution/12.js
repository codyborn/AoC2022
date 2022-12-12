const fs = require('fs');

// https://adventofcode.com/2022/day/12
const inputFileName = '12'

class Node {
    constructor(name, row, col, map) {
        this.name = name
        this.row = row
        this.col = col
        this.map = map
    }

    // Checks adjacent nodes for potential paths forward
    getNeighbors() {
        const neighbors = []
        if (this.row - 1 >= 0) {
            let neighbor = new Node(this.map[this.row-1].charAt(this.col), this.row-1, this.col, this.map)
            neighbors.push(neighbor)
        }
        if (this.row + 1 < this.map.length) {
            let neighbor = new Node(this.map[this.row+1].charAt(this.col), this.row+1, this.col, this.map)
            neighbors.push(neighbor)
        }
        if (this.col - 1 >= 0) {
            let neighbor = new Node(this.map[this.row].charAt(this.col-1), this.row, this.col-1, this.map)
            neighbors.push(neighbor)
        }
        if (this.col + 1 < this.map[0].length) {
            let neighbor = new Node(this.map[this.row].charAt(this.col+1), this.row, this.col+1, this.map)
            neighbors.push(neighbor)
        }
        return neighbors.filter((n) => this.name == 'S' ||
            this.getHeightDelta(n) <= 1 ||
            (this.name == 'z' && n.name == 'E'))
    }

    getHeightDelta(node) {
        return node.name.charCodeAt(0) - this.name.charCodeAt(0)
    }

    toString() {
        return this.row + " " + this.col
    }
}

// Expected to run from root directory
fs.readFile('input/'+inputFileName+'.txt', 'utf8', (err, data) => {

    const inputLines = data.split('\n')
    const startingNodes = []
    inputLines.forEach((line, row)=> {
        for(let col = 0; col < line.length; col++) {
            const char = line.charAt(col)
            if (char == 'S' || char == 'a'){
                startingNodes.push(new Node(char, row, col, inputLines))
            }
        }
    })
    const distanceMap = new Array(inputLines.length)
    for(let i = 0; i < inputLines.length; i++) {
        distanceMap[i] = new Array(inputLines[i].length)
    }

    let min = Number.MAX_VALUE
    for(const node of startingNodes) {
        min = Math.min(min, BFS(node, distanceMap))
    }
    console.log(min)
})

function BFS(startNode, distanceMap) {
    // Create a queue for tracking nodes to visit next
    const queue = [startNode];
    distanceMap[startNode.row][startNode.col] = 0
    const visited = [];

    while (queue.length > 0) {
        // Pop the first node from the queue
        const currentNode = queue.shift();

        const neighbors = currentNode.getNeighbors()

        for (const neighbor of neighbors) {
            const nextDistance = distanceMap[currentNode.row][currentNode.col]+1

            if (neighbor.name == 'E') {
                return nextDistance
            }
            if (!visited[neighbor.toString()]) {
                visited[neighbor.toString()] = true
                queue.push(neighbor);
                distanceMap[neighbor.row][neighbor.col] = nextDistance
            }
        }
    }

    // If we get here, we've searched the entire graph and haven't found the target node
    return Number.MAX_VALUE
}

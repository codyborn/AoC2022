const fs = require('fs');
const { exit } = require('process');

// https://adventofcode.com/2022/day/23
const inputFileName = '23'

class Pos  {
    constructor(x, y){
        this.x = x
        this.y = y
    }
    toString() {
        return this.x + "_" + this.y
    }
}

class Elf {
    constructor(x, y){
        this.pos = new Pos(x, y)
    }
    toString() {
        return this.pos.toString()
    }
}

class Direction {
    constructor(pos, checks){
        this.pos = pos
        this.checks = checks
    }
}

const directions = [
    // North
    new Direction(new Pos(0, -1), [new Pos(0, -1), new Pos(-1, -1), new Pos(1, -1)]),
    // South
    new Direction(new Pos(0, 1), [new Pos(0, 1), new Pos(-1, 1), new Pos(1, 1)]),
    // West
    new Direction(new Pos(-1, 0), [new Pos(-1, 0), new Pos(-1, -1), new Pos(-1, 1)]),
    // East
    new Direction(new Pos(1, 0), [new Pos(1, 0), new Pos(1, -1), new Pos(1, 1)])
]

// Expected to run from root directory
fs.readFile('input/'+inputFileName+'.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const inputLines = data.split('\n')
    let board = []
    let minX = Number.MAX_VALUE
    let minY = Number.MAX_VALUE
    let maxX = Number.MIN_VALUE
    let maxY = Number.MIN_VALUE
    let intermediateBoard = []
    let nextBoard = []
    const elfList = []
    // construct starting board
    inputLines.forEach((line, y) => {
        for (let x = 0; x < line.length; x++) {
            if (line.charAt(x) == '#') {
                const elf = new Elf(x, y)
                elfList.push(elf)
                board[elf] = true
                minX = Math.min(minX, elf.pos.x)
                minY = Math.min(minY, elf.pos.y)
                maxX = Math.max(maxX, elf.pos.x)
                maxY = Math.max(maxY, elf.pos.y)
            }
        }
    })

    print(board, minX, minY, maxX, maxY)

    // Run n rounds
    const rounds = 1000
    for (let i = 0; i < rounds; i++) {
        // record on the next board the possible moves
        for (const elf of elfList) {
            let proposed = undefined
            let allClear = true
            for(const direction of directions) {
                let thisClear = true
                for (const check of direction.checks) {
                    const checkPos = new Pos(elf.pos.x + check.x, elf.pos.y + check.y)
                    if (board[checkPos]) {
                        allClear = false
                        thisClear = false
                        break
                    }
                }
                if(thisClear) {
                    proposed = proposed ? proposed : direction
                }
            }
            if (!allClear && proposed) {
                // Propose moving to destination
                const nextPos = new Pos(elf.pos.x + proposed.pos.x, elf.pos.y + proposed.pos.y)
                if (!intermediateBoard[nextPos]) {
                    intermediateBoard[nextPos] = 0
                }
                intermediateBoard[nextPos]++
            }
        }

        // check if the pos is clear, if not stay put
        let settled = true
        for (const elf of elfList) {
            let proposed = undefined
            let allClear = true
            for(const direction of directions) {
                let thisClear = true
                for (const check of direction.checks) {
                    const checkPos = new Pos(elf.pos.x + check.x, elf.pos.y + check.y)
                    if (board[checkPos]) {
                        allClear = false
                        thisClear = false
                        break
                    }
                }
                if(thisClear) {
                    proposed = proposed ? proposed : direction
                }
            }
            let nextPos
            if (!allClear && proposed) {
                settled = false
                nextPos = new Pos(elf.pos.x + proposed.pos.x, elf.pos.y + proposed.pos.y)
            }
            if (allClear || !proposed || intermediateBoard[nextPos] != 1) {
                // no movement needed or blocked, leave the elf
                nextPos = elf.pos
            }
            nextBoard[nextPos] = true
            elf.pos.x = nextPos.x
            elf.pos.y = nextPos.y
            minX = Math.min(minX, elf.pos.x)
            minY = Math.min(minY, elf.pos.y)
            maxX = Math.max(maxX, elf.pos.x)
            maxY = Math.max(maxY, elf.pos.y)
        }

        // Clear the boards and rotate the order of the directions
        intermediateBoard = []
        board = nextBoard
        nextBoard = []
        const direction = directions.shift()
        directions.push(direction)
        //print(board, minX, minY, maxX, maxY)
        if (settled) {
            console.log(i+1)
            exit()
        }
    }
})

function print(board, minX, minY, maxX, maxY) {
    let emptyTiles = 0
    for (let row = minY; row <= maxY; row++) {
        let line = ''
        for (let col = minX; col <= maxX; col++) {
            line += board[new Pos(col,row)] ? '#' : '.'
            if (!board[new Pos(col,row)]) {
                emptyTiles++
            }
        }
        console.log(line)
    }
    console.log('+-----+')
    return emptyTiles
}
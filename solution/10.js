const fs = require('fs');

// https://adventofcode.com/2022/day/10
const inputFileName = '10'

// Expected to run from root directory
fs.readFile('input/'+inputFileName+'.txt', 'utf8', (err, data) => {

    let x = 1
    const inputLines = data.split('\n')
    let cycle = 1
    board = new Array()
    
    for (let i = 0; i < inputLines.length; i++) {
        checkCRT(cycle, x)
        const line = inputLines[i]
        let operation = line.split(' ')[0]
        switch (operation) {
            case 'noop':
                break
            case 'addx':
                cycle++
                checkCRT(cycle, x)
                x += parseInt(line.split(' ')[1])
                break
        }
        cycle++
    }
    printCRT()
});

function checkCRT(cycle, x) {
    const crtPos = (cycle - 1) % 40
    const upperSprite = x + 1
    const lowerSprite = x - 1
    if (upperSprite >= crtPos && lowerSprite <= crtPos) {
        board[cycle - 1] = '#'
    }
    else {
        board[cycle - 1] = '.'
    }
}

function printCRT() {
    const w = 40
    const h = 6
    for (let i = 0; i < h; i++) {
        let line = ''
        for (let j = 0; j < w; j++) {
            line += board[i*w + j]
        }
        console.log(line)
    }
}
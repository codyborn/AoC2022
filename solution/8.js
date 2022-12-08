const fs = require('fs');

// https://adventofcode.com/2022/day/8
const inputFileName = '8'

// Expected to run from root directory
fs.readFile('input/'+inputFileName+'.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    // init resultBoard
    const inputLines = data.split('\n')
    const resultBoard = []
    for(let i = 0; i < inputLines.length; i++) {
        resultBoard.push([inputLines[i].length])
        for(let j = 0; j < inputLines[i].length; j++) {
            resultBoard[i][j] = 0
        }
    }

    // Build resultBoard
    for(let i = 0; i < inputLines.length; i++) {
        for(let j = 0; j < inputLines[i].length; j++) {
            if (!isEdge(inputLines, i, j)) {
                markVisible(inputLines, i, j, resultBoard)
            }
        }
    }

    // Aggregate results
    let max = 0
    for(let i = 0; i < inputLines.length; i++) {
        const rowMax = Math.max.apply(null, resultBoard[i])
        max = Math.max(rowMax, max)
    }
    console.log(max)
});

function isEdge(input, row, col) {
    return (row == 0 || row == input.length-1) || 
    (col == 0 || col == input[0].length-1)
}

function markVisible(input, row, col, resultBoard) {

    const height = input[row][col]
    const result = [0, 0, 0, 0]
    // down
    for (let i = row+1; i < input.length; i++) {
        result[0]++
        if (input[i][col] >= height) {
            break;
        }
    }
    // up
    for (let i = row-1; i >= 0; i--) {
        result[1]++
        if (input[i][col] >= height) {
            break;
        }
    }
    // right
    for (let i = col+1; i < input[row].length; i++) {
        result[2]++
        if (input[row][i] >= height) {
            break;
        }
    }
    // left
    for (let i = col-1; i >= 0; i--) {
        result[3]++
        if (input[row][i] >= height) {
            break;
        }
    }
    resultBoard[row][col] = result.reduce((a,b) => a * b)
}
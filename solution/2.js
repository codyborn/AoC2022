const fs = require('fs');

// https://adventofcode.com/2022/day/2
const inputFileName = '2'

// Expected to run from root directory
fs.readFile('input/'+inputFileName+'.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const inputLines = data.split('\n')
  let score = 0
  inputLines.forEach(line => {
    let moves = line.split(' ')
    // map opponent move to 0, 1, 2 (rock paper scissors)
    const oppMove = moves[0].charCodeAt(0) - 65
    // map relative play to -1, 0, 1
    const relativePlay = moves[1].charCodeAt(0) - 89
    // lose by playing prev shape (-1), draw by playing same shape (+0), win by playing next shape (+1)
    // yourMove should be in the range of 0 to 2 (not -1 to 3)
    let yourMove = (oppMove + relativePlay + 3) % 3
    // add shape to score
    score += yourMove + 1
    // add outcome to score
    score += (relativePlay+1) * 3
  })
  console.log(score)
});
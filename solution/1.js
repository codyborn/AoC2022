const fs = require('fs');

// https://adventofcode.com/2022/day/1
const inputFileName = '1'

// Expected to run from root directory
fs.readFile('input/'+inputFileName+'.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const inputLines = data.split('\n')
  let maxCalories = [0, 0, 0]
  let currCalories = 0
  inputLines.forEach((line, linecount) => {
    if (linecount == inputLines.length) {
      currCalories += parseInt(line)
    }
    if (line == "" || linecount == inputLines.length) {
      for (let i = 0; i < 3; i++) {
        if (maxCalories[i] < currCalories) {
          maxCalories.splice(i, 0, currCalories)
          if (maxCalories.length > 3) {
            maxCalories.pop()
          }
          break;
        }
      }
      currCalories = 0
    }
    else {
      currCalories += parseInt(line)
    }
  })
  let totalCalories = maxCalories.reduce((c1, c2) => c1 + c2)
  console.log(totalCalories);
});
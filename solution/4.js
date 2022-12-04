const fs = require('fs');

// https://adventofcode.com/2022/day/4
const inputFileName = '4'

// Expected to run from root directory
fs.readFile('input/'+inputFileName+'.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const inputLines = data.split('\n')
  let count = 0
  inputLines.forEach(line => {
    const pairs = line.split(',')
    const pairOne = pairs[0].split('-').map(i => parseInt(i))
    const pairTwo = pairs[1].split('-').map(i => parseInt(i))

    if (pairOne[0] <= pairTwo[0] && pairOne[1] >= pairTwo[0]) {
        count++
    }
    else if (pairOne[0] >= pairTwo[0] && pairOne[0] <= pairTwo[1]) {
        count++
    }

  })
  console.log(count)
});

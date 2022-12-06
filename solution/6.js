const fs = require('fs');
const { exit } = require('process');

// https://adventofcode.com/2022/day/6
const inputFileName = '6'

// Expected to run from root directory
fs.readFile('input/'+inputFileName+'.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const inputLines = data.split('\n')
  const sequence = []
  const distinctChars = 14
  inputLines.forEach(line => {
    for(let i = 0; i < line.length; i++) {
        sequence.push(line.charAt(i))
        if (sequence.length > distinctChars) {
            sequence.splice(0, 1)
        }
        if (sequence.length == distinctChars) {
            const dupe = []
            let found = true
            sequence.forEach(value => {
                if (dupe[value]) {
                    found = false 
                }
                dupe[value] = true
            })
            if (found) {
                console.log(i + 1)
                exit()
            }
        }
    }
  })
});

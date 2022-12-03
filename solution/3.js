const fs = require('fs');

// https://adventofcode.com/2022/day/3
const inputFileName = '3'

// Expected to run from root directory
fs.readFile('input/'+inputFileName+'.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const inputLines = data.split('\n')
  let sum = 0
  let itemFreq = []
  let dupItem = ''
  inputLines.forEach((line, lineCount) => {
    const relativeLineCount = lineCount % 3
    if (relativeLineCount == 0) {
      itemFreq = []
      dupItem = ''
    }
    for(let i = 0; i < line.length; i++) {
        const item = line.charAt(i)

        if(relativeLineCount > 0 && itemFreq[item] == relativeLineCount - 1) {
            if (relativeLineCount == 2) {
              const offset = isUpperCase(item) ? 38 : 96
              sum += item.charCodeAt(0) - offset
              break
            }
            itemFreq[item] = relativeLineCount
        }
        else if (relativeLineCount == 0) {
          itemFreq[item] = 0
        }
    }
  })
  console.log(sum)
});

function isUpperCase(myString) { 
  return (myString == myString.toUpperCase()); 
} 
const fs = require('fs');

// https://adventofcode.com/2022/day/5
const inputFileName = '5'

// Expected to run from root directory
fs.readFile('input/'+inputFileName+'.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const inputLines = data.split('\n')
  let queues = undefined
  let initialized = false
  inputLines.forEach(line => {
    if (line.charAt(1) == '1') {
      // Header processed
      // reverse queues before processing movements
      initialized = true
      for (let i = 0; i < queues.length; i++) {
        queues[i] = reverse(queues[i])
      }
    }
    else {
      if (!initialized) {
        // Process header
        // Every 4th input is a blank or newline
        let columnCount = (line.length + 1) / 4
        if (!queues) {
          queues = new Array(columnCount)
        }
        for (let i = 0; i < columnCount; i++) {
          if (!queues[i]) {
            queues[i] = new Array()
          }
          const value = line.charAt((i+1) + i*3)
          if (value != ' ') {
            queues[i].push(value)
          }
        }
      }
      else {
        // Process commmands
        const command = line.split(' ')
        const moveCnt = parseInt(command[1])
        const from = parseInt(command[3]) - 1
        const to = parseInt(command[5]) - 1
        const holdingBay = []
        for (let i = 0; i < moveCnt; i++) {
          const value = queues[from].pop()
          holdingBay.push(value)
        }
        for (let i = 0; i < moveCnt; i++) {
          const value = holdingBay.pop()
          queues[to].push(value)
        }
      }
    }

  })

  let output = ''
  queues.forEach(q => output += q.pop())
  console.log(output)
});

function reverse(queue) {
  const rev = new Array()
  while(queue.length > 0) {
    rev.push(queue.pop())
  }
  return rev
}

const fs = require('fs');

// https://adventofcode.com/2022/day/13
const inputFileName = '13'

// Expected to run from root directory
fs.readFile('input/'+inputFileName+'.txt', 'utf8', (err, data) => {

    let inputLines = data.split('\n')
    inputLines = inputLines.filter((line) => line.length > 0)
    inputLines = inputLines.map((value) => JSON.parse(value))
    const twoKey = [[2]]
    const sixKey = [[6]]
    inputLines.push(twoKey)
    inputLines.push(sixKey)
    inputLines.sort((left, right) => -1 * comp(left, right))
    let twoKeyIndex = 0
    let sixKeyIndex = 0
    inputLines.forEach((line, count) => {
      if (line == twoKey){
        twoKeyIndex = count+1
      }  
      else if (line == sixKey) {
        sixKeyIndex = count+1
      }
    })
    console.log(twoKeyIndex*sixKeyIndex)
    
    // part 1
    // for (let i = 0; i < inputLines.length; i+=3) {

    //     console.log(inputLines[i])
    //     console.log(inputLines[i+1])
    //     const line1 = JSON.parse(inputLines[i])
    //     const line2 = JSON.parse(inputLines[i+1])
    //     if (comp(line1, line2) != -1) {
    //         rightCount += i/3 + 1
    //     }
    // }
})

function comp(left, right) {
    let i = 0
    for (; i < left.length; i++) {
        if (i == right.length) {
            // right ran out
            return -1
        }
        if (Number.isInteger(left[i]) && 
        Number.isInteger(right[i])) {
            if (parseInt(left[i]) > right[i]) {
                //  Right side is smaller, so inputs are not in the right order
                return -1
            }
            else if (parseInt(left[i]) < right[i]) {
                return 1
            }
        }
        else {
            let subCompResult = 0
            // If both values are lists
            if (Array.isArray(left[i]) && Array.isArray(right[i])) {
                subCompResult = comp(left[i], right[i])
            }
            else if (Array.isArray(left[i])) {
                subCompResult = comp(left[i], [right[i]])
            }
            else {
                subCompResult = comp([left[i]], right[i])                
            }
            if (subCompResult != 0) {
                return subCompResult
            }
        }
    }
    if (i == right.length) {
        // continue
        return 0
    }
    // left side ran out of items, so inputs are in the right order
    return 1
}
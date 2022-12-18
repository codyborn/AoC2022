const fs = require('fs');

// https://adventofcode.com/2022/day/18
const inputFileName = '18'

// Expected to run from root directory
fs.readFile('input/'+inputFileName+'.txt', 'utf8', (err, data) => {

    const shape = []
    let sidesExposed = 0
    const inputLines = data.split('\n')
    const maxValues = [Number.MIN_VALUE, Number.MIN_VALUE, Number.MIN_VALUE]
    const minValues = [Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE]
    for (const line of inputLines) {
        shape[line] = true
        const pos = line.split(',').map(n => parseInt(n))
        for (let i = 0; i < maxValues.length; i++) {
            maxValues[i] = Math.max(maxValues[i], pos[i]+1)
            minValues[i] = Math.min(minValues[i], pos[i]-1)
        }
    }
    // Start in one of the unoccupied corners and BFS to count all the exposed sides
    const queue = []
    const visited = []
    queue.push(maxValues[0] + "," + maxValues[1] + "," + maxValues[2])
    while (queue.length > 0) {
        const curr = queue.shift()
        const pos = curr.split(',').map(n => parseInt(n))

        if (shape[curr]) {
            sidesExposed++
            continue
        }
        // Ignore if outside bounds
        let withinBounds = true
        for (let i = 0; i < pos.length; i++) {
            if (pos[i] > maxValues[i] || pos[i] < minValues[i]) {
                withinBounds = false
                break
            }
        }
        if (visited[curr] || !withinBounds) {
            continue
        }
        visited[curr] = true

        queue.push((pos[0]+1) + "," + pos[1] + "," + pos[2])
        queue.push(pos[0] + "," + (pos[1]+1) + "," + pos[2])
        queue.push(pos[0] + "," + pos[1] + "," + (pos[2]+1))
        queue.push(pos[0] + "," + (pos[1]-1) + "," + pos[2])
        queue.push(pos[0] + "," + pos[1] + "," + (pos[2]-1))
        queue.push((pos[0]-1) + "," + pos[1] + "," + pos[2])
    }

    // pt 1
    // for (const line of inputLines) {
    //     const pos = line.split(',').map(n => parseInt(n))
    //     let exposed = 6
    //     const adj = []
    //     adj.push((pos[0]+1) + "," + pos[1] + "," + pos[2])
    //     adj.push(pos[0] + "," + (pos[1]+1) + "," + pos[2])
    //     adj.push(pos[0] + "," + pos[1] + "," + (pos[2]+1))
    //     adj.push((pos[0]) + "," + (pos[1]-1) + "," + pos[2])
    //     adj.push(pos[0] + "," + (pos[1]) + "," + (pos[2]-1))
    //     adj.push((pos[0]-1) + "," + pos[1] + "," + (pos[2]))
    //     for (const adjPos of adj) {
    //         if(shape[adjPos]) {
    //             exposed--
    //         }
    //     }
    //     sidesExposed += exposed
    // }
    console.log(sidesExposed)
});

const fs = require('fs');

// https://adventofcode.com/2022/day/7
const inputFileName = '7'

class Dir {

    constructor(cname) {
        this.name = cname
        this.totalSize = 0
        this.children = []
        this.ctable = []
        this.files = []
    }

    addChild(cname) {
        const child = new Dir(cname)
        this.children.push(child)
        this.ctable[cname] = child
        child.parent = this
    }
    getChild(cname) {
        return this.ctable[cname]
    }
    addFile(size, filename) {
        this.files[filename] = size
        this.totalSize += size
    }
}

// Expected to run from root directory
fs.readFile('input/'+inputFileName+'.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const inputLines = data.split('\n')
  const root = new Dir('/')
  let curr = root
  inputLines.forEach(line => {
    
    // parse commands
    let tokenized = line.split(' ')
    if (tokenized[0] == '$') {
        if (tokenized[1] == "cd") {
            const cname = tokenized[2]
            if (cname == '/') {
                curr = root
            }
            else if (cname == '..') {
                curr = curr.parent
            }
            else {
                curr = curr.getChild(cname)
            }
        }
        else if (tokenized[1] == 'ls') {
            // Not needed since no dirs are revisited
        }
    }
    else if (tokenized[0] == 'dir'){
        curr.addChild(tokenized[1])
    }
    else {
        const size = parseInt(tokenized[0])
        curr.addFile(size, tokenized[1])
    }
  })

  const totalSize = getTotalSize(root, undefined, undefined, 0)
  const spaceToDelete = 30000000 - (70000000 - totalSize)
  const bestCandidate = { best:70000000 }
  // Call again, but this time track bestCandidate
  getTotalSize(root, spaceToDelete, bestCandidate, 0)
  console.log(bestCandidate.best)
});

function getTotalSize(curr, spaceToDelete, bestCandidate, depth) {
    let debugStr = ''
    for(let i = 0; i < depth; i++) {
        debugStr += '\t'
    }
    //console.log(debugStr + curr.name + " " + curr.totalSize)
    let aggSize = 0
    curr.children.forEach(c => {
        aggSize += getTotalSize(c, spaceToDelete, bestCandidate, depth+1)
    })
    aggSize += curr.totalSize
    if (spaceToDelete) {
        if (aggSize < bestCandidate.best &&
            aggSize >= spaceToDelete) {
            bestCandidate.best = aggSize
        }
    }
    //console.log(debugStr+"aggSize: " + aggSize)
    
    return aggSize
}

const openProm = require('fs').promises.open

const openCB = require('fs').open
const readCB = require('fs').read

function readFile(filePath) {
  openCB(filePath, 'r', (error, fd) => {
    if (error) {
      throw error
    } else {
      readCB(fd, ...)
    }
  } )
}
const { open } = require('fs').promises
const Block = require('./block')

const dhcpdFileName = 'z:/mis_documentos_windows/dhcpd.conf'

async function getText (fileName) {
  const fh = await open(fileName) // fh: objeto FileHandle.
  return await fh.readFile({ encoding: 'utf-8' })
}

async function writeOutputToFile (outputFileName, output) {
  const fh = await open(outputFileName, 'w')
  return fh.writeFile(output, 'utf-8')
}

function getLines (text) {
  return text.split('\r\n')
}

// TODO: Comprobar si funciona
function hasBlockInfo (line) {
  return /^#!/.test(line)
}

// TODO: Comprobar si funciona
function isComment (line) {
  return /^#/.test(line)
}

// TODO: Comprobar si funciona
function linesToBlocks (lines) {
  // Creamos el bloque inicial (antes de la zona dinámica)
  let activeBlock = new Block('Bloque estático / sistema', 'Las líneas que estaban antes del bloque dinámico')
  let firstBlock = true
  const blocks = []

  for (const line of lines) {
    // Saltar las primeras líneas hasta que se endcentre el primer bloque "#!"
    if (hasBlockInfo(line)) {
      blocks.push(activeBlock)
      if (firstBlock) firstBlock = false
      activeBlock = Block.getBlockFromLine(line)
    } else {
      // Si estamos en el bloque estático preservamos los comentarios.
      if (firstBlock) {
        activeBlock.addLine(line)
      } else {
        if (!isComment(line)) {
          activeBlock.addLine(line)
        }
      }
    }
  }
  return blocks
}

// TODO: Comprobar si funciona.
function blocksToText (blocks) {
  const textArr = []
  for (const block of blocks) {
    textArr.push(block.getText())
  }
  // Delvuelve el texto de cada bloque separado por 2 líneas en blanco
  return textArr.join('\n\n\n')
}

module.exports = { Block, getText, getLines, linesToBlocks, blocksToText, writeOutputToFile }

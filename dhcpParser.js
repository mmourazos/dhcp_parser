const { open } = require('fs').promises

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

function linesToBlocks (lines) {
  for (const line of lines) {
    // Saltar las líneas hasta que se endcentre el primer bloque "#!"
    const blockTag = /^(?:#!)\s*([^,]+),\s*([^,]+)?/.match(line)
    if (blockTag) {
      // tendrá uno o dos grupos: El primer grupo es el nombre del bloque, el segundo será el comentario.
    }
  }
}

function parseDHCPConfig (confText) {

}


module.exports = { getText, getLines, writeOutputToFile }

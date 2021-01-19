const path = require('path')
const { open } = require('fs').promises
const dhcpdFileName = path.join('z:', 'mis_documentos_windows', 'dhcpd.conf')

async function getTexConf(fileName) {

  return await open(fileName)

}

function getOutputFile(fileName)

function parseDHCPConfig(confText)
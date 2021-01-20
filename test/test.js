const test = require('ava')

const { Block, getText, getLines, writeOutputToFile } = require('../dhcpParser')

test('Read file (async)', async t => {
  const readedText = await getText('./test/test.txt')
  t.is(readedText, 'hola\r\nmundo\r\ncruel')
})

test('Write file (async)', async t => {
  const output = 'output txt'
  await writeOutputToFile('./test/output.txt', output)
  const input = await getText('./test/output.txt')
  t.is(output, input)
})

test('Text to array of lines', async t => {
  const expectedLines = ['hola', 'mundo', 'cruel']
  const actualLines = getLines(await getText('./test/test.txt'))
  // t.is(expectedLines, actualLines)
  t.deepEqual(expectedLines, actualLines)
})

test('Get a Block from a line', t => {
  const line = '#! ¡Hola mundo!, Un saludo a este mundo cruel '
  const expectedBlock = new Block('¡Hola mundo!', 'Un saludo a este mundo cruel')
  t.deepEqual(expectedBlock, Block.getBlockFromLine(line))
})

test('Conf. to blocks')

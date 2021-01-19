const test = require('ava')

const { getText, getLines, writeOutputToFile } = require('../dhcpParser')

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

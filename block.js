class Block {
  constructor (tag, comment, ...lines) {
    this.tag = tag
    this.comment = comment
    this.lines = lines
  }

  addLine (line) {
    this.lines.push(line)
  }

  // TODO: Comprobar si funciona
  // Genera una cabecera de comentario para insertar al inicio
  // del bloque en el dhcpd.conf
  getHeader () {
    const textArr = [`### ${this.tag}`, [`### ${this.comment}`]]
    return [...textArr, ...this.lines]
  }

  // TODO: Comprobar si funciona
  getText () {
    const textArr = this.getHeader();
    [...textArr, ...this.lines].join('\n')
  }

  static getBlockFromLine (line) {
    const info = line.trim().match(/^(?:#!)\s*(?<tag>[^,]+),\s*(?<comment>[^,]+)?/)
    return new Block(info.groups.tag, info.groups.comment)
  }
}

module.exports = Block

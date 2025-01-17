const { expect } = require('chai')
const {
  createValueExpr,
  createBinaryExpr,
  literalToSQL,
  commentToSQL,
  identifierToSql,
} = require('../src/util')

describe('util function test', () => {
  it('should throw error when type is unkonw', () => {
    expect(createValueExpr.bind(null, {})).to.throw('Cannot convert value "object" to SQL')
  })

  it('should sqlify when right do not has type', () => {
    expect(createBinaryExpr('=', { type: 'left' }, 2)).to.be.eql({
      operator: '=',
      type: 'binary_expr',
      left: { type: 'left' },
      right: {
        type: 'number',
        value: 2
      }
    })
  })

  it('should sqlify when type if boolean has parentheses', () => {
    expect(literalToSQL({ type: 'boolean', parentheses: true , value: 1 })).to.equal('(TRUE)')
  })

  it('should comment with symbol', () => {
    const comment = commentToSQL({ keyword: 'comment', value: { type: 'string', value: '123'}, symbol: '='})
    expect(comment).to.equal("COMMENT = '123'")
  })

  it('should support default back quote', () => {
    process.env.NODE_SQL_PARSER_OPT = '{"database": "default"}'
    expect(identifierToSql('db')).to.be.equal('`db`')
    process.env.NODE_SQL_PARSER_OPT = '{}'
    expect(identifierToSql('db')).to.be.equal('`db`')
  })
})
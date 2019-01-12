const fs = require('fs')
const solc = require('solc')

const contractFile = "./constracts/CrowdFunding.sol"
const contractName = ":FundingFactory"

console.log('read contract file...')
let sourceCode = fs.readFileSync(contractFile, 'utf8')
console.log('compiling contract...')
let compiledContract = solc.compile(sourceCode, 1)
console.log('export compiledContract...')
module.exports = compiledContract.contracts[contractName]

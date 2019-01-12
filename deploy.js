const HDWalletProvider = require("truffle-hdwallet-provider")
const Web3 = require("web3")
const {bytecode, interface} = require("./compile.js")

const terms = "inject stock easy learn repair fringe damage crawl cruise junior enable remember"
const endPoint = "https://ropsten.infura.io/v3/ba7794faf4cd4b27894283a1ded74631"

let provider = new HDWalletProvider(terms, endPoint)
let web3 = new Web3()
web3.setProvider(provider)

console.log("abi:", interface)
let contract = new web3.eth.Contract(JSON.parse(interface))

async function deploy() {
	try {
		let accounts = await web3.eth.getAccounts()
		console.log('deploying contract...');
		let instance = await contract.deploy({
			data : bytecode,
		}).send({
			from : accounts[0],
			gas : "3000000",
		})
		console.log("address:", instance.options.address)
	}
	catch(e) {
		console.log(e)
	}
}

deploy()

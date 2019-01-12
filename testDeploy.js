const Web3 = require("web3")
const {bytecode, interface} = require("./compile.js")

const testAccount = "0x73De32223A68Ef50eE692164B4F17a32F3C3d57B"
const testProvider = "http://127.0.0.1:8545"

let web3 = new Web3()
web3.setProvider(testProvider)

console.log("abi:", interface)
let contract = new web3.eth.Contract(JSON.parse(interface))

async function deploy() {
	try {
		console.log('deploying contract...');
		let instance = await contract.deploy({
			data : bytecode,
		}).send({
			from : testAccount,
			gas : "3000000",
		})
		console.log("address:", instance.options.address)
	}
	catch(e) {
		console.log(e)
	}
}

deploy()

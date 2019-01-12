import {factoryInstance, newFundingInstance} from './instance'
import web3 from '../utils/InitWeb3'

let getFundingDetails = async (index) => {
	let accounts = await web3.eth.getAccounts()

	let currentFundings = []
	if (index === 1) {
		currentFundings = await factoryInstance.methods.getAllFundings().call({
			from: accounts[0]
		})
	} else if (index === 2) {
		currentFundings = await factoryInstance.methods.getCreatorFundings().call({
			from: accounts[0]
		})
	} else if (index === 3) {
		currentFundings = await factoryInstance.methods.getSupportorFunding().call({
			from: accounts[0]
		})
	} else {
	}

	let detailsPromises = currentFundings.map(function (fundingAddress) {
		return new Promise(async (resolve, reject) => {
			try {
				let newInstance = newFundingInstance()
				newInstance.options.address = fundingAddress

				let manager = await newInstance.methods.manager().call()
				let projectName = await newInstance.methods.projectName().call()
				let targetMoney = await newInstance.methods.targetMoney().call()
				let supportMoney = await newInstance.methods.supportMoney().call()
				let leftTime = await newInstance.methods.getLeftTime().call()
				let balance = await newInstance.methods.getBalance().call()
				let investorCount = await newInstance.methods.getInvestorsCount().call()

				let detail = {
					fundingAddress,
					manager,
					projectName,
					targetMoney,
					supportMoney,
					leftTime,
					balance,
					investorCount
				}
				resolve(detail)
			} catch (e) {
				reject(e)
			}
		})
	})
	let detailInfo = Promise.all(detailsPromises)
	return detailInfo
}

let createFunding = (projectName, targetMoney, supportMoney, duration) => {
	return new Promise(async (resolve, reject) => {
		try {
			let accounts = await web3.eth.getAccounts()
			let res = await factoryInstance.methods.createFunding(projectName, targetMoney, supportMoney, duration).send({
				from: accounts[0],
			}
			)
			resolve(res)
		} catch (e) {
			reject(e)
		}
	})
}

let handleInvestFunc = (fundingAddress, supportMoney) => {
	return new Promise(async (resolve, reject) => {
		try {
			let fundingInstance = newFundingInstance()
			fundingInstance.options.address = fundingAddress
			let accounts = await web3.eth.getAccounts()
			let res = await fundingInstance.methods.invest().send({
				from: accounts[0],
				value: supportMoney,
			}
			)
			resolve(res)
		} catch (e) {
			reject(e)
		}
	})
}

const createRequest = (fundingAddress, purpose, cost, seller) => {
	return new Promise(async (resolve, reject) => {
		try {
			let accounts = await web3.eth.getAccounts();

			let fundingContract = newFundingInstance();
			fundingContract.options.address = fundingAddress;

			let result = await fundingContract.methods.createRequest(purpose, cost, seller).send({
				from: accounts[0],
			});

			resolve(result);
		} catch (e) {
			reject(e);
		}
	})
}


const showRequests = (fundingAddress) => {
	return new Promise(async (resolve, reject) => {
		try {
			let accounts = await web3.eth.getAccounts();
			let fundingContract = newFundingInstance()
			fundingContract.options.address = fundingAddress;
			let requestCount = await fundingContract.methods.getRequestsCount().call({
				from: accounts[0],
			});

			let requestDetails = [];
			for (let i = 0; i < requestCount; i++) {
				let requestDetail = await fundingContract.methods.getRequestByIndex(i).call({
					from: accounts[0],
				});

				requestDetails.push(requestDetail);
			}
			resolve(requestDetails);
		} catch (e) {
			reject(e);
		}
	})
}

const approveRequest = (fundingAddress, index) => {

	return new Promise(async (resolve, reject) => {
		try {
			const accounts = await web3.eth.getAccounts();
			const contract = newFundingInstance()
			contract.options.address = fundingAddress;

			const result = await contract.methods.approveRequest(index).send({
				from: accounts[0],
			});

			console.log('result :', result);

			resolve(result);
		} catch (e) {
			reject(e);
		}
	})
};

const finalizeRequest = (fundingAddress, index) => {

	return new Promise(async (resolve, reject) => {
		try {
			const accounts = await web3.eth.getAccounts();
			const contract = newFundingInstance()
			contract.options.address = fundingAddress;

			const result = await contract.methods.finalizeRequest(index).send({
				from: accounts[0],
			});

			console.log('result :', result);

			resolve(result);
		} catch (e) {
			reject(e);
		}
	})
};

export {
	getFundingDetails,
	createFunding,
	handleInvestFunc,
	createRequest,
	showRequests,
	approveRequest,
	finalizeRequest,
}

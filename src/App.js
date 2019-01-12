import React, {Component} from 'react';
import web3 from './utils/InitWeb3'
import {factoryInstance} from './eth/instance'
import TabCenter from "./display/TabCenter";

class App extends Component {
	constructor() {
		super()
		this.state = {
			currentAccount:'',
		}
	}

	async componentWillMount() {
		let accounts = await web3.eth.getAccounts()
		this.setState({
			currentAccount: accounts[0]
		})
	}

	render() {
		return (
			<div>
				<h1>众筹</h1>
				<p>当前账户: {this.state.currentAccount}</p>
				<TabCenter/>
			</div>
		);
	}
}

export default App;

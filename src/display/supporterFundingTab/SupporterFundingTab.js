import React, {Component} from 'react';
import {approveRequest, getFundingDetails, showRequests} from '../../eth/interaction'
import CardList from "../common/CardList";
import RequestTable from "../common/RequestTable";
import {Button} from 'semantic-ui-react'

class SupporterFundingTab extends Component {

	state = {
		supporterFundingDetails: [],
		seletedFundingDetail: '',
		requests: [],
	}

	async componentWillMount() {
		let supporterFundingDetails = await getFundingDetails(3)
		console.log('xxxx', supporterFundingDetails)


		this.setState({
			supporterFundingDetails
		})
	}

	onCardClick = (seletedFundingDetail) => {
		console.log("ccc :", seletedFundingDetail)

		this.setState({
			seletedFundingDetail
		})
	}

	handleShowRequests = async () => {
		let fundingAddress = this.state.seletedFundingDetail.fundingAddress
		try {
			let requests = await showRequests(fundingAddress)
			console.log('requests:', requests)
			this.setState({requests})

		} catch (e) {
			console.log(e)
		}
	}

	handleApprove = async (index) => {
		console.log('批准按钮点击!', index)
		try {
			let res = await approveRequest(this.state.seletedFundingDetail.fundingAddress, index)
		} catch (e) {
			console.log(e)
		}

	}

	render() {
		let {supporterFundingDetails, seletedFundingDetail, requests} = this.state
		return (
			<div>
			<CardList details={supporterFundingDetails}
			onCardClick={this.onCardClick}
			/>
			{
				seletedFundingDetail && (<div>
					<Button onClick={this.handleShowRequests}>申请详情</Button>
					<RequestTable requests={requests}
					handleApprove={this.handleApprove}
					pageKey={3}
					/>
					</div>)
			}
			</div>
		)
	}
}

export default SupporterFundingTab

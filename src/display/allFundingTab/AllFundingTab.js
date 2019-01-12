import React, {Component} from 'react';
import {getFundingDetails, handleInvestFunc} from '../../eth/interaction'
import CardList from "../common/CardList";
import {Dimmer, Form, Label, Loader, Segment} from 'semantic-ui-react'

class AllFundingTab extends Component {

    state = {
        active: false,
        allFundingDetails: [],
        seletedFundingDetail: '',
    }

    async componentWillMount() {
        //funding地址的数组
        let allFundingDetails = await getFundingDetails(1)
        // console.table(creatorFundingDetails)
        console.log('xxxx', allFundingDetails)


        this.setState({
            allFundingDetails
        })
    }

    //传递一个回调函数给CardList，将所选择的Card的详细信息返回来
    onCardClick = (seletedFundingDetail) => {
        console.log("aaa :", seletedFundingDetail)

        this.setState({
            seletedFundingDetail
        })
    }

    handleInvest = async () => {
        let {fundingAddress, manager, projectName, targetMoney, supportMoney, leftTime, balance, investorCount} = this.state.seletedFundingDetail
        //需要传递选中合约地址
        //创建合约实例，参与众筹（send, 别忘了value转钱）
        this.setState({active: true})

        try {
            let res = await handleInvestFunc(fundingAddress, supportMoney)
            this.setState({active: false})
            console.log('1111111')

        } catch (e) {

            this.setState({active: false})
            console.log(e)
        }
    }


    render() {
        let {fundingAddress, manager, projectName, targetMoney, supportMoney, leftTime, balance, investorCount} = this.state.seletedFundingDetail
        return (
            <div>
                <CardList details={this.state.allFundingDetails} onCardClick={this.onCardClick}/>
                <div>
                    <h3>参与众筹</h3>
                    <Dimmer.Dimmable as={Segment} dimmed={this.state.active}>
                        <Dimmer active={this.state.active} inverted>
                            <Loader>支持中</Loader>
                        </Dimmer>
                        <Form onSubmit={this.handleInvest}>
                            <Form.Input type='text' value={projectName || ''} label='项目名称:'/>
                            <Form.Input type='text' value={fundingAddress || ''} label='项目地址:'/>
                            <Form.Input type='text' value={supportMoney || ''} label='支持金额:'
                                        labelPosition='left'>
                                <Label basic>￥</Label>
                                <input/>
                            </Form.Input>

                            <Form.Button primary content='参与众筹'/>
                        </Form>
                    </Dimmer.Dimmable>
                </div>
            </div>
        )
    }
}

export default AllFundingTab

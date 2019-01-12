pragma solidity ^0.4.24;
import "./SupporterFundingConstact.sol";

contract Funding {

	enum RequstStatus {
		Voting,
		Approved,
		Completed
	}

	struct Request {
		string purpose;
		uint256 cost;
		address seller;
		uint256 approveCount;
		RequstStatus status;
		mapping(address=>bool) isVotedMap;
	}

	address public manager;
	string public projectName;
	uint256 public targetMoney;
	uint256 public supportMoney;
	uint256 public duration;
	uint256 public endTime;
	address[] investors;
	mapping(address=>bool) isInvestorMap;
	SupporterFundingContract supporterFundings;
	Request[] allRequests;

	constructor(address _creator, string _projectName, uint256 _targetMoney, uint256 _supportMoney, uint256 _duration, SupporterFundingContract _supporterFundings) public {
		manager = _creator;
		projectName = _projectName;
		targetMoney = _targetMoney;
		supportMoney = _supportMoney;
		duration = _duration;
		endTime = block.timestamp + duration;
		supporterFundings = _supporterFundings;
	}

	modifier onlyManager {
		require(msg.sender == manager);
		_;
	}

	function getBalance() public view returns(uint256) {
		return address(this).balance;
	}

	function getLeftTime() public view returns(uint256) {
		return endTime - block.timestamp;
	}

	function invest() payable public {
		require(!isInvestorMap[msg.sender]);
		require(msg.value == supportMoney);
		investors.push(msg.sender);
		isInvestorMap[msg.sender] = true;
		supporterFundings.setFunding(msg.sender, this);
	}

	function refund() onlyManager public {
		for (uint256 i= 0; i< investors.length ; ++i) {
			address investor = investors[i];
			investor.transfer(supportMoney);
			delete(isInvestorMap[investor]);
			//supportorFundings.unsetFunding(investor, this);
		}
		delete investors;
	}

	function getInvestors() public view returns(address[]) {
		return investors;
	}

	function getInvestorsCount() public view returns(uint256) {
		return investors.length;
	}

	function createRequest(string _purpose, uint256 _cost, address _seller) onlyManager public {
		Request memory req = Request({
			purpose : _purpose,
			cost: _cost,
			seller: _seller,
			approveCount : 0,
			status : RequstStatus.Voting
		});
		allRequests.push(req);
	}

	function approveRequest(uint256 i) public {
		require(isInvestorMap[msg.sender]);
		Request storage req = allRequests[i];
		require(!req.isVotedMap[msg.sender]);
		++req.approveCount;
		req.isVotedMap[msg.sender] = true;
	}

	function finalizeRequest(uint256 i) onlyManager public {
		Request storage req = allRequests[i];
		require(req.approveCount * 2 > investors.length);
		require(address(this).balance >= req.cost);
		req.seller.transfer(req.cost);
		req.status = RequstStatus.Completed;
	}

	function getRequestByIndex(uint256 i) public view returns(string, uint256, address, uint256, RequstStatus) {
		Request memory req = allRequests[i];
		return (req.purpose, req.cost, req.seller, req.approveCount, req.status);
	}

	function getRequestsCount() public view returns(uint256) {
		return allRequests.length;
	}
}

pragma solidity ^0.4.24;
import "./Funding.sol";
import "./SupporterFundingConstact.sol";

contract FundingFactory {
	address public platformManager;
	address[] allFundings;
	mapping(address => address[]) creatorFundings;
	SupporterFundingContract supporterFundings;

	constructor() public {
		platformManager = msg.sender;
		supporterFundings = new SupporterFundingContract();
	}

	function createFunding(string _fundingName, uint _targetMoney, uint _supportMoney, uint _duration) public {
		address funding = new Funding(msg.sender, _fundingName, _targetMoney, _supportMoney, _duration, supporterFundings);
		allFundings.push(funding);
		creatorFundings[msg.sender].push(funding);
	}

	function getAllFundings() public view returns (address[]) {
		return allFundings;
	}

	function getCreatorFundings() public view returns (address[]) {
		return creatorFundings[msg.sender];
	}

	function getSupportorFunding() public view returns (address[]) {
		return supporterFundings.getFundings(msg.sender);
	}
}

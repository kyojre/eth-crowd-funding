pragma solidity ^0.4.24;

contract SupporterFundingContract {
	mapping(address => address[]) supporterFundingsMap;

	function setFunding(address _supporter, address _funding) public {
		supporterFundingsMap[_supporter].push(_funding);
	}

	function getFundings(address _supporter) public view returns (address[]) {
		return supporterFundingsMap[_supporter];
	}
}
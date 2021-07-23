// SPDX-License-Identifier: MIT
pragma solidity >=0.4.11 <0.9.0;

contract FdContract_v1 {

  event NewPolicy(uint policyId);

  struct Policy {
    // uint id;
    address policyholder;
    address insurer;
    uint riskFactor;
    uint256 premium;
    uint256 maxClaimAmount;
    uint status; // 0-onTime; 1-Delayed; 5-Pending
    uint delayTime;
  }

  Policy[] public policies;

  mapping(uint => address) public policyToPolicyholder;
  mapping(uint => address) public policyToInsurer;
  mapping(address => uint) public policyholderPolicyCount;
  mapping(address => uint) public insurerPolicyCount;

  // map the policyId to the Policy class (Policy(id))
  mapping(uint => Policy) public idToPolicy;
  mapping(address => uint256) public retirosPendientes;

  function createNewPolicy(uint riskFactor) payable public {

    address _policyholder = msg.sender;
    address _insurer = address(0);
    uint _premium = msg.value;

    // uint uniqueId = _generateUniqueId(_policyholder);
    // Policy memory thePolicy = Policy(_policyholder, _insurer, riskFactor, _premium, 0, 5, 90);
    
    policies.push(Policy(_policyholder, _insurer, riskFactor, _premium, 0, 5, 90));
    uint id = policies.length;

    emit NewPolicy(id);
    
  }

  function getPolicies() public view returns(Policy[] memory) {
    return policies;

  }

  // function _generateUniqueId(address policyholder) private view returns(uint) {
  //   // sould form a {addres+timestamp} string like "0xfdn8198yfew6f546effxw5er+10:05:am"
  //   uint rand = uint(keccak256(abi.encodePacked(block.timestamp)));

  // }



}

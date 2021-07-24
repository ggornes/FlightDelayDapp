// SPDX-License-Identifier: MIT
pragma solidity >=0.4.11 <0.9.0;

contract FdContract {
    
  struct Policy {
      uint id;
      address policyholder;
      address insurer;
      uint riskFactor;
      uint premium;
      uint maxClaimAmount;
      uint status; // 0-onTime; 1-Delayed; 5-Pending
      uint delayTime; // default 90
    }
    
    event submitNewPolicy(uint indexed _id);
    

    // instance of a Policy with default values
    Policy private blankPolicy;
    
    // array to store policies.
    Policy[] public policies;
    
    constructor() public {
        blankPolicy.delayTime = 90;
        blankPolicy.status = 5;
    }
    

    
    function newPolicy(uint _riskFactor) public payable {
        Policy memory new_policy = blankPolicy;
        new_policy.id = policies.length + 1;
        new_policy.riskFactor = _riskFactor;
        new_policy.premium = msg.value;
        new_policy.policyholder = msg.sender;
        new_policy.maxClaimAmount = new_policy.premium * 6 * new_policy.riskFactor / 10000;
        
        
        policies.push(new_policy);
        
        emit submitNewPolicy(new_policy.id);
    }
    
    
    
    function insurePolicy(uint _id) public payable {
        
        uint _index = _id - 1;
        
        Policy memory submittedPolicy = policies[_index];
        uint _maxClaimAmount = msg.value;
        
        require(submittedPolicy.id == _id);
        require(submittedPolicy.insurer == address(0));
        require(submittedPolicy.policyholder != msg.sender);
        require(submittedPolicy.maxClaimAmount == _maxClaimAmount);
        
        submittedPolicy.insurer = msg.sender; // override address(0) (default insurer address) with real insurer address
        submittedPolicy.maxClaimAmount = _maxClaimAmount;
        
        // update values
        policies[_index] = submittedPolicy;
        
    }

    // Note: ideally data could be requested from client side to a subgraph that queries the blockchain directly
    //       but for now, we can request this data directly from the contract.
    function getPolicies() public view returns(Policy[] memory) {
        return policies;
    }
    

}
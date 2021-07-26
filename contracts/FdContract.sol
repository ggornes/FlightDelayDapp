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
      Status flightStatus; // 0-onTime; 1-Delayed; 5-Pending
      DelayTime delayTime; // default 90
    }

    enum DelayTime {
        OnTime,
        Late,
        VeryLate,
        Excessive,
        Canceled
    }
    
    enum Status {
        OnTime,
        Delayed,
        Pending
    }

    mapping(address => uint) public withdrawalAmount;
    
    event submitNewPolicy(uint indexed _id);

    event issuePolicy(uint indexed _id);

    uint maxMultiplier = 5;
    

    // instance of a Policy with default values
    Policy private blankPolicy;
    
    // array to store policies.
    Policy[] public policies;
    
    constructor() public {
        blankPolicy.delayTime = DelayTime.OnTime;
        blankPolicy.flightStatus = Status.Pending;
    }
    

    
    function newPolicy(uint _riskFactor) public payable {
        Policy memory new_policy = blankPolicy;
        new_policy.id = policies.length + 1;
        new_policy.riskFactor = _riskFactor;
        new_policy.premium = msg.value;
        new_policy.policyholder = msg.sender;
        new_policy.maxClaimAmount = new_policy.premium * maxMultiplier * new_policy.riskFactor / 10000;
        
        
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

        emit issuePolicy(submittedPolicy.id);
        
    }


    function setPolicyOutcome(uint _id, DelayTime randomDelayTime) public payable {
        uint _index = _id - 1;
        Policy memory currentPolicy = policies[_index];
        uint multiplier = 0;
        
        require(currentPolicy.flightStatus == Status.Pending);

        if (randomDelayTime == DelayTime.OnTime) {
            currentPolicy.flightStatus = Status.OnTime;
        } else {
            currentPolicy.flightStatus = Status.Delayed;
            multiplier = getMultiplier(randomDelayTime);
            currentPolicy.delayTime = randomDelayTime;

        }
        
        if (currentPolicy.flightStatus != Status.Pending && currentPolicy.insurer == address(0)) {
            // if the policy was submitted but never issued and the event finished
            // the policyholder should receive the premium back
            withdrawalAmount[currentPolicy.policyholder] += currentPolicy.premium;
        } else {
            if (currentPolicy.flightStatus == Status.Delayed) {
                withdrawalAmount[currentPolicy.policyholder] += currentPolicy.premium * multiplier/10 * currentPolicy.riskFactor/10000;
                withdrawalAmount[currentPolicy.insurer] += currentPolicy.maxClaimAmount + currentPolicy.premium - currentPolicy.premium * multiplier/10 * currentPolicy.riskFactor/10000;
            } else {
                withdrawalAmount[currentPolicy.insurer] += currentPolicy.premium + currentPolicy.maxClaimAmount;
            }
        }

        payable(currentPolicy.policyholder).transfer(withdrawalAmount[currentPolicy.policyholder]);
        payable(currentPolicy.insurer).transfer(withdrawalAmount[currentPolicy.insurer]);

        // update values    
        policies[_index] = currentPolicy;
        

    }

    function getMultiplier(DelayTime dt) pure private returns(uint) {
        uint multiplier = 0;
        if (dt != DelayTime.OnTime) {
            if (dt == DelayTime.Late) {
                multiplier = 20;
            } else {
                if (dt == DelayTime.VeryLate) {
                    multiplier = 30;
                } else {
                    if (dt == DelayTime.Excessive) {
                        multiplier = 40;
                    } else {
                        multiplier = 60;
                    }
                }
            }
        }
        return multiplier;
    }



    // Note: ideally data could be requested from client side to a subgraph that queries the blockchain directly
    //       but for now, we can request this data directly from the contract.
    function getPolicies() public view returns(Policy[] memory) {
        return policies;
    }



    
}
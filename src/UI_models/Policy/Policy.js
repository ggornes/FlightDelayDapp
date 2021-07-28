// import schemas from "./schemas";
import schemas from "./schemas"
// var schemas = require("./schemas.js");
import { ethers } from 'ethers'

var Policy = function (data) {
    console.log('data: ', data)
    this.data = this.sanitize(data);
    // this.data = data;
    // this.id = data[0].id.toNumber();
}

Policy.prototype.data = {}

Policy.prototype.sanitize = function (data) {
    data = data || {};
    const id = data.id.toNumber();
    const policyholder = data.policyholder.toString();
    const insurer = data.insurer.toString();
    const riskFactor = data.riskFactor.toString();
    const premium = ethers.utils.formatEther(data.premium);
    const maxClaimAmount = ethers.utils.formatEther(data.maxClaimAmount);
    const status = data.flightStatus.toString();
    const delayTime = data.delayTime.toString();
    return({
        id,
        policyholder,
        insurer,
        riskFactor,
        premium,
        maxClaimAmount,
        status,
        delayTime
    })
    // schema = schemas.policy;
    // return _.pick(_.defaults(data, schema), _.keys(schema)); 
}

export default Policy;
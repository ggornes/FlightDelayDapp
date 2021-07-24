// import schemas from "./schemas";
import schemas from "./schemas"
// var schemas = require("./schemas.js");

var Policy = function (data) {
    this.data = this.sanitize(data);
    // this.data = data;
    // this.id = data[0].id.toNumber();
}

Policy.prototype.data = {}

Policy.prototype.sanitize = function (data) {
    data = data || {};
    const id = data[0].id.toNumber();
    const policyholder = data[0].policyholder.toString();
    const insurer = data[0].insurer.toString();
    const riskFactor = data[0].riskFactor.toString();
    const premium = data[0].premium.toString();
    const maxClaimAmount = data[0].maxClaimAmount.toString();
    const status = data[0].status.toString();
    const delayTime = data[0].delayTime.toString();
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
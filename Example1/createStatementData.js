//@ts-check

const result = {
    customer: {},
    plays: [],
    performances: {},
    totalAmount: 0,
    totalVolumeCredits: 0
};

/**
 * 
 * @param {Object} invoice 
 * @param {Object} plays 
 * @returns {Object}
 */
export default function createStatementData(invoice, plays) {
    result.customer = invoice.customer,
    result.plays = plays;
    result.performances = invoice.performances.map(enrichPerformance);
    result.totalAmount = totalAmount();
    result.totalVolumeCredits = totalVolumeCredits();

    return result;
}

/**
 * 
 * @param {Object} aPerformance 
 * @returns {Object}
 */
function enrichPerformance(aPerformance) {
    const result = {...aPerformance};
    result.play = playFor(result);
    result.amount = amountFor(result);
    result.volumeCredits = volumeCreditsFor(result);

    return result;
}

/**
 * 
 * @returns {Number}
 */
function totalAmount() {
   return result.performances
       .reduce((total, p) => total + p.amount, 0);
}

/**
 * 
 * @returns {Number}
 */
function totalVolumeCredits() {
   return result.performances
       .reduce((total, p) => total + p.volumeCredits, 0);
}

/**
 * 
 * @param {Object} aPerformance 
 * @returns {Object}
 */
function playFor(aPerformance) {
    return result.plays[aPerformance.playID];
}

/**
 * 
 * @param {Object} aPerformance 
 * @returns {Number}
 */
function amountFor(aPerformance) {
    let result = 0;

    switch (aPerformance.play.type) {
        case "tragedy":
            result = 40000;
            if (aPerformance.audience > 30) {
                result += 10000 + 500 * (aPerformance.audience - 20);
            }
            result += 300 * aPerformance.audience;
            break;
        case "comedy":
            result = 30000;
            if (aPerformance.audience > 30) {
                result += 10000 + 500 * (aPerformance.audience - 20);
            }
            result += 300 * aPerformance.audience;
            break;
        default:
            throw new Error(`unknown type: ${aPerformance.play.type}`);
    }

    return result;
}

/**
 * 
 * @param {Object} perf 
 * @returns {Number}
 */
function volumeCreditsFor(perf) {
    let result = 0;
    result += Math.max(perf.audience - 30, 0);

    if ("comedy" === perf.play.type) result += Math.floor(perf.audience / 5);

    return result;
}

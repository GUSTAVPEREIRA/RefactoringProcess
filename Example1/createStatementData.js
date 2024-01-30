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
    result.customer = invoice.customer;
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
    const calculator = createPerformanceCalculator(aPerformance, playFor(aPerformance));
    const result = { ...aPerformance };
    result.play = calculator.play;
    result.amount = calculator.amount;
    result.volumeCredits = calculator.volumeCredits;

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

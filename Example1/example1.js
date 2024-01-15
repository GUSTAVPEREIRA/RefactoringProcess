const data = {
    customer: null,
    performances: null,
    plays: null
};

function statement(invoice, plays) {
    
    data.customer = invoice.customer,
    data.plays = plays;
    data.performances = invoice.performances.map(enrichPerformance);
    data.totalAmount = totalAmount(data);
    data.totalVolumeCredits = totalVolumeCredits(data);

    return renderPlainText(data);
}

function enrichPerformance(aPerformance) {
    const result = Object.assign({}, aPerformance)
    result.play = playFor(result);
    result.amount = amountFor(result);
    result.volumeCredits = volumeCreditsFor(result);

    return result;
}

function renderPlainText(data) {
    let result = `Statement for ${data.customer}\n`;

    for (let perf of data.performances) {
        result += ` ${perf.play.name}: ${usd(perf.amount)} (${perf.audience} seats)`;
    }

    result += `Amount owed is ${usd(data.totalAmount)}\n`;
    result += `You earned ${data.totalVolumeCredits} credits`;

    return result;
}

function totalAmount() {
    return data.performances
        .reduce((total, p) => total + p.amount, 0);
}

function totalVolumeCredits() {
    
    return data.performances
        .reduce((total, p) => total + p.volumeCredits, 0);
}

function usd(aNumber) {
    return new Intl.NumberFormat("en-US", {
        style: "currency", currency: "USD", minimumFractionDigits: 2
    }).format(aNumber / 100);
}

function volumeCreditsFor(perf) {
    let result = 0;
    result += Math.max(perf.audience - 30, 0);

    if ("comedy" === perf.play.type) result += Math.floor(perf.audience / 5);

    return result;
}


function playFor(aPerformance) {
    return data.plays[aPerformance.playID];
}

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
let example1 = {};
example1.plays = "";
example1.invoice = "";

function statement(invoice, plays) {
    example1.plays = plays;
    example1.invoice = invoice;
    let result = `Statement for ${invoice.customer}\n`;
    
    result += `Amount owed is ${usd(totalAmount() / 100)}\n`;
    result += `You earned ${totalVolumeCredits()} credits\n`;

    return result;
}

function totalAmount() {
    let result = 0;

    for (let perf of example1.invoice.performances) {
        result += amountFor(perf);
    }

    return result;
}

function totalVolumeCredits() {
    let result = 0;
    
    for (let perf of example1.invoice.performances) {
        result += volumeCreditsFor(perf);
    }
    
    return result;
}

function usd(aNumber) {
    return new Intl.NumberFormat("en-US", {
        style: "currency", currency: "USD", minimumFractionDigits: 2
    }).format(aNumber);
}

function volumeCreditsFor(perf) {
    let result = 0;
    result += Math.max(perf.audience - 30, 0);

    if ("comedy" === playFor(perf).type) result += Math.floor(perf.audience / 5);

    return result;
}


function playFor(aPerformance) {
    return example1.plays[aPerformance.playID];
}

function amountFor(aPerformance) {
    let result = 0;

    switch (playFor(aPerformance).type) {
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
            throw new Error(`unknown type: ${playFor(aPerformance).type}`);
    }

    return result;
}
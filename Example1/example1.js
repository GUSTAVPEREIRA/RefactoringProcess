let example1 = {};
example1.plays = "";

function statement(invoice, plays) {
    example1.plays = plays;
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`;

    const format = new Intl.NumberFormat("en-Us", {
        style: "currency", currency: "USD", minimumFractionDigits: 2
    }).format;

    for (let perf of invoice.performances) {
        const play = playFor(perf);

        let thisAmount = amountFor(perf, play)

        volumeCredits += Math.max(perf.audience - 30, 0);

        if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);

        result += `${play.name}: ${format(thisAmount / 100)} (${perf.audience} seats)\n`;
        totalAmount += thisAmount;
    }

    result += `Amount owed is ${format(totalAmount / 100)}\n`;
    result += `You earned ${volumeCredits} credits\n`;

    return result;
}

function playFor(aPerformance) {
    return example1.plays[aPerformance.playID];
}

function amountFor(aPerformance, play) {
    let result = 0;

    switch (play.type) {
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
            throw new Error(`unknown type: ${play.type}`);
    }

    return result;
}
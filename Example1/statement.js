//@ts-check

import createStatementData from './createStatementData.js';

/**
 * 
 * @param {Object} invoice 
 * @param {Object} plays 
 * @returns {string}
 */
export function statement(invoice, plays) {

    return renderPlainText(createStatementData(invoice, plays));
}

/**
 * 
 * @param {Object} invoice 
 * @param {Object} plays 
 * @returns {string}
 */
export function htmlStatement(invoice, plays) {
    return renderHtml(createStatementData(invoice, plays));
}

/**
 * 
 * @param {Object} data 
 * @returns {string}
 */
function renderHtml(data) {

    let result = `<h1>Statement for ${data.customer}</h1>\n`;
    result += "<table>\n";
    result += "<tr><th>play</th><th>seats</th><th>cost</th></tr>";
    for (let perf of data.performances) {
        result += `<tr><td>${perf.play.name}</td><td>${perf.audience}</td>`;
        result += `<td>${usd(perf.amount)}</td></tr>`;
    }

    result += "</table>\n";
    result += `<p>Amount owed is <em> ${usd(data.totalAmount)}</em></p>\n`
    result += `<p>You earned <em> ${data.totalVolumeCredits}</em> credits</p>\n`
    
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


function usd(aNumber) {
    return new Intl.NumberFormat("en-US", {
        style: "currency", currency: "USD", minimumFractionDigits: 2
    }).format(aNumber / 100);
}

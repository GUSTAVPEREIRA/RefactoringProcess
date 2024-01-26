function createPerformanceCalculator(aPerformance, aPlay) {

    switch (aPlay.type) {
        case "tragedy": return new TragedyCalculator(aPerformance, aPlay);
        case "comedy": return new ComedyCalculator(aPerformance, aPlay);
        default: throw new Error(`unknown type: ${aPlay.type}`);
    }
}
class PerformanceCalculator {

    performance = {};
    play = {};

    /**
     * 
     * @param {object} aPerformance 
     */
    constructor(aPerformance, aPlay) {
        this.performance = aPerformance;
        this.play = aPlay;
    }


    get amount() {
        throw new Error('sublcass responsability');
    }

    get volumeCredits() {
        return Math.max(this.performance.audience - 30, 0);
    }

}
var methods = [];

methods.push({
    name: "Graham Conitions Met",
    calc: (data) => {
        const N = 5;
        
        let getMaxYear = (a, b) => Math.max(a,b);
        let currentYear = new Date().getFullYear();

        let dividends = JSON.parse(data.DividendJson);
        let earnings = JSON.parse(data.EarningsJson);

        let maxYearDividends = dividends.map((d) => d.year).reduce(getMaxYear);
        let dividendsLastNYears = dividends.filter((d) => d.year >= maxYearDividends - N + 1);

        let maxYearEarnings = earnings.map((e) => e.year).reduce(getMaxYear);
        let positiveEarningsLastNYears = earnings.filter((e) => e.year >= maxYearEarnings - N + 1 && e.value > 0);
        console.log(positiveEarningsLastNYears)
        let ret = {
            CurrentRatio: data.CurrentRatio >= 1.2,
            PE: data.PE <= 15,
            PBV: data.PBV <= 1.5,
            DividendNewest: maxYearDividends >= currentYear - 1,
            DividendsCount: dividendsLastNYears.length >= N,
            PositiveEarnings: positiveEarningsLastNYears.length >= N,
            EarningsGrowth: positiveEarningsLastNYears[0].value >= (positiveEarningsLastNYears[positiveEarningsLastNYears.length - 1].value * 1.2)
        }

        ret.Result = ret.CurrentRatio
            && ret.PE
            && ret.PBV
            && ret.DividendNewest
            && ret.DividendsCount
            && ret.PositiveEarnings
            && ret.EarningsGrowth;
        
        return ret;
    },
    useNumberFormatter: false
});

methods.push({
    name: "Graham Number",
    calc: (data) => {
        return Math.sqrt(data.EPS * data.BVPS * 15 * 1.5);
    },
    calcDifference: true,
    useNumberFormatter: true
});

module.exports = methods;
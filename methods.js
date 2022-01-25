var methods = [];

methods.push({
    name: "Graham Conitions Met",
    calc: (data) => {
        return data.CurrentRatio >= 1.2
            && data.PE <= 15
            && data.PBV <= 1.5;
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
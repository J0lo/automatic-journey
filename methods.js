var methods = {}

methods.grahamNumber = (data) => {
    return Math.sqrt(data.EPS * data.BVPS * 15 * 1.5);
}

module.exports = methods;
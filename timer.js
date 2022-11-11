const timer = ((req, res, next) => {
    const startTime = process.hrtime();

    res.on('finish', () => {
        const timeTaken = process.hrtime(startTime);
        const timeTakenInMs = timeTaken[0] * 1000 + timeTaken[1] / 1e6;
        console.log("Total time taken: " + timeTakenInMs + "ms");
    });
    next();
})

module.exports = timer;
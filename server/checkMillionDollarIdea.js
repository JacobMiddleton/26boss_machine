const checkMillionDollarIdea = (req, res, next) => {
    const { numWeeks, weeklyRevenue } = req.body;
    const profit = Number(numWeeks) * Number(weeklyRevenue);

    if (!numWeeks || !weeklyRevenue) {
        return res.status(400).send();
    } 
    if (isNaN(profit)) {
        return res.status(400).send();
    }

    if(isNaN(parseInt(numWeeks)) || isNaN(parseInt(weeklyRevenue)) ) {
        return res.status(400).send("Inputs must be a number!");
    } 

    if (profit < 1000000) {
        return res.status(400).send();
    } else {
        return next();
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;

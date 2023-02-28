const minionsRouter = require('express').Router();
const {
    createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase,
} = require('./db');

module.exports = minionsRouter;

minionsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'));
});
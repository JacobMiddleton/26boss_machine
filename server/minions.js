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

minionsRouter.post('/', (req, res, next) => {
    const minion = addToDatabase('minions', req.body);
    res.status(201).send(minion);
});

minionsRouter.get('/:minionId', (req, res, next) => {
    const minion = getFromDatabaseById('minions', req.params.minionId);
    if (minion) {
        res.send(minion);
    } else {
        res.status(404).send();
    }
});

minionsRouter.put('/:minionId', (req, res, next) => {
    const updatedMinion = updateInstanceInDatabase('minions', req.body);
    if (updatedMinion) {
        res.send(updatedMinion);
    } else {
        res.status(404).send();
    }
});

minionsRouter.delete('/:minionId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('minions', req.params.minionId);
    if (deleted) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});

// Bonus Challenge

minionsRouter.get('/:minionId/work', (req, res, next) => {
    const minionId = req.params.minionId;
    const minion = getFromDatabaseById('minions', req.params.minionId);
    if (isNaN(minionId)) {
        res.status(404).send();
    }
    const work = getAllFromDatabase('work').filter(item => {
        return item.minionId === minionId;
    });

    if (work && minion) {
        res.send(work);
    } else {
        res.status(404).send();
    }
});

minionsRouter.post('/:minionId/work', (req, res, next) => {
    const work = req.body;
    work.minionId = req.params.minionId;
    const minionWork = addToDatabase('work', work);
    res.status(201).send(minionWork);
});

minionsRouter.param('workId', (req, res, next, id) => {
    const work = getFromDatabaseById('work', id);
    if (work) {
        req.work = work;
        next();
    } else {
        res.status(404).send();
    }
})

minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
    if (req.params.minionId !== req.body.minionId) {
        res.status(400).send();
    } else {
        const updatedWork = updateInstanceInDatabase('work', req.body);
        res.send(updatedWork);
    }
});

minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('work', req.params.workId);
    if (deleted) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});
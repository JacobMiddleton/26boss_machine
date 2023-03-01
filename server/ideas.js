const ideasRouter = require('express').Router();
const checkMillionDollarIdea = require('./checkMillionDollarIdea');
const {
    createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase,
} = require('./db');

ideasRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('ideas'));
});

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const idea = addToDatabase('ideas', req.body);
    res.status(201).send(idea);
});

ideasRouter.get('/:ideaId', (req, res, next) => {
    const idea = getFromDatabaseById('ideas', req.params.ideaId);
    if (idea) {
        res.send(idea);
    } else {
        res.status(404).send();
    }
});

ideasRouter.put('/:ideaId', (req, res, next) => {
    const updatedIdea = updateInstanceInDatabase('ideas', req.body);
    if (updatedIdea) {
        res.send(updatedIdea);
    } else {
        res.status(404).send();
    }
});

ideasRouter.delete('/:ideaId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('ideas', req.params.ideaId);
    if (deleted) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }

});

module.exports = ideasRouter;
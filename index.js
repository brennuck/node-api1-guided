const express = require('express');

const Hubs = require('./data/hubs-model.js');

const server = express();

server.use(express.json());

server.get("/", function(req, res) {
    res.send({ hello: "Brennon!" })
})

server.get('/api/hubs', (req, res) => {
    Hubs.find() //return a promise
    .then(hubs => {
        res.status(200).json(hubs);
    })
    .catch(err => {
        console.log(err)

        res.status(500).json({ errorMessage: "Sorry, we ran into an error getting the list of hubs" })
    })
})

server.post('api/hubs', (req, res) => {
    const hubData = req.body;

    Hubs.add(hubData)
    .then(hub => {
        res.status(201).json(hub);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            errorMessage: "Sorry we ran into an error getting the list of hubs"
        })
    })
})

server.delete('/api/hubs/:id', (req, res) => {
    const id = req.params.id;

    Hubs.remove(id)
    // .then(() => {
    //     res.status(204).end()
    // })
    .then(res => {
        res.status(200).json(res)
    })
    .catch(error => {
        res.status(500).json({
            errorMessage: "Sorry we ran into an error deleting the list of hubs"
        })
    })
})

const port = 8000;
server.listen(port, () => {
    console.log(`api running on port: ${port}`)
})

// to run server: npm run server
// npm install sqlite3
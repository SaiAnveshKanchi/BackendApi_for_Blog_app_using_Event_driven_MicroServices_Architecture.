const express = require('express');
const bodyParser = require('body-parser');
const axios  = require('axios');

const app = express();
app.use(bodyParser.json());

const events = [];

app.post('/events',  (req,res) => {
    const event = req.body;

    events.push(event);

    axios.post('http://posts-clusterip-srv:2828/events',event).catch((err)=>{console.log(err);});
    axios.post('http://comments-srv:2803/events',event).catch((err)=>{console.log(err);});
    axios.post('http://query-srv:2800/events',event).catch((err)=>{console.log(err);});
    axios.post('http://moderation-srv:2801/events',event).catch((err)=>{console.log(err);});

    res.send({status : 'OK'});
})

app.get('/events',(req,res)=>{
    res.send(events);
})

app.listen(2823,() => {
    console.log('listening on 2823');
});
const express = require("express");
const app = express();
const cors= require('cors');
const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");

const data = require('./dataset2.json');

app.use(bodyParser.json());

app.use(cors())
app.get('/',(req,res)=>{
    res.send("hello all......");
});

function serverReply(input){
    input = input.toLowerCase();
    for(i of data.intents){
        for(pattern of i.patterns){
            if(input.includes(pattern.toLowerCase())){
                return i.responses[Math.floor(Math.random()*i.responses.length)];
            }
        }
    }
    return "Sorry, I dont't understand that!";
}

app.post('/query',(req,res)=>{
    let {query} = req.body;
    let reply = serverReply(query)
    res.json({response:reply});
})

app.listen(PORT,()=>{
    console.log("server connected on port ",PORT);
})

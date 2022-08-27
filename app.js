const express = require("express");
const kogpt2Controller = require("./controller/kogpt2Controller.js");
const app = express();
const port = 3000;

app.get("/", (req,res) => {
    res.send("Hello World!"); 
})

app.get("/guess", (req,res) => {
    const word = req.query.word;
    console.log(typeof(word));
    
    const alphabets = word.split('');

    kogpt2Controller.print(alphabets[1]);
    res.send(alphabets[0]);
    //res.send('word');
})

app.listen(port, () => {
    console.log(`서버가 실행됩니다. http://localhost:${port}`)
})

const express = require("express");
const path = require("path");
const cors = require('cors');
const ejs = require("ejs");
const kogpt2Controller = require("./controller/kogpt2Controller.js");
const app = express();
const port = 3000;
const corsOptions= {
    origin: 'http://localhost:3000'
}

app.get("/", (req,res) => {
    res.render("index", {
        resultString:''
    }); 
})

app.get("/guess", async (req,res) => {
    console.log(req.query);
    await kogpt2Controller.generateSentence(req.query.word).then((result)=>{
        res.render('index', {
            resultString : result
        });
    }).catch((err)=>{
        console.log(err);
        res.render('error');
    });
})

app.set("views", path.join(__dirname,"src"));
app.set("view engine", "ejs");
app.use(cors(corsOptions));
app.listen(port, () => {
    console.log(`서버가 실행됩니다. http://localhost:${port}`)
})
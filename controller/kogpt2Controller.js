const axios = require("axios");

module.exports = {
    print: function(a) {
        console.log(a);
    },
    
    getSentence: function(str) {
        
        axios({
            method: 'post',
            url: 'https://skt-kogpt2-text-generation-ainize-team.endpoint.ainize.ai/prediction/generate',
            headers: {
                'Content-Type' : 'application/json'
            },
            data: {
                text:str,
                max_new_tokens: 5,
                repetition_penalty: 2
            }
        })
        .then((res) => {
            console.log("in res");
            console.log(res.data);
        })
        .catch((err) => {
            console.log("in err")
            console.log(err);
        })
    } 
}
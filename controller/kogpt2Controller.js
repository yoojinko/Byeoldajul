const axios = require("axios");
const FormData = require('form-data');

module.exports = {
    print: function(a) {
        console.log(a);
    },
    
    getSentence: function(str) {

        var formData = new FormData();
        formData.append('context',str);
        formData.append('model','gpt2-story');
        formData.append('length','long');

        axios({
            method: 'post',
            url: 'https://kubecon-tabtab-ainize-team.endpoint.ainize.ai/gpt2',
            headers: {
                'Content-Type' : 'multipart/form-data'
            },
            data: {
                context:str,
                model: "gpt2-story",
                length: "short"
            }
        })
        .then((res) => {
            console.log("in res");
            console.log(res);
        })
        .catch((err) => {
            console.log("in err")
            console.log(err);
        })
    } 
}
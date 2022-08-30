const axios = require("axios");

module.exports = {
    print: function(a) {
        console.log(a);
    },
    
    generateSentence: async function(str) {
        const alphabets = str.split('');

        console.log(str);
        let resString = '';
        let paramString = '';
    
        for(const alph of alphabets) {
            paramString = resString + "\n" + alph;
            console.log(paramString);
            await this.getSentenceByAlph(paramString).then((res)=>{
                console.log(res);
                resString = res;
            })
            .catch((err) => {
                console.log(err);
            })
        }

        return resString;
    },

    getSentenceByAlph: async function(str) {
        //console.log("start");
        const result = await axios({
            method: 'post',
            url: 'https://skt-kogpt2-text-generation-ainize-team.endpoint.ainize.ai/prediction/generate',
            headers: {
                'Content-Type' : 'application/json'
            },
            data: {
                text:str,
                max_new_tokens: 7,
                repetition_penalty: 2
            }
        })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log("in err")
            console.log(err);
        })
        console.log('end');
        console.log(result);
        return result;
    } 
}
const axios = require("axios");

module.exports = {
    generateSentence: async function(str, size) {
        const alphabets = str.split('');

        let resString = '';
        let paramString = '';
        const sentSize = [];
        sentSize.push(-1);

        for(const alph of alphabets) {
            if(alph === ' ') continue;

            paramString = resString + " " + alph;
            await this.getSentenceByAlph(paramString, size).then((res)=>{
                resString = res;
                sentSize.push(resString.length)
        })
            .catch((err) => {
                console.log(err);
            })
        }
        
        const sentences = [];
        for(var i = 1; i <= sentSize.length; i++) {
            sentences.push(resString.substr(sentSize[i-1]+1, sentSize[i] - sentSize[i-1]))
        }
        
        let result = '';
        for(const sentence of sentences) {
            let first = '<b>'+sentence.substr(0,1)+'</b>';
            let elseStr = sentence.substr(1, sentence.length-1)+'<br>';
            result = result+first+elseStr;
        }

        return '<p>'+result+'</p>';
    },

    getSentenceByAlph: async function(str, size) {
        const result = await axios({
            method: 'post',
            url: 'https://skt-kogpt2-text-generation-ainize-team.endpoint.ainize.ai/prediction/generate',
            headers: {
                'Content-Type' : 'application/json'
            },
            data: {
                text:str,
                max_new_tokens: size,
                repetition_penalty: 1
            }
        })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log(err);
        })
        return result;
    } 
}
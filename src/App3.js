import React, { Component } from 'react'

class App3 extends Component{

    constructor(){
        super()
        this.recognitionLogic = this.recognitionLogic.bind(this)
    }

    recognitionLogic(){

        const speechRecogntion = window.webkitSpeechRecognition;
        const tr = require("googletrans").default
        var transcript;

        let p = document.createElement('p');
        document.getElementById('words').appendChild(p);

        const recognition = new speechRecogntion();
        recognition.interimResults = true;
        //recognition.lang = 'it-IT';

        recognition.onstart = function() {
            console.log('recognition start')
        }

        recognition.addEventListener('result', e => {
            transcript = Array.from(e.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('')
            console.log(transcript)
        })

        recognition.onspeechend = function(){
            tr(transcript, {to: 'en'})
                .then(function (result){
                    p.textContent = result.text;
                    console.log(result.text);
                    console.log(result.src)
                })
                .catch(function (error) {
                    console.log(error)
            });
            recognition.stop();
        }


        recognition.start();

    }

    render(){
        if(!('webkitSpeechRecognition' in window))
            return 'browser was not supported'
        else
            return (
                <div>
                    <button onClick={this.recognitionLogic}>Start recognition</button>
                    <div id='words'></div>
                </div>
            );
    }
}

export default App3;
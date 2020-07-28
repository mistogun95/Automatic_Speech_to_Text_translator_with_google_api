
import React, { Component } from 'react'

class App2 extends Component{

  recognitionLogic(){
    if(!('webkitSpeechRecognition' in window))
      return 'browser was not supported'

    const speechRecogntion = window.webkitSpeechRecognition;
    const tr = require("googletrans").default
    
    const recognition = new speechRecogntion();
    recognition.interimResults = true;
    recognition.lang = 'it-IT';

    let p = document.createElement('p');
    document.getElementById('words').appendChild(p);

    recognition.addEventListener('result', e => {
      console.log(e.results);
    });

    recognition.addEventListener('result', e => {
      const transcript = Array.from(e.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('')

      tr(transcript, {to: 'en'})
        .then(function (result){
          p.textContent = result.text;
          console.log(result.text);
          console.log(result.src)
        })
        .catch(function (error) {
          console.log(error)
        });

        if(e.results[0].isFinal){
          p = document.createElement('p');
          document.getElementById('words').appendChild(p);
        }

    })

    recognition.addEventListener('end', recognition.start);
    recognition.start();

  }

  render(){
    return (
      <div>
        <button onClick={this.recognitionLogic}>Start recognition</button>
        <div id='words'></div>
      </div>
    );
  }

}

export default App2;
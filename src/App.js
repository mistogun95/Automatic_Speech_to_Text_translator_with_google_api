
import React, {Component} from 'react';

/* to implement speech recognition we will make use of the SpeechRecognition api. For a Chrome browser we used webkitSpeechRecognition */
const SpeechRecognition = window.webkitSpeechRecognition 
const recognition = new SpeechRecognition()

const tr = require("googletrans").default

/* we set interim resoults on true because if we set it to false it will return after the user finisched to speak*/
recognition.continous = true
recognition.interimResoults = true
recognition.lang = 'it-IT'


class App extends Component{

  constructor(){
    super()
    this.state = {
      listening: false
    }
    this.toggleListen = this.toggleListen.bind(this)
    this.handleListen = this.handleListen.bind(this)
  }

  toggleListen(){
    this.setState({
      listening: !this.state.listening
    }, this.handleListen)
  }

  handleListen(){
    console.log('listening?', this.state.listening)

    /* this tells our speech recognition to start listening */
    if(this.state.listening){ 
      recognition.start()
      recognition.onend = () => {
        console.log("....continue listening....")
        recognition.start()
      }
    
    } else {
      recognition.stop()
      recognition.onend = () => {
        console.log("Stopped listening per click")
      }
    }

    recognition.onstart = () => {
      console.log("Listening!")
    }

    /* to collect the interim and final transcripts, we use speech recongnition's built-in event handler */
    
    let finalTranscript = ''
    recognition.onresult = event => {
      let interimTranscript = ''

      for (let i = event.resultIndex; i < event.results.length; i++){
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalTranscript += transcript + ' ';
        else interimTranscript += transcript;
      }

      tr(finalTranscript, {to: 'en'})
        .then(function (result){
          document.getElementById('final').innerHTML = result.text
          console.log(result.text);
          console.log(result.src)
        })
        .catch(function (error) {
          console.log(error)
        });
      document.getElementById('interim').innerHTML = interimTranscript
      

      const transcriptArr = finalTranscript.split(' ')
      const stopCmd = transcriptArr.slice(-3, -1)
      console.log('stopCmd', stopCmd)

      if(stopCmd[0] === 'stop' && stopCmd[1] === 'listening'){
        recognition.stop()
        recognition.onend = () => {
          console.log('Stopped listening per command')
          const finalText = transcriptArr.slice(0, -3).join(' ')
          document.getElementById('final').innerHTML = finalText
        }
      }
    }

    recognition.onerror = event => {
      console.log("Error occurred in recognition: " + event.error)
    }

  }

  render() {
    return (
      <div style={container}>
        <button id='microphone-btn' style={button} onClick={this.toggleListen} />
        <div id='interim' style={interim}></div>
        <div id='final' style={final}></div>
      </div>
    )
  }
}


export default App;

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  },
  button: {
    width: '60px',
    height: '60px',
    background: 'lightblue',
    borderRadius: '50%',
    margin: '6em 0 2em 0'
  },
  interim: {
    color: 'gray',
    border: '#ccc 1px solid',
    padding: '1em',
    margin: '1em',
    width: '300px'
  },
  final: {
    color: 'black',
    border: '#ccc 1px solid',
    padding: '1em',
    margin: '1em',
    width: '300px'
  }
}

const { container, button, interim, final } = styles

const synth = window.speechSynthesis; 
const textInput = document.getElementById('textInput'); 
const speakerBtn = document.getElementById('speakerBtn');
const startButton = document.getElementById('startButton'); 
const stopButton = document.getElementById('stopButton'); 
const resetButton = document.getElementById('resetButton'); 
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)(); 
recognition.lang = 'en-US';
recognition.continuous = true;
recognition.interimResults = true;
let isRecognizing = false;
 speakerBtn.addEventListener('click', () => { 
  recognition.stop();
  isRecognizing = false; 
  if(textInput.value === ''){
     const utterance = new SpeechSynthesisUtterance('Hey, Please enter your text'); 
     utterance.lang = 'en-US'; 
     synth.speak(utterance); 
    } 
    else { 
      const utterance = new SpeechSynthesisUtterance(textInput.value); 
      utterance.lang = 'en-US'; 
      synth.speak(utterance); 
    } 
  }); 
  startButton.addEventListener('click', () => { 
    synth.cancel();  // cancel any ongoing speech synthesis tasks  // start speech recognition
    if(!isRecognizing) { 
      recognition.start(); 
      isRecognizing = true;
    }
  }); 
  stopButton.addEventListener('click', () => {
    synth.cancel();  // cancel any ongoing speech synthesis tasks
    if(isRecognizing) { 
      recognition.stop(); 
      isRecognizing = false; 
    } 
  }); 
  recognition.onresult = (event) => {
    synth.cancel();  // cancel any ongoing speech synthesis tasks
    let interimTranscript = '';
    for(let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript; 
      if(event.results[i].isFinal) { 
        textInput.value += transcript; 
      } else { 
        interimTranscript += transcript; 
      } 
    }
  }; 
     resetButton.addEventListener('click', () => { 
      textInput.value = '';
      recognition.stop();
      synth.cancel();  // cancel any ongoing speech synthesis tasks
      isRecognizing = false;
     });

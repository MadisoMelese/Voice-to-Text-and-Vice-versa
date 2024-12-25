const synth = window.speechSynthesis;
const textInput = document.getElementById('textInput');
const speakerBtn = document.getElementById('speakerBtn');

const startButton = document.getElementById('startButton'); 
const voiceInput = document.getElementById('voiceInput'); 
speakerBtn.addEventListener('click', () => {
  synth.cancel();
  
  if(textInput.value === ''){
    const utterance = new SpeechSynthesisUtterance('Hey, Please enter your text') ;
    utterance.lang = 'en-US';
    synth.speak(utterance);
  }
  else if(textInput.value != ''){
    const utterance = new SpeechSynthesisUtterance(textInput.value);
    utterance.lang = 'en-US';
    synth.speak(utterance);
  }
});

startButton.addEventListener('click', () => { 
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)(); 
  recognition.lang = 'en-US'; 
  recognition.start(); 
  recognition.onresult = (event) => { 
    voiceInput.value = event.results[0][0].transcript; 
  }; 
    recognition.onerror = (event) => { 
      console.error('Speech recognition error', event); 
    }; 
  });
import React, { useState } from 'react';
import styled from 'styled-components';
const VoiceRecognitionButton = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const recognition = new window.webkitSpeechRecognition();

  recognition.continuous = true;
  recognition.lang = 'es-ES'; // Puedes cambiar el idioma según tus necesidades

  const startListening = () => {
    recognition.start();
    setIsListening(true);
  };

  const stopListening = () => {
    recognition.stop();
    setIsListening(false);
  };

  recognition.onresult = (event) => {
    const last = event.results.length - 1;
    const text = event.results[last][0].transcript;
    setTranscript(text);
  };

  return (
    <div>
      <button onClick={isListening ? stopListening : startListening}>
        {isListening ? '-' : '+'}
      </button>
      <p>Transcripción: {transcript}</p>
    </div>
  );
};
const BtnReconocimiento = styled(VoiceRecognitionButton)`
    color: white;
    height: 100%;
    border:none;
`
export default BtnReconocimiento;

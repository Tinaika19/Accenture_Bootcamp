document.addEventListener('DOMContentLoaded', (event) => {
    // Check for browser support
    if (!('webkitSpeechRecognition' in window) && !('speechSynthesis' in window)) {
        alert('Sorry, your browser does not support the Web Speech API. Please try this on Google Chrome.');
        return;
    }

    // Elements
    const startButton = document.getElementById('start-recognition');
    const pauseButton = document.getElementById('pause-recognition');
    const resumeButton = document.getElementById('resume-recognition');
    const speakButton = document.getElementById('speak-text');
    const statusElement = document.getElementById('status');
    const errorElement = document.getElementById('error-message');

    // Speech Recognition
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = function(event) {
        const speechToText = event.results[0][0].transcript.toLowerCase();
        console.log('Speech to Text:', speechToText);
        handleCommand(speechToText);
    };

    recognition.onerror = function(event) {
        console.error('Speech recognition error', event.error);
        errorElement.textContent = `Error: ${event.error}`;
    };

    recognition.onend = function() {
        statusElement.textContent = 'Recognition ended.';
        startButton.classList.remove('active');
    };

    function handleCommand(command) {
        if (command.includes('navigate to')) {
            const destination = command.replace('navigate to', '').trim();
            statusElement.textContent = `Navigating to ${destination}`;
            speakText(`Navigating to ${destination}`);
        } else if (command.includes('stop navigation')) {
            statusElement.textContent = 'Navigation stopped.';
            speakText('Navigation stopped.');
        } else {
            statusElement.textContent = `Command not recognized: ${command}`;
            speakText(`Command not recognized: ${command}`);
        }
    }

    startButton.addEventListener('click', () => {
        recognition.start();
        statusElement.textContent = 'Listening...';
        startButton.classList.add('active');
        errorElement.textContent = '';
    });

    pauseButton.addEventListener('click', () => {
        recognition.stop();
        statusElement.textContent = 'Recognition paused.';
        startButton.classList.remove('active');
    });

    resumeButton.addEventListener('click', () => {
        recognition.start();
        statusElement.textContent = 'Listening...';
        startButton.classList.add('active');
        errorElement.textContent = '';
    });

    // Text to Speech
    const synth = window.speechSynthesis;

    function speakText(text) {
        const utterance = new SpeechSynthesisUtterance(text);
        synth.speak(utterance);
        utterance.onend = function() {
            console.log('Speech synthesis finished');
        };
        utterance.onerror = function(event) {
            console.error('Speech synthesis error', event.error);
        };
    }

    speakButton.addEventListener('click', () => {
        speakText('Hello, welcome to our website.');
    });
});

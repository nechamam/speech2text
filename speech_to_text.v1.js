'use strict';
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const fs = require('fs');

const speechToText = new SpeechToTextV1({
  // See: https://github.com/watson-developer-cloud/node-sdk#authentication
  authenticator: new IamAuthenticator({
    apikey: process.env.apikey,
  }),
  serviceUrl: process.env.serviceUrl,
  disableSslVerification: true,

});

/*
    This code will print the entire response to the console when it
    receives the 'data' event. Some applications will want to write
    out only the transcribed text, to the console or to a file.
    To do this, remove `objectMode: true` from the `params` object.
    Then, uncomment the block of code at Line 30.
*/
const params = {
  contentType: 'audio/wav',
  objectMode: true,
};

// create the stream
const recognizeStream = speechToText.recognizeUsingWebSocket(params);

// pipe in some audio
fs.createReadStream(__dirname + '/resources/speech.wav').pipe(recognizeStream);

/*
// these two lines of code will only work if `objectMode` is `false`

// pipe out the transcription to a file
recognizeStream.pipe(fs.createWriteStream('transcription.txt'));

// get strings instead of Buffers from `data` events
recognizeStream.setEncoding('utf8');
*/

recognizeStream.on('data', function (event) {
  onEvent('Data:', event);
});
recognizeStream.on('error', function (event) {
  onEvent('Error:', event);
});
recognizeStream.on('close', function (event) {
  onEvent('Close:', event);
});

// Displays events on the console.
function onEvent(name, event) {
  console.log(name, JSON.stringify(event, null, 2));
}

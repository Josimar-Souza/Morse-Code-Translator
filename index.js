const readline = require('readline-sync');
const morseInfo = require('./morseInfo');

const morseToLetter = (morseToTranslate) => {
  const morseList = Object.entries(morseInfo);
  let letter = '';

  for (let outerIndex = 0; outerIndex < morseList.length; outerIndex += 1) {
    if (morseToTranslate === morseList[outerIndex][1]) {
      letter += morseList[outerIndex][0];
      break;
    }
  }

  return letter;
}

const letterToMorse = (letterToTranslate) => {
  const morseList = Object.entries(morseInfo);
  let morse = '';

  for (let outerIndex = 0; outerIndex < morseList.length; outerIndex += 1) {
    if (letterToTranslate.toUpperCase() === morseList[outerIndex][0]) {
      morse += morseList[outerIndex][1];
      break;
    }
  }

  return morse;
}

const morseToHuman = (morse) => {
  const morseToTranslate = morse.split(' ');
  
  let translatedMessage = '';

  const letters = [];

  for (let index = 0; index < morseToTranslate.length; index += 1) {
    letters.push(morseToTranslate[index].split('/'));
  }

  for (let outerIndex = 0; outerIndex < letters.length; outerIndex += 1) {
    const word = letters[outerIndex];

    for (let innerIndex = 0; innerIndex < word.length; innerIndex += 1) {
      translatedMessage += morseToLetter(word[innerIndex]);
    }

    if (outerIndex < letters.length - 1) {
      translatedMessage += ' ';
    }
  }

  console.log(translatedMessage);
};

const humanToMorse = (phrase) => {
  const morseToTranslate = phrase.split(' ');
  let translatedMessage = '';

  const letters = [];

  for (let index = 0; index < morseToTranslate.length; index += 1) {
    letters.push(morseToTranslate[index].split(''));
  }

  for (let outerIndex = 0; outerIndex < letters.length; outerIndex += 1) {
    const word = letters[outerIndex];

    for (let innerIndex = 0; innerIndex < word.length; innerIndex += 1) {
      translatedMessage += letterToMorse(word[innerIndex]);
      
      if (innerIndex < word.length - 1) {
        translatedMessage += '/';
      }
    }

    if (outerIndex < letters.length - 1) {
      translatedMessage += ' ';
    }
  }

  console.log(translatedMessage);
};

const main = () => {
  const option = readline.question('if you wanna translate morse to human type "mth" or type "htm" for human to morse:\n');

  if (option === 'mth') {
    const morse = readline.question('type the morse to translate: (please separate letters with "/" and words with a space)\n');
    morseToHuman(morse);
  } else {
    const phrase = readline.question('type the phrase to translate: (without accent)\n');
    humanToMorse(phrase);
  }

  const again = readline.question('Do you wanna translate something else? (y/n)\n');

  if (again === 'y') {
    main();
  }
};

main();
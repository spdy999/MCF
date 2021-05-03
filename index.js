// Run command : node index.js
const fs = require('fs');
const Path = require('path');
let wordToMorseTable = {};
let contextMorseTable = {};
const createWordToMorseTable = (morseTableArr) => {
  return morseTableArr.reduce((acc, cur)=>{
    const line = cur.split(/\s+/g);
    const char = line[0];
    const morseCode = line.slice(-1);
    acc[char] = morseCode;
    return acc;
  }, {});
};
const matchingMorseWithContext = (morseWords) => {
  return morseWords.reduce((alreadyAppeared, morseWord, ind) => {
    const word =contextMorseTable[morseWord];
    if (alreadyAppeared[word]) {
      const {times, indices} = alreadyAppeared[word];
      alreadyAppeared[word] = {times: times+1, showWord: `${word}!`, indices: [...indices, ind]};
      return alreadyAppeared;
    }
    alreadyAppeared[word] = {times: 1, showWord: word, indices: [ind]};
    return alreadyAppeared;
  }, {});
};
const translateWordToMorse = (word) => {
  return word.split('').map((char) => wordToMorseTable[char]).join('');
};

const createContextMorseTable = (contextArr) => {
  return contextArr.reduce((acc, word) => {
    const morseWord = translateWordToMorse(word);
    acc[morseWord] = word;
    return acc;
  }, {});
};

const mainFn = async () => {
  const path = Path.join(__dirname, '/progc.dat');

  const str = fs.readFileSync(path, 'utf8');
  const separatedPart = str.split('*');
  const morseTableArr = separatedPart[0].split('\n').slice(0, -1);
  const contextArr = separatedPart[1].split(/\s+/g).slice(1, -1);
  const morseWordsArr = separatedPart[2].split(/\s+/g).slice(1, -1);

  wordToMorseTable = createWordToMorseTable(morseTableArr);
  contextMorseTable = createContextMorseTable(contextArr);

  // TODO: This function still not 100% because didn't do (?) morse type
  const matchedMorses = matchingMorseWithContext(morseWordsArr);
  // TODO: Have to arrange matched morses to an output
  console.log(matchedMorses);
};

mainFn();
module.exports = {mainFn};

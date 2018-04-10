import map from 'lodash/map';
import forEach from 'lodash/forEach';
import json from '../library.json';
import { removeAccent } from './convert.js';
console.log(removeAccent);
const translator = () => {
  const $translator = document.querySelector('[data-translator="input"]');
  const $result = document.querySelector('[data-translator="result"]');
  const $button = document.querySelector('[data-translator="button"]');
  const library = json;
  let resultTranslator, text; 

  $button.addEventListener('click', (e) => {
    e.preventDefault();
    resultTranslator = []; 
    text = $translator.value.toLowerCase().split(' '); 
    map(text, word => {
      forEach(library, (value, key) => removeAccent(word) === removeAccent(key) ? word = value : word);
      return resultTranslator.push(word);
    });
    $result.value = resultTranslator.join(' ') || 'Tradução';
  });
};

export { translator };

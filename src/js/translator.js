import forEach from 'lodash/forEach';
import json from '../library.json';
import { removeAccent } from './convert.js'; 

const translator = () => {
  const $translator = document.querySelector('[data-translator="input"]');
  const $result = document.querySelector('[data-translator="result"]');
  const $button = document.querySelector('[data-translator="button"]');
  const library = json;
  let text; 

  $button.addEventListener('click', (e) => {
    e.preventDefault(); 
    text = $translator.value.toLowerCase();  
    forEach(library, (value, key) => { 
      const regex = new RegExp(removeAccent(key), 'gm'); 
      text = removeAccent(text).replace(regex, value); 
    }); 
    $result.value = text || 'Tradução';  
  });
};

export { translator };

const _ = require('lodash');
const json = require('../library.json');

const delay = (function(){
  let timer = 0;
  return (callback, ms) => {
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();

const Translator = () => {
  const $translator = document.querySelectorAll('[data-translator="input"]')[0];
  const $result = document.querySelectorAll('[data-translator="result"]')[0];
  const library = json[0];
  let resultTranslator = [];

  $translator.addEventListener('keydown', (e) => {
    delay(() => { 
      resultTranslator = [];
      const words = $translator.value.toLowerCase().split(' ');
      _.forEach(library, (value, key) => {
        _.map(words, word => { 
          word === key ? resultTranslator.push(value) : '';
        });
      });
    }, 600);
    $result.value = resultTranslator.join(' ');
  });
};

export { Translator };
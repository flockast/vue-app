import _ from 'lodash';

export default {
  methods: {
    readyToSearch: str => {
      function strTr (str, from, to) {
        let result = '';
        for (let sym of String(str)) {
          let pos = from.indexOf(sym);
          result += to.charAt(pos) || sym;
        }
        return result;
      }
      return strTr(str.toLocaleLowerCase(),
        'абвгдеёжзийклмнопрстуфхцчшщъыьэюя ~{}:"<>',
        "f,dult`;pbqrkvyjghcnea[wxio]sm'.z `[];',."
      );
    },
    isEmpty: value => _.isEmpty(value)
  }
};

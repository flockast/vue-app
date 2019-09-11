import ru from 'convert-layout/ru';

export default {
  methods: {
    readyToSearch: str => ru.toEn(str.toLocaleLowerCase()),
    notEmptyObject: someObject => someObject && Object.keys(someObject).length,
    notEmptyArray: someArray => someArray && someArray.length > 0
  }
};

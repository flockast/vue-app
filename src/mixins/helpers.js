import ru from 'convert-layout/ru';

export default {
  methods: {
    readyToSearch: (str) => ru.toEn(str.toLocaleLowerCase())
  }
};

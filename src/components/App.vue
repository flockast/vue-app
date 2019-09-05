<template>
  <transition name="fade-up" mode="out-in">
    <Wrapper v-if="isAuth" :key="1"/>
    <div v-else :key="2" class="loader"></div>
  </transition>
</template>

<script>
import Wrapper from '../components/Wrapper.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'app',
  components: {
    Wrapper
  },
  computed: mapGetters('user', ['isAuth', 'token']),
  methods: mapActions('user', ['auth']),
  created () {
    this.auth();
  }
};
</script>

<style lang="scss">
  .loader {
    width: 100%;
    height: 100vh;
    background-image: url("data:image/svg+xml,%3Csvg width='200px' height='200px' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='xMidYMid' class='lds-pacman' style='background: none;'%3E%3Cg ng-attr-style='display:%7B%7Bconfig.showBean%7D%7D' style='display:block'%3E%3Ccircle cx='75.8256' cy='50' r='4' ng-attr-fill='%7B%7Bconfig.c2%7D%7D' fill='%23caacd4'%3E%3Canimate attributeName='cx' calcMode='linear' values='95;35' keyTimes='0;1' dur='1' begin='-0.67s' repeatCount='indefinite'%3E%3C/animate%3E%3Canimate attributeName='fill-opacity' calcMode='linear' values='0;1;1' keyTimes='0;0.2;1' dur='1' begin='-0.67s' repeatCount='indefinite'%3E%3C/animate%3E%3C/circle%3E%3Ccircle cx='36.2256' cy='50' r='4' ng-attr-fill='%7B%7Bconfig.c2%7D%7D' fill='%23caacd4'%3E%3Canimate attributeName='cx' calcMode='linear' values='95;35' keyTimes='0;1' dur='1' begin='-0.33s' repeatCount='indefinite'%3E%3C/animate%3E%3Canimate attributeName='fill-opacity' calcMode='linear' values='0;1;1' keyTimes='0;0.2;1' dur='1' begin='-0.33s' repeatCount='indefinite'%3E%3C/animate%3E%3C/circle%3E%3Ccircle cx='56.0256' cy='50' r='4' ng-attr-fill='%7B%7Bconfig.c2%7D%7D' fill='%23caacd4'%3E%3Canimate attributeName='cx' calcMode='linear' values='95;35' keyTimes='0;1' dur='1' begin='0s' repeatCount='indefinite'%3E%3C/animate%3E%3Canimate attributeName='fill-opacity' calcMode='linear' values='0;1;1' keyTimes='0;0.2;1' dur='1' begin='0s' repeatCount='indefinite'%3E%3C/animate%3E%3C/circle%3E%3C/g%3E%3Cg ng-attr-transform='translate(%7B%7Bconfig.showBeanOffset%7D%7D 0)' transform='translate(-15 0)'%3E%3Cpath d='M50 50L20 50A30 30 0 0 0 80 50Z' ng-attr-fill='%7B%7Bconfig.c1%7D%7D' fill='%23e4d8eb' transform='rotate(31.5383 50 50)'%3E%3CanimateTransform attributeName='transform' type='rotate' calcMode='linear' values='0 50 50;45 50 50;0 50 50' keyTimes='0;0.5;1' dur='1s' begin='0s' repeatCount='indefinite'%3E%3C/animateTransform%3E%3C/path%3E%3Cpath d='M50 50L20 50A30 30 0 0 1 80 50Z' ng-attr-fill='%7B%7Bconfig.c1%7D%7D' fill='%23e4d8eb' transform='rotate(-31.5383 50 50)'%3E%3CanimateTransform attributeName='transform' type='rotate' calcMode='linear' values='0 50 50;-45 50 50;0 50 50' keyTimes='0;0.5;1' dur='1s' begin='0s' repeatCount='indefinite'%3E%3C/animateTransform%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
    background-size: 200px;
    background-position: center;
    background-repeat: no-repeat;
  }
</style>

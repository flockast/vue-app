<template>
  <aside class="sidebar">
    <div class="sidebar__container">
      <div class="sidebar__search">
        <input type="text" class="input input--full input--search">
      </div>
      <div class="sidebar__menu">
        <nav class="sidebar-menu">
          <ul class="sidebar-menu__list">
            <li><router-link :to="{name: 'home'}" :exact="true">Home</router-link></li>
            <li v-for="(template, index) in templates" :key="index">
              <router-link :to="{name: 'asset', params: {id: template.id}}" :exact="true">{{ template.id }}</router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </aside>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  computed: mapGetters('template', ['templates']),
  methods: mapActions('template', ['getAll']),
  created () {
    this.getAll();
  }
};
</script>

<style lang="scss">
.sidebar {
  width: 270px;
  &__container {
    position: fixed;
    left: 0;
    display: flex;
    flex-direction: column;
    width: inherit;
    height: calc(100vh - 5rem);
    border-right: 1px solid $color-border;
    background: white;
    overflow: hidden;
  }
  &__search {
    padding: $fields;
    border-bottom: 1px solid $color-border;
  }
  &__menu {
    flex: 1;
    overflow: hidden;
  }
}
.sidebar-menu {
  overflow: auto;
  height: 100%;
  &__list {
    li {
      a {
        position: relative;
        display: block;
        padding: 1rem $fields;
        font-size: 1.6rem;
        text-decoration: none;
        color: $color-font-grey;
        &:before {
          content: '';
          position: absolute;
          z-index: -1;
          top: 0;
          bottom: 0;
          left: 0;
          width: 3px;
          background: $color-main-light;
          opacity: 0;
          transition: width .2s ease-in-out;
        }
        &:hover {
          color: $color-main-light;
          &:before {
            opacity: 1;
          }
        }
        &.is-active {
          color: white;
          &:before {
            opacity: 1;
            width: 100%;
          }
        }
      }
    }
  }
}
</style>

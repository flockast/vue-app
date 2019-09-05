<template>
  <aside class="sidebar-wrapper" :class="{'is-collapsed': isCollapsedSidebar}">
    <div class="sidebar">
      <div v-if="!isCollapsedSidebar" class="sidebar__search">
        <input type="text"
               class="input input--full input--search"
               v-model="searchQuery"
               placeholder="Quick search [ ctrl + s ]"
               v-shortkey.focus="['ctrl', 's']">
      </div>
      <div class="sidebar__menu">
        <Menu :searchQuery="searchQuery"/>
      </div>
      <div class="sidebar__collapse">
        <button class="sidebar-collapse-btn"
                :class="{'is-collapsed': isCollapsedSidebar}"
                v-shortkey="['ctrl', 'c']"
                @shortkey="toggleCollapse"
                @click="toggleCollapse">
          <span class="sidebar-collapse-btn__icon"><i class="fas fa-angle-double-left"></i></span>
          <span class="sidebar-collapse-btn__text">Свернуть [ ctrl + c ]</span>
        </button>
      </div>
    </div>
  </aside>
</template>

<script>
import { mapGetters } from 'vuex';
import Menu from './Menu';

export default {
  data () {
    return {
      searchQuery: ''
    };
  },
  computed: mapGetters('settings', ['isCollapsedSidebar']),
  components: {
    Menu
  },
  methods: {
    toggleCollapse () {
      this.$store.dispatch('settings/changeSidebarCollapse');
      if (this.isCollapsedSidebar) this.searchQuery = '';
    }
  }
};
</script>

<style lang="scss">
.sidebar-wrapper {
  width: 270px;
  transition: width .2s ease-in-out;
  &.is-collapsed {
    width: 50px;
  }
}
.sidebar {
  position: fixed;
  left: 0;
  display: flex;
  flex-direction: column;
  width: inherit;
  height: calc(100vh - 5rem);
  border-right: 1px solid $color-border;
  background: white;
  overflow: hidden;
  &__search {
    padding: $fields;
    border-bottom: 1px solid $color-border;
  }
  &__menu {
    flex: 1;
    overflow: hidden;
  }
  &__collapse {

  }
}
.sidebar-collapse-btn {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 15px;
  border: none;
  border-top: 1px solid $color-border;
  background: none;
  color: $color-font-dark;
  appearance: none;
  text-align: left;
  cursor: pointer;
  &:focus {
    outline: none;
    background: $color-main-lighter;
  }
  &.is-collapsed {
    .sidebar-collapse-btn__icon {
      transform: rotate(180deg);
    }
    .sidebar-collapse-btn__text {
      opacity: 0;
    }
  }
  &__icon {
    font-size: 1.6rem;
    margin-right: 10px;
    transition: transform .2s ease-in-out;
  }
  &__text {
    font-size: 1.4rem;
    white-space: nowrap;
    transition: opacity .2s ease-in-out;
  }
}
</style>

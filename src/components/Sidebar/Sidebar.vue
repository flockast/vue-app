<template>
  <aside class="sidebar-wrapper" :class="{'is-collapsed': isCollapsed}">
    <div class="sidebar">
      <div v-if="!isCollapsed" class="sidebar__search">
        <input type="text" class="input input--full input--search" v-model="searchQuery">
      </div>
      <div class="sidebar__menu">
        <Menu :isCollapsedSidebar="isCollapsed"
              :searchQuery="searchQuery"/>
      </div>
      <div class="sidebar__collapse">
        <button class="sidebar-collapse-btn"
                :class="{'is-collapsed': isCollapsed}"
                @click="toggleCollapse">
          <span class="sidebar-collapse-btn__icon"><i class="fas fa-angle-double-left"></i></span>
          <span class="sidebar-collapse-btn__text">Свернуть</span>
        </button>
      </div>
    </div>
  </aside>
</template>

<script>
import Menu from './Menu';

export default {
  data () {
    return {
      searchQuery: '',
      isCollapsed: false
    };
  },
  components: {
    Menu
  },
  methods: {
    toggleCollapse () {
      this.isCollapsed = !this.isCollapsed;
      if (this.isCollapsed) this.searchQuery = '';
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
    border-top: 1px solid $color-border;
  }
}
.sidebar-collapse-btn {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 15px;
  border: none;
  background: none;
  appearance: none;
  text-align: left;
  cursor: pointer;
  &:focus {
    outline: none;
    box-shadow: inset 0 0 0 2px #6e4e9e;
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
    color: $color-font-dark;
    white-space: nowrap;
    transition: opacity .2s ease-in-out;
  }
}
</style>

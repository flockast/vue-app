<template>
  <aside class="sidebar-wrapper" :class="{'is-collapsed': isCollapsed}">
    <div class="sidebar">
      <div v-if="!isCollapsed" class="sidebar__search">
        <input type="text" class="input input--full input--search" v-model="search">
      </div>
      <div class="sidebar__menu">
        <nav class="sidebar-menu">
          <ul class="sidebar-menu-list">
            <li class="sidebar-menu-list__item" v-for="(item, index) in filteredList" :key="index">
              <router-link v-if="!item.children || item.children.length === 0"
                           class="sidebar-menu-list-item"
                           :to="item.link ? {name: item.link} : {name: 'home'}" :exact="true">
                <span class="sidebar-menu-list-item__icon">
                  <i v-if="item.icon" :class="item.icon"></i>
                  <i v-else class="fas fa-th-large"></i>
                </span>
                <span class="sidebar-menu-list-item__text">{{ item.title }}</span>
              </router-link>
              <span v-else
                    class="sidebar-menu-list-item"
                    :class="{'is-opened': !item.collapsed}"
                    @click="item.collapsed = !item.collapsed">
                <span class="sidebar-menu-list-item__icon">
                  <i v-if="item.icon" :class="item.icon"></i>
                  <i v-else class="fas fa-th-large"></i>
                </span>
                <span class="sidebar-menu-list-item__text">{{ item.title }}</span>
                <span class="sidebar-menu-list-item__toggle" v-if="!isCollapsed">
                  <i class="fas fa-chevron-up"></i>
                </span>
              </span>
              <ul class="sidebar-menu-list" v-if="!item.collapsed && !isCollapsed">
                <li class="sidebar-menu-list__item" v-for="(child, index) in item.children" :key="index">
                  <router-link class="sidebar-menu-list-item"
                               :to="item.link ? {name: item.link, params: {id: child.id}} : {name: 'home'}"
                               :exact="true">
                    <span class="sidebar-menu-list-item__text">{{ child.title }}</span>
                  </router-link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
      <div class="sidebar__collapse">
        <button class="sidebar-collapse-btn"
                :class="{'is-collapsed': isCollapsed}"
                @click="toggleCollapse">
          <span class="sidebar-collapse-btn__icon"><i class="fas fa-angle-double-left"></i></span>
          <span class="sidebar-collapse-btn__text">Collapse sidebar</span>
        </button>
      </div>
    </div>
  </aside>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data () {
    return {
      search: '',
      list: [
        {
          id: 'home',
          title: 'Домой',
          icon: 'fas fa-home',
          children: [],
          link: 'home'
        },
        {
          id: 'templates',
          title: 'Шаблоны',
          icon: 'fas fa-th-large',
          link: 'asset',
          children: [],
          collapsed: true
        }
      ],
      isCollapsed: false
    };
  },
  computed: {
    ...mapGetters('template', ['templates']),
    filteredList () {
      return this.list.filter(item => {
        return (item.title.toLowerCase().includes(this.search.toLowerCase()));
      });
    }
  },
  methods: {
    toggleCollapse () {
      this.isCollapsed = !this.isCollapsed;
    }
  },
  created () {
    const index = this.list.findIndex(item => item.id === 'templates');
    this.list[index].children = this.templates;
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
.sidebar-menu {
  overflow: auto;
  height: 100%;
}
.sidebar-menu-list {
  &__item {
    & > .sidebar-menu-list .sidebar-menu-list-item {
      padding-left: 50px;
      background: $color-grey-lighter;
    }
  }
}
.sidebar-menu-list-item {
  position: relative;
  display: flex;
  padding: 1rem $fields;
  font-size: 1.6rem;
  text-decoration: none;
  color: $color-font-grey;
  cursor: pointer;
  &:before {
    content: '';
    position: absolute;
    z-index: 1;
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
  &.is-opened {
    background: $color-grey-lighter;
    .sidebar-menu-list-item__toggle {
      transform: rotate(180deg);
    }
  }
  &__icon {
    margin-right: 20px;
    position: relative;
    z-index: 2;
  }
  &__text {
    position: relative;
    z-index: 2;
  }
  &__toggle {
    position: absolute;
    top: 50%;
    right: 15px;
    margin-top: -.9rem;
    font-size: 1.6rem;
    transition: transform .2s ease-in-out;
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
    font-size: 1.6rem;
    color: $color-font-dark;
    white-space: nowrap;
    transition: opacity .2s ease-in-out;
  }
}
</style>

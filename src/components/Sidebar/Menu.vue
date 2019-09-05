<template>
<nav class="sidebar-menu">
  <ul class="sidebar-menu-list">
    <MenuItem v-for="(item, index) in filteredItems" :key="index"
              :title="item.title"
              :icon="item.icon"
              :link="item.link" />

    <MenuItemWithSubItem
        :subItems="allTemplates[0]"
        :searchQuery="searchQuery"
        title="Шаблоны"
        link="template"
        icon="fas fa-th-large"/>

    <MenuItemWithSubItem
        :subItems="allTemplates[1]"
        :searchQuery="searchQuery"
        title="Другие"
        link="template"
        icon="fas fa-th"/>
  </ul>
</nav>
</template>

<script>
import { mapGetters } from 'vuex';
import _ from 'lodash';

import helpers from '../../mixins/helpers';
import MenuItem from './MenuItem';
import MenuItemWithSubItem from './MenuItemWithSubItem';

export default {
  props: {
    searchQuery: [ String ]
  },
  data () {
    return {
      items: [
        {
          title: 'Домой',
          link: 'home',
          icon: 'fas fa-home'
        }
      ]
    };
  },
  computed: {
    ...mapGetters('template', ['templates']),
    filteredItems () {
      return this.filterBySearch(this.items);
    },
    filteredTemplates () {
      return this.filterBySearch(this.templates);
    },
    allTemplates () {
      return this.sortingTemplates();
    }
  },
  mixins: [ helpers ],
  methods: {
    filterBySearch (list) {
      return list.filter(item => this.readyToSearch(item.title).includes(this.readyToSearch(this.searchQuery)));
    },
    sortingTemplates () {
      return _.partition(this.filteredTemplates, item => item.cmsData && item.cmsData.topLevel);
    }
  },
  components: {
    MenuItem,
    MenuItemWithSubItem
  }
};
</script>

<style lang="scss">
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
    font-size: 1.4rem;
    position: relative;
    text-overflow: ellipsis;
    white-space: nowrap;
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
</style>

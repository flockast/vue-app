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
        :isCollapsedSidebar="isCollapsedSidebar"
        title="Шаблоны"
        link="template"
        icon="fas fa-th-large"/>

    <MenuItemWithSubItem
        :subItems="allTemplates[1]"
        :searchQuery="searchQuery"
        :isCollapsedSidebar="isCollapsedSidebar"
        title="Другие"
        link="template"
        icon="fas fa-th"/>
  </ul>
</nav>
</template>

<script>
import { mapGetters } from 'vuex';
import _ from 'lodash';

import MenuItem from './MenuItem';
import MenuItemWithSubItem from './MenuItemWithSubItem';

export default {
  props: {
    searchQuery: [ String ],
    isCollapsedSidebar: [ Boolean ]
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
  methods: {
    filterBySearch (list) {
      return list.filter(item => item.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
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
</style>

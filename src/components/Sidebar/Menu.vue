<template>
<nav class="sidebar-menu">
  <ul class="sidebar-menu-list">
    <li class="sidebar-menu-list__item" v-for="(item, index) in filteredItems" :key="index">
      <router-link v-if="item.link"
                   class="sidebar-menu-list-item"
                   :to="{name: item.link}"
                   :exact="true">
        <span class="sidebar-menu-list-item__icon">
          <i v-if="item.icon" :class="item.icon"></i>
          <i v-else class="fas fa-th-large"></i>
        </span>
        <span class="sidebar-menu-list-item__text">{{ item.title }}</span>
      </router-link>
    </li>
    <li class="sidebar-menu-list__item" v-if="filteredTemplates.length > 0">
      <span class="sidebar-menu-list-item"
            :class="{'is-opened': isOpenedTemplates}"
            @click="toggleOpenedSubItem">
        <span class="sidebar-menu-list-item__icon"><i  class="fas fa-th-large"></i></span>
        <span class="sidebar-menu-list-item__text">Шаблоны</span>
        <transition name="fade">
          <span v-if="!isCollapsed"
                class="sidebar-menu-list-item__toggle">
            <i class="fas fa-chevron-up"></i>
          </span>
        </transition>
      </span>
      <transition name="fade">
        <ul v-if="!isCollapsed && isOpenedTemplates" class="sidebar-menu-list">
          <li class="sidebar-menu-list__item" v-for="(item, index) in filteredTemplates" :key="index">
            <router-link class="sidebar-menu-list-item"
                         :to="{name: 'template', params: {id: item.id}}"
                         :exact="true">
              <span class="sidebar-menu-list-item__text">{{ item.title }}</span>
            </router-link>
          </li>
        </ul>
      </transition>
    </li>
  </ul>
</nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    searchQuery: [ String ],
    isCollapsed: [ Boolean ]
  },
  data () {
    return {
      list: [
        {
          id: 'home',
          title: 'Домой',
          link: 'home',
          icon: 'fas fa-home'
        }
      ],
      isOpenedTemplates: false
    };
  },
  computed: {
    ...mapGetters('template', ['templates']),
    filteredItems () {
      return this.filterBySearch(this.list);
    },
    filteredTemplates () {
      let filtered = this.filterBySearch(this.templates);
      // if find then show subItems && if search empty then hide subItems
      this.isOpenedTemplates = filtered.length > 0 && this.searchQuery.length !== 0;
      return filtered;
    }
  },
  methods: {
    filterBySearch (list) {
      return list.filter(item => item.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
    },
    toggleOpenedSubItem () {
      this.isOpenedTemplates = !this.isOpenedTemplates;
    }
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

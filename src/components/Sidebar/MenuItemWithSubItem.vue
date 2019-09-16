<template>
<li v-if="notEmptyArray(subItems)" class="sidebar-menu-list__item">
    <span class="sidebar-menu-list-item"
          :class="{'is-opened': isOpened || isFounded}"
          @click="handleClickItem">
      <span v-if="icon" class="sidebar-menu-list-item__icon">
        <i :class="icon"></i>
      </span>
      <span class="sidebar-menu-list-item__text">{{ title }}</span>
      <span v-if="!isCollapsedSidebar"
            class="sidebar-menu-list-item__toggle">
        <i class="fas fa-chevron-up"></i>
      </span>
    </span>
  <transition name="fade">
    <ul v-if="!isCollapsedSidebar && isOpened || isFounded" class="sidebar-menu-list">
      <li class="sidebar-menu-list__item" v-for="(subItem, index) in subItems" :key="index">
        <router-link class="sidebar-menu-list-item"
                     :to="{name: link, params: {id: subItem.id}}"
                     :exact="true">
          <span class="sidebar-menu-list-item__text">{{ subItem.title }}</span>
        </router-link>
      </li>
    </ul>
  </transition>
</li>
</template>

<script>
import { mapGetters } from 'vuex';
import helpers from '../../mixins/helpers';

export default {
  props: {
    searchQuery: [ String ],
    subItems: [ Array ],
    title: [ String ],
    link: [ String ],
    icon: [ String ]
  },
  data () {
    return {
      isOpened: false
    };
  },
  mixins: [ helpers ],
  methods: {
    handleClickItem () {
      if (this.isCollapsedSidebar) {
        this.$store.dispatch('settings/changeSidebarCollapse', false);
        this.isOpened = true;
      } else {
        this.isOpened = !this.isOpened;
      }
    }
  },
  computed: {
    ...mapGetters('settings', ['isCollapsedSidebar']),
    isFounded () {
      return this.searchQuery.length !== 0;
    }
  }
};
</script>

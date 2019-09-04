<template>
<li v-if="subItems.length > 0" class="sidebar-menu-list__item">
    <span class="sidebar-menu-list-item"
          :class="{'is-opened': isOpened || isFounded}"
          @click="toggleOpened">
      <span v-if="icon" class="sidebar-menu-list-item__icon">
        <i :class="icon"></i>
      </span>
      <span class="sidebar-menu-list-item__text">{{ title }}</span>
      <transition name="fade">
        <span v-if="!isCollapsedSidebar"
              class="sidebar-menu-list-item__toggle">
          <i class="fas fa-chevron-up"></i>
        </span>
      </transition>
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
export default {
  props: {
    isCollapsedSidebar: [ Boolean ],
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
  methods: {
    toggleOpened () {
      this.isOpened = !this.isOpened;
    }
  },
  computed: {
    isFounded () {
      return this.searchQuery.length !== 0;
    }
  }
};
</script>

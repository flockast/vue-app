<template>
  <li class="sidebar-menu-list__item" >
    <router-link class="sidebar-menu-list-item"
                 :to="{name: link}"
                 :exact="true">
      <span v-if="icon" class="sidebar-menu-list-item__icon">
        <i :class="icon"></i>
      </span>
      <span class="sidebar-menu-list-item__text">{{ title }}</span>
    </router-link>
  </li>
</template>

<script>
export default {
  props: {
    title: [ String ],
    link: [ String ],
    icon: [ String ]
  }
};
</script>

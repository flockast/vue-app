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

<style lang="scss">
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

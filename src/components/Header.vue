<template>
  <header class="header">
    <div class="container-fluid">
      <nav>
        <ul>
          <li><router-link :to="{ name: 'home' }">Home</router-link></li>
          <li><router-link :to="{ name: 'assets' }">Assets</router-link></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style lang="scss"></style>

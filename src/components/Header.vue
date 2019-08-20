<template>
  <header class="header">
    <nav>
      <ul>
        <li><router-link :to="{ name: 'home' }">Home</router-link></li>
        <li><router-link :to="{ name: 'assets' }">Assets</router-link></li>
      </ul>
    </nav>
  </header>
</template>

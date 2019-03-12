<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
var curComponent
export default {
  name: 'App',
  methods: {
    setComponent: function (component) {
      curComponent = component;
    },
  },
}
window["upload"] = function (msg) {
    curComponent.upload(msg);
  }  
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  height: 100%;
}
</style>

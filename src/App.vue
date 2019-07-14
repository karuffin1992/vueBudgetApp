<template>
  <div id="app">
    <div class="top">
      <Totals />
    </div>
    <div class="bottom">
      <Inputs />
      <IncExp type="inc"/>
      <IncExp type="exp"/>
    </div>
  </div>


  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
</template>

<script>
import Totals from './components/Totals.vue';
import Inputs from './components/Inputs.vue';
import IncExp from './components/IncExp.vue';

export default {
  name: 'app',
  components: {
    Totals,
    Inputs,
    IncExp
  }
}
</script>

<style lang="scss">
</style>

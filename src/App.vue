<template>
  <div id="app">
    <div class="top">
      <Totals />
    </div>
    <div class="bottom">
      <Inputs />
      <div class="container clearfix">
        <IncExp type="inc"/>
        <IncExp type="exp"/>
      </div>
    </div>
  </div>
</template>

<script>
import Totals from '@/components/Totals.vue'
import Inputs from '@/components/Inputs.vue'
import IncExp from '@/components/IncExp.vue'

export default {
  name: 'app',
  components: {
    Totals,
    Inputs,
    IncExp
  },
  data() {
    return {
      allItems: {
        exp: [],
        inc: []
      },
      totals: {
        exp: 0,
        inc: 0
      },
      budget: 0,
      percentage: -1
    }
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.clearfix::after {
  content: "";
  display: table;
  clear: both;
}

body {
  color: $grey;
  font-family: $font;
  font-size: 16px;
  position: relative;
  height: 100vh;
  font-weight: 400;
}

.right {
  float: right;
}

.red {
  color: $red !important;
}

.red-focus:focus {
  border: 1px solid $red !important;
}

.top {
  height: 40vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), url(./assets/back.png);
  background-size: cover;
  background-position: center;
  position: relative;
}

.container {
  width: 1000px;
  margin: 60px auto;
}
</style>

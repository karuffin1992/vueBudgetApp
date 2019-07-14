<template>
  <div class="container clearfix">
    <div class="expenses">
      <h2 class="expenses__title">Expenses</h2>
      <div class="expenses__list">
        <IncExpRows type="exp" />
      </div>
    </div>
  </div>
</template>

<script>
import IncExpRows from '@/components/IncExpRows.vue';

export default {
  name: 'IncExp',
  components: {
    IncExpRows
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>

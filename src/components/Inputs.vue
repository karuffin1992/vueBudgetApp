<template>
  <div class="add">
    <div class="add__container">
      <select class="add__type">
        <option value="inc" selected>+</option>
        <option value="exp">-</option>
      </select>
      <input type="text" class="add__description" placeholder="Add description">
      <input type="number" class="add__value" placeholder="Value">
      <button class="add__btn"><i class="ion-ios-checkmark-outline"></i></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Inputs'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>

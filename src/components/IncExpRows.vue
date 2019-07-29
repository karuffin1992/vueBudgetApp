<template>
  <div class="item clearfix">
    <div class="item__description"></div>
    <div class="right clearfix">
      <div class="item__value"></div>
      <div v-if="type === 'exp'" class="item__percentage"></div>
      <div class="item__delete">
        <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IncExpRows',
  props: {
    type: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.item {
  padding: 13px;
  border-bottom: 1px solid $lightGrey;
}

.item:first-child {
  border-top: 1px solid $lightGrey;
}

.item:nth-child(even) {
  background-color: $evenLighterGrey;
}

.item__description {
  float: left;
}

.item__value {
  float: left;
  transition: transform 0.3s;
}

.item__percentage {
  float: left;
  margin-left: 20px;
  transition: transform 0.3s;
  font-size: 11px;
  background-color: $lightRed;
  padding: 3px;
  border-radius: 3px;
  width: 32px;
  text-align: center;
}

.income .item__value, 
.income .item__delete--btn {
  color: $cyan;
}

.expenses .item__value,
.expenses .item__percentage,
.expenses .item__delete--btn {
  color: $red;
}

.item__delete {
  float: left;
}

.item__delete--btn {
  font-size: 22px;
  background: none;
  border: none;
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  line-height: 1;
  display: none;
}

.item__delete--btn:focus {
  outline: none;
}

.item__delete--btn:active {
  transform: translateY(2px);
}

.item:hover .item__delete--btn {
  display: block;
}

.item:hover .item__value {
  transform: translateX(-20px);
}

.item:hover .item__percentage{
  transform: translateX(-20px);
}
</style>

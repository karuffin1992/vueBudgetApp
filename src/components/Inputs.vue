<template>
  <div class="add">
    <div class="add__container">
      <select v-model="ddType" class="add__type">
        <option value="inc" selected>+</option>
        <option value="exp">-</option>
      </select>
      <input v-model="description" type="text" class="add__description" placeholder="Add description">
      <input v-model="value" type="number" class="add__value" placeholder="Value">
      <button @click="addItem" class="add__btn"><i class="ion-ios-checkmark-outline"></i></button>
    </div>
  </div>
</template>

<script>
import Income from '@/classes/Income.js'
import Expenses from '@/classes/Expenses.js'

export default {
  name: 'Inputs',
  props: [
    'expItems',
    'incItems',
    'nextExpID',
    'nextIncID'
  ],
  data () {
    return {
      ddType: 'inc',
      description: '',
      value: ''
    }
  },
  methods: {
    addItem: function(event) {
      console.log(`add item`)
      let id, newItem, items, nextID
      
      const val = this.value
      const desc = this.description
      const type = this.ddType
      
      if (type === 'exp') {
        items = this.expItems
        nextID = this.nextExpID
        newItem = new Expense(nextID, desc, val)
      } else {
        item = this.incItems
        nextID = this.nextIncID
        newItem = new Income(nextID, desc, val)
      }

      if (desc !== '' && val !== '') {
        items.push(newItem)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.add {
  padding: 14px;
  border-bottom: 1px solid $lightGrey;
  background-color: $evenLighterGrey;
}

.add__container {
  margin: 0 auto;
  text-align: center;
}

.add__type {
  width: 55px;
  border: 1px solid $lightGrey;
  height: 44px;
  font-size: 18px;
  color: inherit;
  background-color: $white;
  margin-right: 10px;
  font-weight: 300;
  transition: border 0.3s;
}

.add__description,
.add__value {
  border: 1px solid $lightGrey;
  background-color: $white;
  color: inherit;
  font-family: inherit;
  font-size: 14px;
  padding: 12px 15px;
  margin-right: 10px;
  border-radius: 5px;
  transition: border 0.3s;
}

.add__description {
  width: 400px;
}

.add__value {
  width: 100px;
}

.add__btn {
  font-size: 35px;
  background: none;
  border: none;
  color: $cyan;
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  line-height: 1.1;
  margin-left: 10px;
}

.add__btn:active {
  transform: translateY(2px);
}

.add__type:focus,
.add__description:focus,
.add__value:focus {
  outline: none;
  border: 1px solid $cyan;
}

.add__btn:focus {
  outline: none;
}
</style>

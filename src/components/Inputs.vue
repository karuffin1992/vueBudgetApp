<template>
  <div class="add">
    <div class="add__container">
      <select v-model="ddType" class="add__type">
        <option value="inc">+</option>
        <option value="exp">-</option>
      </select>
      <input 
        v-model="description"
        type="text"
        class="add__description"
        v-bind:class="getStylesHover"
        placeholder="Add description"
      >
      <input 
        v-model="value"
        type="number"
        class="add__value"
        v-bind:class="getStylesHover"
        placeholder="Value"
      >
      <button @click="addItem" class="add__btn" v-bind:class="getStylesBtn"><i class="ion-ios-checkmark-outline"></i></button>
    </div>
  </div>
</template>

<script>
import Income from '@/classes/Income.js'
import Expenses from '@/classes/Expenses.js'

export default {
  name: 'Inputs',
  props: {
    allItems: {
      exp: Array,
      nextExpID: Number,
      inc: Array,
      nextIncID: Number
    }
  },
  data () {
    return {
      ddType: 'inc',
      description: '',
      value: ''
    }
  },
  computed: {
    getStylesBtn: function () {
      return {
        cyanBtn: this.ddType === 'inc',
        redBtn: this.ddType === 'exp'
      }
    },
    getStylesHover: function () {
      return {
        cyanHover: this.ddType === 'inc',
        redHover: this.ddType === 'exp'
      }
    }
  },
  methods: {
    addItem: function (event) {
      const val = parseInt(this.value)
      const desc = this.description
      const type = this.ddType
      const items = this.allItems

      let newItem, nextID

      if (type === 'exp') {
        nextID = items.nextExpID
        newItem = new Expenses(nextID, desc, val)
      } else {
        nextID = items.nextIncID
        newItem = new Income(nextID, desc, val)
      }

      if (desc !== '' && val !== '') {
        items[type].push(newItem)
        type === 'exp' ? items.nextExpID++ : items.nextIncID++
      }

      this.clearFields()
      this.$emit('interface', this.allItems)
    },
    clearFields: function () {
      this.value = ''
      this.description = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.cyanBtn {
  color: $cyan;
}

.cyanHover {
  outline: none;
  border: 1px solid $cyan !important;
}

.redBtn {
  color: $red;
}

.redHover {
  outline: none;
  border: 1px solid $red !important;
}

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
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  line-height: 1.1;
  margin-left: 10px;
  outline: none;
}

.add__btn:active {
  transform: translateY(2px);
}
</style>

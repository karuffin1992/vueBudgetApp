<template>
  <div id="app">
    <div class="top">
      <Totals
        :expTotal="totals['exp']"
        :incTotal="totals['inc']"
        :percentage="percentage"
        :budget="budget"
      />
    </div>
    <div class="bottom">
      <Inputs
        :allItems="allItems"
        @interface="addItem"
      />
      <div class="container clearfix">
        <IncExp
          rowType="inc"
          :items="allItems['inc']"
          @interface="deleteItem" 
        />
        <IncExp
          rowType="exp"
          :items="allItems['exp']"
          @interface="deleteItem"
        />
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
  data () {
    return {
      allItems: {
        exp: [],
        nextExpID: 0,
        inc: [],
        nextIncID: 0
      },
      totals: {
        exp: 0,
        inc: 0
      },
      budget: 0,
      percentage: 0
    }
  },
  methods: {
    addItem: function (event) {
      this.runUpdate()
    },
    deleteItem: function (event) {
      this.runUpdate()
    },
    runUpdate: function () {
      this.getTotals()
      this.calcPercentages()
    },
    getTotals: function () {
      // calculate total income and expenses
      this.calcTotals('exp')
      this.calcTotals('inc')

      // calculate budget: income - expenses
      let inc = this.totals['inc']
      let exp = this.totals['exp']

      this.budget = inc - exp

      // calculate the percentage of income spent
      this.percentage = this.totals.inc > 0 ? Math.round((exp / inc) * 100) : 0
    },
    calcTotals: function (type) {
      let sum = 0

      this.allItems[type].forEach(function (curr, i, array) {
        sum += curr.value
      })

      this.totals[type] = sum
    },
    calcPercentages: function () {
      let self = this
      this.allItems.exp.forEach(function (curr) {
        curr.calcPerc(self.totals.inc)
      })
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

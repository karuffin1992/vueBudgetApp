<template>
  <div class="budget">
    <div class="budget__title">
      Available Budget in <span class="budget__title--month">{{ getDate }}</span>:
    </div>
    <div class="budget__value">{{ getBudget }}</div>
    <BudgetTotals rowType="inc" :total="incTotal"/>
    <BudgetTotals rowType="exp" :total="expTotal" :percentage="percentage"/>
  </div>
</template>

<script>
import BudgetTotals from '@/components/BudgetTotals.vue'
import formatNum from '@/mixins/formatNumber'

export default {
  name: 'Totals',
  mixins: [ formatNum ],
  components: {
    BudgetTotals
  },
  props: {
    expTotal: Number,
    incTotal: Number,
    percentage: Number,
    budget: Number
  },
  computed: {
    getDate: function () {
      let now, year, month, months
      months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      now = new Date()
      year = now.getFullYear()
      month = months[now.getMonth()]

      return month + ' ' + year
    },
    getBudget: function () {
      let type = this.budget > 0 ? 'inc' : 'exp'
      let res = this.formatNumber(this.budget, type)

      return res
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.budget {
  position: absolute;
  width: 350px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: $white;
}

.budget__title {
  font-size: 18px;
  text-align: center;
  margin-bottom: 10px;
  font-weight: 300;
}

.budget__value {
  font-weight: 300;
  font-size: 46px;
  text-align: center;
  margin-bottom: 25px;
  letter-spacing: 2px;
}
</style>

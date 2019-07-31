<template>
  <div>
    <div v-if="rowType === 'inc'">
      <div class="budget__income clearfix">
        <div class="budget__income--text">Income</div>
        <div class="right">
          <div class="budget__income--value">{{ formatNumber(total, rowType) }}</div>
          <div class="budget__income--percentage">&nbsp;</div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="budget__expenses clearfix">
        <div class="budget__expenses--text">Expenses</div>
        <div class="right clearfix">
          <div class="budget__expenses--value">{{ formatNumber(total, rowType) }}</div>
          <div class="budget__expenses--percentage">{{ getPercentage(percentage) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import formatNum from '@/mixins/formatNumber'
import getPerc from '@/mixins/getPercentage'

export default {
  name: 'BudgetTotals',
  mixins: [ formatNum, getPerc ],
  props: {
    total: Number,
    percentage: Number,
    rowType: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.budget__income,
.budget__expenses {
  padding: 12px;
  text-transform: uppercase;
}

.budget__income {
  margin-bottom: 10px;
  background-color: $cyan;
}

.budget__expenses {
    background-color: $red;
}

.budget__income--text,
.budget__expenses--text {
  float: left;
  font-size: 13px;
  color: $darkGrey;
  margin-top: 2px;
}

.budget__income--value,
.budget__expenses--value {
  letter-spacing: 1px;
  float: left;
}

.budget__income--percentage,
.budget__expenses--percentage {
  float: left;
  width: 34px;
  font-size: 11px;
  padding: 3px 0;
  margin-left: 10px;
}

.budget__expenses--percentage {
  background-color: rgba(255, 255, 255, 0.2);
  text-align: center;
  border-radius: 3px;
}
</style>

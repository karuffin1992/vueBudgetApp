<template>
  <div v-if="rowType === 'inc'" class="income">
    <h2 class="income__title">Income</h2>
    <div class="income__list">
      <IncExpRows v-for="item in items"
        :key="item.id"
        :id="item.id"
        :value="item.value"
        :description="item.description"
        :rowType="rowType"
        @interface="removeItem"
      />
    </div>
  </div>

  <div v-else class="expenses">
    <h2 class="expenses__title">Expenses</h2>
    <div class="expenses__list">
      <IncExpRows v-for="item in items"
        :key="item.id"
        :id="item.id"
        :value="item.value"
        :description="item.description"
        :percentage="item.percentage"
        :rowType="rowType"
        @interface="removeItem"
      />
    </div>
  </div>
</template>

<script>
import IncExpRows from '@/components/IncExpRows.vue'

export default {
  name: 'IncExp',
  components: {
    IncExpRows
  },
  props: {
    items: Array,
    rowType: String
  },
  methods: {
    removeItem: function (event) {
      this.items.splice(event, 1)
      this.$emit('interface', this.items)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.income {
  float: left;
  width: 475px;
  margin-right: 50px;
}

.expenses {
  float: left;
  width: 475px;
}

h2 {
  text-transform: uppercase;
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 15px;
}

.income__title {
  color: $cyan;
}

.expenses__title {
  color: $red;
}
</style>

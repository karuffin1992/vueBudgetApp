class Expenses {
    constructor (id, description, value, percentage = -1) {
        this.id = id,
        this.description = description,
        this.value = value,
        this.percentage = percentage
    }

    calcPerc (totalInc) {
        this.percentage = totalInc > 0 ? this.percentage = Math.round((this.value / totalInc) * 100) : this.percentage = -1        
    }

    get getPerc () {
        return this.percentage;
    }
}

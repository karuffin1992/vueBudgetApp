export default {
    methods: {
        getPercentage: function (perc) {
            let percString = perc > 0 ? perc.toString() + '%' : '---'
            return percString
        }
    }
}
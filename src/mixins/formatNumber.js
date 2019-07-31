export default {
    methods: {
        formatNumber (num, type) {
            let numSplit, int, dec, sign

            sign = type === 'exp' ? '-' : '+'

            num = Math.abs(num)
            num = num.toFixed(2)

            numSplit = num.split('.')

            int = numSplit[0]
            dec = numSplit[1]

            if(int.length > 3) {
                int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3)
            }

            return `${sign} ${int}.${dec}`
        }
    }
}
export default {
    data(){
        return {
            lastSign: 0,
            query: {

            },
            page: {
                count: 0,
                total: 1,
                size: 10,
                index: 1
            }
        }
    },
    methods: {
        init(){

        },
        getData(){

        }
    },
    activated() {
        let sign = this.$route.query.sign
        if (!sign){
            sign = new Date().getTime()
            this.$router.replace({
                name: this.$route.name,
                query: {
                    ...this.$route.query,
                    sign
                }
            })
        }
        if (sign > this.lastSign){
            this.init()
        }
        this.lastSign = sign
    },
}

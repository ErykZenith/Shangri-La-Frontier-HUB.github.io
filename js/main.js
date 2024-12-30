import post from "./post/index.js";

const app = Vue.createApp({
    data() {
        return {
            stateProgress: 100,
            hp: 100,
            mp: 50,
            stamina: 100,
            timeout:undefined
        };
    },
    methods: {
        onListener({ data: {
            action,
            data
        } }) {
            switch (action) {
                case "open":
                    console.log(data);
                    break;
                default:
                    break;
            }
        },
        updateHp(value) {
            const newhp = Math.min(Math.max(parseInt(this.hp + value), 0), 100)
            const isDamage = this.hp > newhp
            this.hp = newhp
            if (isDamage){
                if (this.timeout) clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    this.stateProgress = newhp
                }, 500);
            }else{
                this.stateProgress = newhp
            }
        },
    },
    async mounted() {
        const res = await post("setup")
        console.log("setup : ", res);
        window.addEventListener("message", this.onListener)
    },
    onUnmounted() {
        window.removeEventListener(this.onListener)
    }
});

app.mount('#app');
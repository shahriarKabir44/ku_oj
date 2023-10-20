export default class LoaderManager {
    static client = null
    static flag = 0
    static subscribe({ toggle }) {
        this.client = { toggle }
    }
    static toggle() {
        this.flag ^= 1
        this.client.toggle(this.flag)
    }
}
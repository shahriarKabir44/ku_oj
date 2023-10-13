export default class LoaderManager {
    static client = null
    static subscribe({ toggle }) {
        this.client = { toggle }
    }
    static toggle() {
        this.client.toggle()
    }
}
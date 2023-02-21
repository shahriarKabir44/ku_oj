export default class Global {
    //static SERVER_IP = "http://192.168.0.103"
    static SERVER_IP = "http://192.168.43.90"

    static SERVER_URL = Global.SERVER_IP + ":8080"
    // static SERVER_IP = 
    static async _fetch(url) {
        return await fetch(this.SERVER_IP + url).then(res => res.json())
    }
}
export default class Global {
    // static SERVER_IP = "http://192.168.0.105"
    static SERVER_IP = "http://localhost"// "http://192.168.43.90"

    static SERVER_URL = Global.SERVER_IP + ":8080"
    // static SERVER_IP = 
    static async _fetch(url, body = null) {
        let payload = {
            method: body ? 'POST' : 'GET',

            headers: {
                'Content-Type': 'application/json'
            }
        }
        if (body) payload.body = JSON.stringify(body)
        return await fetch(this.SERVER_URL + url, payload).then(res => res.json())
    }
}
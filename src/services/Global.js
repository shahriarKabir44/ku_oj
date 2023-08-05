export default class Global {
    // static SERVER_IP = "http://192.168.0.105"
    static SERVER_IP = "http://localhost"// "http://192.168.43.90"

    static SERVER_URL = Global.SERVER_IP + ":8080"

    static CLIENT_IP = "http://localhost"

    static CLIENT_URL = Global.CLIENT_IP + ':3000'
    // static SERVER_IP = 
    static async _fetch(url, body = null) {
        let payload = {
            method: body ? 'POST' : 'GET',

            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }
        }
        if (body) payload.body = JSON.stringify(body)
        return await fetch(this.SERVER_URL + url, payload).then(res => res.json())
    }
    static async _postReq(url, data) {
        return fetch(this.SERVER_URL + url, {
            method: 'POST',
            headers: {
                'token': localStorage.getItem('token'),
            },
            body: data
        }).then(res => res.json())
    }
}
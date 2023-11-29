export default class Global {
    // static SERVER_IP = "http://192.168.0.105"
    //"https://4ffa-103-25-251-250.ngrok-free.app" //// 

    static SERVER_URL = "https://kuoj.onrender.com"//  "https://kuoj.onrender.com"

    static WS_URL = "ws://ku-oj-ws.onrender.com/"
    static CLIENT_URL = 'https://ku-oj.vercel.app'
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
        try {
            return await fetch(this.SERVER_URL + url, payload).then(res => res.json())

        } catch (error) {
            console.log(url, body)
            return null
        }
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
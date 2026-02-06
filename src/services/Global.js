const { protocol, hostname, port } = window?.location

export default class Global {
    // static SERVER_IP = "http://192.168.0.105"
    //"https://4ffa-103-25-251-250.ngrok-free.app" //// 

    static SERVER_URL = process.env.REACT_APP_SERVER_URL ?? "http://localhost:8080"

    static WS_URL = process.env.REACT_APP_WS_URL ?? "ws://localhost:881"
    static CLIENT_URL = protocol + '//' + hostname + `${port ? ":" + port : ''}`
    // static SERVER_IP = 
    static async _fetch(url, body = null, additionalData = null) {
        let payload = {
            method: body ? 'POST' : 'GET',

            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }
        }
        if (additionalData) {
            payload.headers = { ...payload.headers, ...additionalData }
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
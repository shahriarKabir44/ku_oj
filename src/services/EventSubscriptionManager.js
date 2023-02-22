export default class EventSubscriptionManager {
    static clients = []
    static subscribe(client) {
        this.clients.push(client)
    }
    static sendMessage(data) {
        this.clients.forEach(client => {
            client.onMessage(data)
        })
    }
}
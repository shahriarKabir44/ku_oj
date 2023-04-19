export default class ContestCreationEventManager {
    static clients = []
    static subscribe(client) {
        this.unsubscribe(client.id)
        this.clients.push(client)
    }
    static sendMessage(data) {
        this.clients.forEach(client => {
            client.onMessage(data)
        })
    }
    static unsubscribe(clientId) {
        this.clients = this.clients.filter(client => client.id !== clientId)
    }

}
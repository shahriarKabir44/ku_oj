export default class ContestCreationEventManager {
    static clients = []
    static subscribe(client) {
        this.unsubscribe(client.id)
        this.clients.push(client)
    }
    static async sendMessage(contestId) {
        let promises = []
        this.clients.forEach(client => {
            promises.push(client.onMessage(contestId))
        })
        await Promise.all(promises)
    }
    static unsubscribe(clientId) {
        this.clients = this.clients.filter(client => client.id !== clientId)
    }

}
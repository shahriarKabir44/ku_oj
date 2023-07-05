export default class UpdateContestEventManager {
    static clients = []
    static subscribe(client) {
        this.unsubscribe(client.id)
        this.clients.push(client)
    }
    static async sendMessage(contestInfo) {
        let promises = []

        let isErrorFree = 1
        let errorMessage = ""
        this.clients.forEach(client => {
            promises.push(client.onErrorCheking(contestInfo).then((status) => {
                isErrorFree &= status.code
                errorMessage = status.errorMessage
            }))
        })
        await Promise.all(promises)
        if (!isErrorFree) {
            return {
                status: 0,
                errorMessage
            }
        }
        promises = []
        this.clients.forEach(client => {
            promises.push(client.submitData(contestInfo))
        })
        await Promise.all(promises)
        return {
            status: 1,
            errorMessage: ""
        }

    }
    static unsubscribe(clientId) {
        this.clients = this.clients.filter(client => client.id !== clientId)
    }

}
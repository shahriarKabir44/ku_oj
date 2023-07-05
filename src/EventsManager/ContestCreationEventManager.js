export default class ContestCreationEventManager {
    static clients = []
    static subscribe(client) {
        this.unsubscribe(client.id)
        this.clients.push(client)
    }
    static async sendMessage(contestInfo) {
        let promises = []
        console.log(contestInfo)
        let isErrorFree = 1
        let errorMessage = ""
        this.clients.forEach(client => {
            promises.push(client.onErrorCheking(contestInfo.id).then((status) => {
                console.log(status)
                isErrorFree &= status.status
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
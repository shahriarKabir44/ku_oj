export default class NavbarDirectoryManager {

    static clients = {}
    static subscribe(client) {
        NavbarDirectoryManager.clients[client.label] = client.handler
    }
    static unsubscribe(client) {
        NavbarDirectoryManager.clients[client.label] = null
    }
    static async setDitectory() {
        let dirs = [
            {
                label: 'home',
                path: '/'
            }, {
                label: 'create contest',
                path: '/createContest'
            }
        ]
        this.clients['navbar'].handler(dirs)
    }
}
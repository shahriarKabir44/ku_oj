export default class NavbarDirectoryManager {

    static clients = {}
    static subscribe({ label, handler }) {
        NavbarDirectoryManager.clients[label] = { handler }
    }
    static unsubscribe(client) {
        NavbarDirectoryManager.clients[client.label] = null
    }
    static setDitectory(path) {
        let dirs = []
        switch (path) {
            case 'home':
                dirs = [
                    {
                        label: 'home',
                        path: '/'
                    }
                ]
                break;
            case 'createContest':
                dirs = [
                    {
                        label: 'Home',
                        path: '/'
                    },
                    {
                        label: 'Create a contest',
                        path: '/createContest'
                    },
                ]
                break;
            default:
                break;
        }

        this.clients['navbar']?.handler(dirs)
    }
}
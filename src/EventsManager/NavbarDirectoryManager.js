export default class NavbarDirectoryManager {

    static clients = {}
    static subscribe({ label, handler }) {
        NavbarDirectoryManager.clients[label] = { handler }
    }
    static unsubscribe(client) {
        NavbarDirectoryManager.clients[client.label] = null
    }
    static setDitectory(label, url) {
        let dirs = []
        if (url) {
            dirs = [
                {
                    label: 'Home',
                    path: '/'
                },
                {
                    label: label,
                    path: url
                },
            ]
        }
        else {
            switch (label) {
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
        }


        this.clients['navbar']?.handler(dirs)
    }
}
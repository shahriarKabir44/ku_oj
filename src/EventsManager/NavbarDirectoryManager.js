export default class NavbarDirectoryManager {

    static clients = {}
    static subscribe({ label, handler }) {
        NavbarDirectoryManager.clients[label] = { handler }
    }
    static unsubscribe(client) {
        NavbarDirectoryManager.clients[client.label] = null
    }
    static setDitectory(label, { userId, userName }) {
        let dirs = [{
            label: 'Home',
            path: '/'
        }]
        if (label === 'createContest') {
            dirs = [
                ...dirs,
                {
                    label: userName,
                    path: '/user/' + userId
                },
                {
                    label: 'Create Contest',
                    path: '/user/' + userId + '/createContest'
                }
            ]
        }
        else if (label === 'profile') {
            dirs = [
                ...dirs,
                {
                    label: userName,
                    path: '/user/' + userId
                }
            ]
        }


        this.clients['navbar']?.handler(dirs)
    }
}
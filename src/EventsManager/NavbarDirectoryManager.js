import Global from "../services/Global"

export default class NavbarDirectoryManager {

    static clients = {}
    static subscribe({ label, handler }) {
        NavbarDirectoryManager.clients[label] = { handler }
    }
    static unsubscribe(client) {
        NavbarDirectoryManager.clients[client.label] = null
    }
    static setDitectory(label, { userId, userName, contest, problem, submission }) {
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
        else if (label === 'contestInfo') {
            let { title, id } = contest
            dirs = [
                ...dirs,
                {
                    label: title,
                    path: Global.CLIENT_URL + '/contest/' + id
                }
            ]
        }
        else if (label === 'problemDescription') {
            dirs = [
                ...dirs,
                {
                    label: contest.title,
                    path: Global.CLIENT_URL + '/contest/' + contest.id
                },
                {
                    label: problem.code,
                    path: Global.CLIENT_URL + '/problem/' + problem.id
                }
            ]
        }
        else if (label === 'submissionDetails') {
            console.log(contest, problem, submission)
            dirs = [
                ...dirs,
                {
                    label: contest.title,
                    path: Global.CLIENT_URL + '/contest/' + contest.id
                },
                {
                    label: problem.title,
                    path: Global.CLIENT_URL + '/problem/' + problem.id
                },
                {
                    label: 'submission',
                    path: `${Global.CLIENT_URL}/viewSubmission/${contest.id}/${submission.id}`
                }
            ]
        }

        this.clients['navbar']?.handler(dirs)
    }
}
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
        if (label === 'home') {
            document.title = 'Home'
        }
        let dirs = [{
            label: 'Home',
            path: '/'
        }]
        if (label === 'Contests') {
            dirs.push({
                label,
                path: '/contests'
            })
        }
        if (label === 'problemset') {
            dirs.push({
                label: 'Problems',
                path: '/problemset'
            })
        }
        if (label === 'createContest') {
            document.title = 'Create Contest'

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
            document.title = userName
            dirs = [
                ...dirs,
                {
                    label: userName,
                    path: '/user/' + userId
                }
            ]
        }
        else if (label === 'contestInfo') {
            document.title = contest.title
            let { code, id } = contest
            dirs = [
                ...dirs,
                {
                    label: code,
                    path: Global.CLIENT_URL + '/contest/' + id
                }
            ]
        }
        else if (label === 'problemDescription') {

            document.title = problem.title
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
            document.title = 'Submission'
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
        else if (label === 'editContest') {
            document.title = `Edit "${contest.title}"`
            dirs = [
                ...dirs,
                {
                    label: userName,
                    path: '/user/' + userId
                },
                {
                    label: `Edit "${contest.title}"`,
                    path: ""

                }
            ]
        }
        this.clients['navbar']?.handler(dirs)
    }
}
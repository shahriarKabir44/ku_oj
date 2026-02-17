import Global from './Global'
export default class UserService {
    static async isAuthorized() {
        return Global._fetch('/user/isAuthorized')
    }
    static async authenticate(data) {
        let { data: auth } = await Global._fetch('/user/authenticate', data);
        if (auth == null) return;
        //console.log(auth)
        let { user, token } = auth;
        localStorage.setItem('token', token)
        return user
    }
    static async register(credential) {
        let { data: auth } = await Global._fetch('/user/register', credential)
        let { user, token } = auth;
        localStorage.setItem('token', token)
        return user
    }
    static async findUser(id) {
        return Global._fetch('/user/findUser/' + id)
            .then(({ data }) => data)
    }
    static async getHostedContests(id) {
        return Global._fetch('/user/getHostedContests/' + id)
    }
    static async getUsersContestSubmissions(userId, contestId, pageNumber) {
        return Global._fetch('/user/getUsersContestSubmissions', { userId, contestId, pageNumber })
    }
}
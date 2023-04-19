import Global from './Global'
export default class UserServiice {
    static async isAuthorized() {
        return Global._fetch('/user/isAuthorized')
    }
    static async authenticate(data) {
        let { user, token } = await Global._fetch('/user/authenticate', data)
        localStorage.setItem('token', token)
        return user
    }
}
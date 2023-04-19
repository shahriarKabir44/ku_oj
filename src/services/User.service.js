import Global from './Global'
export default class UserServiice {
    static async isAuthorized() {
        return Global._fetch('/user/isAuthorized')
    }
}
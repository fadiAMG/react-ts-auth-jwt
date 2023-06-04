export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user') || '{}')

    if (user && user.accessTokeb) {
        return { 'x-access-token': 'Bearer' + user.accessToken }
    } else {
        return { 'x-access-token': null }
    }
}

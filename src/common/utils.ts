export function getToken(): string {
    const userJson = localStorage.getItem('admss-admin-user');
    let token = '';

    if (userJson) {
        token = JSON.parse(userJson).token;
    }
    return token;
}

export function isLoggedin() {
    try {
        let bingo_user = JSON.parse(localStorage.getItem("bingo_user"));
        if (bingo_user == undefined || bingo_user == "") {
            return false;
        }

        let token = bingo_user.token;
        if (token == undefined || token == "") return false;
        return true;
    } catch {
        return false;
    }
}

export function getUsername() {
    let username = JSON.parse(localStorage.getItem("bingo_user")).username;
    return username;
}
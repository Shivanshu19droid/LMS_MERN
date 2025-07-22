// we are creating this helper file to define the following validation functions, as adding a regex everytime to validate these fields is not efficient


export function isEmail(string) {
    return string.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
}

export function isValidPassword(string) {
    return string.match(/^(?=.*\d)(?=.*[^A-Za-z0-9]).{6,16}$/)
}
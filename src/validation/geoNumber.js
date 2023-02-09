export const geoNumber = (input) => {
    if(input.match(/^\+995\s5\d{2}\s\d{2}\s\d{2}\s\d{2}$/)){
        return true
    }
    return false
}
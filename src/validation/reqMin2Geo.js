export const reqMin2Geo = (input) => {

    if(input.length >= 2 && (input.match(/^[ა-ჰ]+$/))){
        return true
    }
    return false
}
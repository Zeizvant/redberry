export const isDate = (input) => {
    if(input.match(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)){  
        return true
    }
    return false
}
export const reqMail = (input) => {
    if(input.match(/^[A-Za-z0-9._%+-]+@redberry\.ge$/)){
        return true
    }
    return false
}
export const addSpacesToInput = (input, event) => {
    if((input.length === 17 || event.which === 32) && event.which !== 8){
        event.preventDefault()
    }else if((input.length === 4 || input.length === 8 || input.length === 11 || input.length === 14) && event.which !== 8){
        input = input + " "
    }
    return input
}
export const requireProfile = (user) => {

    if (!user.firstname || !user.lastname || !user.email || !user.phone) return true;
    else return false

}
export const requireAddress = (user) => {

    const {address} = user
    if(!address) return true
    if(!address.district || !address.section || !address.detail) return true;
    return false

}
const FormatDate = (string, dotted) => {
    if (dotted) {
        let date = new Date(string)
        date = date.getFullYear() + '.' + (date.getMonth() + 1) + '.' + date.getDate()
        return date
    }
    let date = new Date(string)
    date = date.getFullYear() + ' оны ' + (date.getMonth() + 1) + ' сарын ' + date.getDate()
    return date
}

export const formatDateWithDash = (date) => {
    date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    return date
}

export const FormatDateFull = (string) => {
    let date = new Date(string);
    return date.getFullYear() + ' оны ' + (date.getMonth() + 1) + ' сарын ' + date.getDate() + ' (' + date.getHours() + ':' + date.getMinutes() + ')';

}

export const FormatDateHourMinuteSecond = (string) => {
    const date = new Date(string);
    return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
}

export default FormatDate
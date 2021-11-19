const formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

export const calculateDiscount = (price, discount, formatted) => {
    let discountAmount = 0;
    let final = 0;
    if (!discount) {
        if (formatted) return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        else return price
    }
    discountAmount = price / 100 * discount
    final = price - discountAmount
    if(formatted) return final.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    return final
}

export default formatNumber;
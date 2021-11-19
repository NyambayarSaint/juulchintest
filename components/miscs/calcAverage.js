
const calcAverage = (reviews) => {

    let length = reviews.length
    let totalStars = 0;

    if (!length) return 0;

    reviews.map(el => totalStars = totalStars + el.Stars);
    return Math.ceil(totalStars / reviews.length);

};

export default calcAverage;
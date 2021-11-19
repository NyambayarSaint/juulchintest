
import { BsStarHalf, BsStarFill, BsStar } from 'react-icons/bs'
const getStars = (rating) => {
  let stars = []
  let tmp = rating;
  for (let i = 0; i < 5; i++) {
    if (tmp >= 1) {
      stars.push(<BsStarFill key={i}/>)
      tmp--
    } else if (tmp > 0) {
      stars.push(<BsStarHalf key={i} />)
      tmp = Math.floor(tmp)
    } else {
      stars.push(<BsStar key={i} />)
    }
  }
  return stars
}

export default getStars

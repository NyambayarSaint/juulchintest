import Axios from "axios"
import { useEffect } from "react"
import dateFormat from "dateformat"
import { useState } from "react"

const FeaturedBLogpostCard = ({ blog }) => {
    const [author, setAuthor] = useState(null)
    useEffect(() => {
        const fetch = async () => {
            const {data} = await Axios(process.env.serverUrl + '/authors/' + blog.author)
            setAuthor(data.name)
        }
        fetch()
    }, [blog])
    return (
        <div className="post-card">
            <div className="post-card-content">
                <div className="post-card-content-date">{dateFormat(blog.createdAt, 'mm-р сарын dd')}</div>
                <div className="post-card-content-title">{blog.title}</div>
                <div className="post-card-content-subtitle">{blog.subtitle}</div>
                <div className="post-card-content-description">{blog.description}</div>
                <div className="post-card-content-author">
                    <div className="post-card-content-author-caption">
                        Нийтлэгч<br />
                        <span>{author}</span>
                    </div>
                </div>
            </div>
            <img className="post-card-img" src={"https://www.discovermongolia.mn/uploads/gallery_UB.jpg"} />
        </div>
    )
}

export default FeaturedBLogpostCard
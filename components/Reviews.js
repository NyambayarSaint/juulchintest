import Axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import ReviewsPost from './ReviewsPost';
import { AiOutlineUser, AiOutlineCloseSquare, AiFillCheckCircle } from 'react-icons/ai';
import minimize from './miscs/minimize';
import ImageGallery from 'react-image-gallery';
import FormatDate from './miscs/formatDate';
import repeatStars from './miscs/repeatStars';
import { FaTrash } from 'react-icons/fa'
import 'react-image-gallery/styles/css/image-gallery.css';
import notify from './miscs/notify';
import { parseCookies } from 'nookies';

const Reviews = ({ product, writeReviewRef }) => {

    const [showPost, setShowPost] = React.useState(false);
    const [reviews, setReviews] = React.useState([]);
    const [showGallery, setShowGallery] = React.useState(null);
    const galleryCon = React.useRef();
    const { jwt } = parseCookies();

    React.useEffect(() => {
        goFetch();
    }, [])

    const goFetch = async () => {
        try {
            let res = await Axios(process.env.serverUrl + `/reviews?Product.id=${product.id}&_sort=Stars:desc,createdAt:desc`);
            setReviews(res.data);
        } catch (e) {
            console.log(e, 'no review found!');
        }
    }

    const handleRemove = async (rev) => {
        if (confirm('Та сэтгэгдлээ устгах гэж байна!')) {
            try {
                await Axios.delete(process.env.serverUrl + `/reviews/${rev.id}`, { headers: { Authorization: `Bearer ${jwt}` } });
                notify({ type: 'success', title: 'Таны сэтгэгдэл амжилттай устгагдлаа.' });
                goFetch();
            } catch (e) {
                console.log(e, 'Сэтгэгдэл устгахад алдаа гарлаа.');
                notify({ type: 'danger', title: 'Сэтгэгдэл устгахад алдаа гарлаа.' });
            }

        }
    }

    return (
        <Container className="col-12">
            <div className="top">
                <h3>Сэтгэгдлүүд</h3>
                <button ref={writeReviewRef} onClick={() => setShowPost(true)}>Сэтгэгдэл бичих</button>
            </div>
            <div className="reviews-con">
                {reviews.length ? reviews.map(rev => (
                    <div className="review" key={Math.random()}>
                        <div className="guest-con">
                            <div className="back"><AiOutlineUser /></div>
                            {rev.Guest && rev.Guest}
                            {rev.user && rev.user.firstname && rev.user.lastname && rev.user.firstname + ' ' + rev.user.lastname}
                            {rev.user && <> <AiFillCheckCircle style={{color:'green',marginLeft:10}} /></>}
                        </div>
                        <div className="stars-con">
                            <div className="stars">
                                {repeatStars(rev.Stars)}
                            </div>
                            <div className="name">{rev.Title}</div>
                        </div>
                        <div className="date-con">
                            <p style={{ opacity: 0.8 }}>{FormatDate(rev.createdAt)} өдөр санал сэтгэгдэл илгээжээ.</p>
                        </div>
                        <div className="desc-con">
                            <p>{rev.Description}</p>
                        </div>
                        <div className="img-con">
                            {rev.Images && rev.Images.length ? rev.Images.map(im => {
                                const images = [];
                                rev.Images.map(k => images.push({ original: minimize(k), thumbnail: minimize(k, 'small') }))
                                return (
                                    <img key={Math.random()} src={minimize(im)} onClick={() => setShowGallery(images)} />
                                )
                            }) : ''}
                        </div>
                        {rev.user && <div className="del-con" onClick={() => handleRemove(rev)}>
                            <FaTrash />
                        </div>}
                    </div>
                )) : <p>Санал сэтгэгдэл байхгүй байна.</p>}
            </div>
            <AnimatePresence>{showPost && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><ReviewsPost goFetch={goFetch} product={product} setShowPost={setShowPost} /></motion.div>}</AnimatePresence>
            <AnimatePresence>
                {showGallery &&
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div onClick={(e) => e.target === galleryCon.current && setShowGallery(null)} ref={galleryCon} className="gallery-con">
                            <AiOutlineCloseSquare onClick={() => setShowGallery(null)} className="close" />
                            <ImageGallery items={showGallery} />
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
        </Container>
    );
};

export default Reviews;

const Container = styled.div`
    .gallery-con{
        position:fixed;
        z-index:999;
        left:0;
        top:0;
        right:0;
        bottom:0;
        display:flex;
        justify-content:center;
        align-items:center;
        background:rgba(0,0,0,0.8);
        .close{
            position:absolute;
            right:30px;
            top:30px;
            color:white;
            opacity:1;
            font-size:50px;
            &:hover{
                cursor:pointer;
            }
        }
        .image-gallery{
            max-height:80%;
            max-width:80%;
            display:flex;
            align-items:center;
            justify-content:center;
            .image-gallery-thumbnails-container{
                background:rgba(0,0,0,0.2);
            }
        }
        
    }
    .top{
        display:flex;
        justify-content:space-between;
        align-items:center;
        margin-bottom:15px;
        button{
            padding:8px 30px;
            background:${({ theme }) => theme.mainColor};
            border:none;
            font-weight:500;
        }
    }
    .reviews-con{
        .review{
            margin-bottom:30px;
            padding-bottom:15px;
            border-bottom:1px solid rgba(0,0,0,0.1);
            position:relative;
            .guest-con{
                display:flex;
                align-items:center;
                font-size:${({ theme }) => theme.fontSizeSmall};
                margin-bottom:10px;
                .back{
                    width:30px;
                    height:30px;
                    line-height:30px;
                    text-align:center;
                    background:${({ theme }) => theme.mainColor2};
                    border-radius:100%;
                    margin-right:15px;
                    svg{
                        margin-top:-3px;
                        color:white;
                        font-size:20px;
                    }
                }
            }
            .stars-con{
                display:flex;
                align-items:center;
                font-weight:bold;
                margin-bottom:10px;
                .stars{
                    margin-right:10px;
                }
                svg{
                    color:${({ theme }) => theme.mainColor};
                    font-size:16px;
                }
            }
            .img-con{
                img{
                    height:80px;
                    object-fit:contain;
                    margin-right:10px;
                    &:hover{
                        cursor:pointer;
                    }
                }
            }
            .del-con{
                position:absolute;
                right:15px;
                top:15px;
                svg{
                    font-size:20px;
                    opacity:0.5;
                }
                &:hover{
                    color:rgba(255,0,0,1);
                    cursor:pointer;
                    svg{
                        opacity:1;
                    }
                }
            }
        }
    }
    @media only screen and (max-width: 768px){
        .top{
            border-bottom:1px solid rgba(0,0,0,0.1);
            padding-bottom:15px;
            h3{
                font-size:${({theme})=>theme.fontSize2};
                font-weight:bold;
                margin-bottom:0px;
            }
            button{
                padding:8px 15px;
            }
        }
        .review{
            .img-con{
                img{
                    margin-bottom:10px;
                }
            }
        }
    }
`
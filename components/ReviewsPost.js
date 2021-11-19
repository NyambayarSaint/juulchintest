import React from 'react';
import styled from 'styled-components';
import minimize from './miscs/minimize';
import StarRatings from 'react-star-ratings'
import FileUpload from '@/miscs/FileUpload';
import { useForm } from 'react-hook-form';
import { Ecommerce } from './miscs/ContextEcommerceProvider';
import { motion } from 'framer-motion';
import { FaInfoCircle } from 'react-icons/fa'
import { parseCookies } from 'nookies';
import notify from './miscs/notify';

const ReviewsPost = ({ setShowPost, product, goFetch }) => {

    const conRef = React.useRef();
    const { register, handleSubmit, errors, setError, clearErrors } = useForm();
    const [star, setStar] = React.useState(0);
    const [images, setImages] = React.useState([]); // { fileObject, base64: reader.result }
    const { user } = React.useContext(Ecommerce);
    const { jwt } = parseCookies();

    const changeRating = (newRating, name) => { setStar(newRating); clearErrors('Rating'); };
    const handleOutside = (e) => e.target === conRef.current && confirm('Та сэтгэгдэл бичихээ болих гэж байна!') && setShowPost(false)

    const onSubmit = async (data) => {
        if (!star) return setError('Rating', { shouldFocus: true });
        let headers = new Headers();
        data.Stars = star
        data.Product = product.id
        if (user) {
            data.Guest = '';
            data.user = user.id
            headers.append('Authorization', `Bearer ${jwt}`);
        }
        const formData = new FormData();
        images.length && images.map(el => formData.append(`files.Images`, el.fileObject));
        formData.append('data', JSON.stringify(data));
        try {
            await fetch(process.env.serverUrl + '/reviews', { method: 'POST', body: formData, headers });
            goFetch && goFetch();
            setShowPost(false);
            notify({ type: 'success', title: 'Санал сэтгэгдлээ илэрхийлсэн танд баярлалаа.' })
        } catch (e) {
            console.log(e, 'error to send the review');
            notify({ type: 'danger', title: 'Амжилтгүй боллоо. Та дахин оролдоно уу?' })
        }
    }

    return (
        <Container ref={conRef} onClick={handleOutside}>
            <form className="con" onSubmit={handleSubmit(onSubmit)}>
                <h4 className="maintitle" onClick={()=>confirm('Та сэтгэгдэл бичихээ болих гэж байна!') && setShowPost(false)}>Санал сэтгэгдэл илгээх</h4>
                <div className="info-product">
                    <img src={minimize(product.Images[0], 'thumbnail')} />
                    <h6 className="subtitle">{product.Title}</h6>
                </div>
                <hr />
                <div className="rating-con input-con">
                    <h6 className="subtitle">Ерөнхий үнэлгээ</h6>
                    <div className="rating">
                        <StarRatings rating={star} changeRating={changeRating} numberOfStars={5} name='Rating' starRatedColor="#b1954f" starHoverColor={'#cfb56a'} />
                    </div>
                    {errors.Rating && <motion.span initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><FaInfoCircle />Уучлаарай, та үнэлгээний оноогоо өгнө үү.</motion.span>}
                </div>
                <hr />
                <div className="media-con input-con">
                    <h6 className="subtitle">Зураг оруулах</h6>
                    <p>Хэрэглэгчид зөвхөн текстэн мэдээллээс гадна зурагнаас илүү их мэдээлэл авдаг.</p>
                    <div className="upload">
                        <FileUpload name="Images" images={images} setImages={setImages} />
                    </div>
                </div>
                <hr />
                <div className="headline input-con">
                    <h6 className="subtitle">Гол агуулга</h6>
                    <input type="text" name="Title" ref={register({ required: true })} placeholder="Танд хамгийн их сэтгэгдэл төрүүлсэн зүйл юу байв?" />
                    {errors.Title && <motion.span initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><FaInfoCircle />Энэ талбар хоосон байж болохгүй.</motion.span>}
                </div>
                <hr />
                <div className="description input-con">
                    <h6 className="subtitle">Дэлгэрэнгүй</h6>
                    <textarea rows="5" name="Description" ref={register({ required: true })} placeholder="Танд юу хамгийн их таалагдсан эсвэл таалагдаагүй вэ? Та тухайн бүтээгдэхүүнийг хэнд, ямар зориулалтаар авсан бэ? " />
                    {errors.Description && <motion.span initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><FaInfoCircle />Энэ талбар хоосон байж болохгүй.</motion.span>}
                </div>
                <hr />
                <div className="username input-con">
                    <h6 className="subtitle">Таны нийтэд харагдах нэр</h6>
                    {user && user.firstname && user.lastname ?
                        <input type="text" name="Guest" ref={register({ required: true })} readOnly={true} value={`${user.firstname} ${user.lastname}`} />
                        :
                        <input type="text" name="Guest" ref={register({ required: true })} />
                    }
                    <small>Санаа зоволтгүй, та хүссэн үедээ профайл нэрээ солих боломжтой.</small>
                    {errors.Guest && <motion.span initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><FaInfoCircle />Энэ талбар хоосон байж болохгүй.</motion.span>}
                </div>
                <hr />
                <button type="submit" className="mainbutton">Илгээх</button>
            </form>
        </Container>
    );
};

export default ReviewsPost;

const Container = styled.div`
    position:fixed;
    left:0;
    top:0;
    right:0;
    bottom:0;
    background:rgba(0,0,0,0.6);
    display:flex;
    justify-content:center;
    align-items:center;
    z-index:999;
    .con{
        padding:30px;
        border:1px solid rgba(0,0,0,0.1);
        background:white;
        max-height:80vh;
        overflow-y:scroll;
        .maintitle{
            margin-bottom:50px;
        }
        .subtitle{
            font-weight:600;
        }
        .info-product{
            display:flex;
            align-items:center;
            img{
                height:60px;
                border:1px solid rgba(0,0,0,0.1);
                margin-right:15px;
            }
        }
        .input-con{
            input,textarea{
                width:100%;
                padding:8px;
                resize:none;
                font-weight:500;
                &::placeholder{
                    font-size:${({ theme }) => theme.fontSizeSmall};
                }
            }
            small{
                display:block;
                margin-top:5px;
            }
            span{
                display:block;
                margin-top:5px;
                font-weight:500;
                color:red;
                font-size:${({ theme }) => theme.fontSizeSmall};
                svg{
                    margin-right:5px;
                    margin-top:-3px;
                }
            }
        }
        .rating-con{
            .rating{
                svg{
                    font-size:20px;
                }
            }
        }
        .mainbutton{
            width:100%;
            text-align:center;
            border:none;
            padding:10px;
            font-weight:500;
            background-image: linear-gradient(to bottom, ${({ theme }) => theme.mainColor2}, ${({ theme }) => theme.mainColor});
            color:white;
        }
    }
    @media only screen and (max-width: 768px){
        .con{
            margin:0px 15px;
            padding:15px;
            h6{
                font-size:${({theme})=>theme.fontSize};
            }
            .maintitle{
                font-size:${({theme})=>theme.fontSize2};
                margin-bottom:25px;
                text-align:left;
                position:relative;
                border-bottom:1px solid rgba(0,0,0,0.1);
                padding-bottom:15px;
                &:after{
                    content:"x";
                    position:absolute;
                    right:0px;
                    font-weight:bold;
                }
            }
            .info-product{
                
            }
            .rating-con{
                .star-ratings{
                    svg{
                        font-size:10px;
                    }
                }
            }
        }
    }
`
import React from 'react';
import styled from 'styled-components';
import { AiOutlinePlus } from 'react-icons/ai'
import { FaTrash } from 'react-icons/fa'

const FileUpload = ({ name, images, setImages }) => {

    const ref = React.useRef();

    const handle = (e) => {
        if (e.target.files[0]) {
            const fileObject = e.target.files[0]
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
                setImages([...images, { fileObject, base64: reader.result }])
            };
        }
    }

    return (
        <Container>
            {images.length ? images.map(el => (
                <div className="box image-container" key={Math.random()}>
                    <img src={el.base64} />
                    <FaTrash onClick={() => setImages(images.filter(ol => ol.base64 !== el.base64))} />
                </div>
            )) : ''}
            <div className="box input" onClick={() => ref.current.click()}>
                <AiOutlinePlus />
                <input type="file" name={name ? name : 'file'} accept=".gif,.jpg,.jpeg,.png" ref={ref} onChange={handle} />
            </div>
        </Container>
    );
};

export default FileUpload;

const Container = styled.div`
    display:flex;
    flex-wrap:wrap;
    .box{
        width:100px;
        height:100px;
        border:3px dotted rgba(0,0,0,0.1);
        transition:0.3s ease;
        margin-right:15px;
        display:flex;
        justify-content:center;
        align-items:center;
        margin-bottom:15px;
        &:last-child{
            margin-bottom:0px !important;
        }
    }
    .box.input{
        svg{
            opacity:0.1;
            transition:0.3s ease;
            font-size:60px;
        }
        input{
            display:none;
        }
        &:hover{
            cursor:pointer;
            border-color:${({ theme }) => theme.mainColor};
            svg{
                color:${({ theme }) => theme.mainColor};
                opacity:1;
            }
        }
    }
    .box.image-container{
        font-size: ${({ theme }) => theme.fontSize};
        padding:5px;
        border-style:solid;
        position:relative;
        img{
            height:100%;
            width:100%;
            object-fit:contain;
        }
        svg{
            position:absolute;
            right:5px;
            top:5px;
            opacity:0;
            transition:0.3s ease;
            color:rgba(0,0,0,0.8);
        }
        &:hover{
            cursor:pointer;
            svg{
                opacity:1;
                &:hover{
                    transform:scale(1.2);
                    color:rgba(255,0,0,0.8);
                }
            }
        }
    }
`
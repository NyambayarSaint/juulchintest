import React from 'react';
import styled from 'styled-components';
import { BsSearch } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai'
import Axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import minimize from '@/components/miscs/minimize';
import Link from 'next/link';

const Search = () => {

    const [showResult, setShowResult] = React.useState(false);
    const inputRef = React.useRef();

    const handleChange = async (e) => {
        let value = e.target.value
        if (value.length > 2) {
            let tmp = await Axios(process.env.serverUrl + `/products?Title_contains=${e.target.value}`);
            return tmp.data.length && setShowResult(tmp.data);
        }
        return setShowResult(false);
    }

    return (
        <Container className={`search-con ${showResult && `active`}`}>
            <input ref={inputRef} placeholder="Гоулд шоколад, etc" onChange={handleChange} />
            <BsSearch className="search-icon" />
            <AiOutlineClose className="mobile-close" onClick={() => {setShowResult(false);inputRef.current.value = "";}} />
            <AnimatePresence>
                {showResult && <motion.div initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }} className="con line-g" onMouseLeave={() => setShowResult(false)}>
                    {showResult.map(el => (
                        <Link href={process.env.productUrl + el.Slug} key={Math.random()}>
                            <a>
                                <div className="list">
                                    <div className="imgcon"><img src={minimize(el.Images[0], 'thumbnail')} /></div>
                                    <p>{el.Title}</p>
                                </div>
                            </a>
                        </Link>
                    ))}
                </motion.div>}
            </AnimatePresence>
        </Container>
    );
};

export default Search;

const Container = styled.div`
    position:relative;
    width:fit-content;
    
    input{
        border:none;
        padding:7px 15px;
        padding-right:35px;
        border-radius:3px;
    }
    .mobile-close{
        display:none;
    }
    svg{
        position:absolute;
        top:50%;
        font-size:20px;
        margin-top:-10px;
        right:10px;
    }
    .con{
        position:absolute;
        background:white;
        max-width:100%;
        max-height:300px;
        overflow-y:scroll;
        right:0px;
        border:4px solid ${({ theme }) => theme.mainColor};
        margin-top:15px;
        a{
            text-decoration:none;
        }
        .list{
            display:flex;
            align-items:center;
            border:1px solid transparent;
            border-bottom:1px solid rgba(0,0,0,0.1);
            padding:10px 5px;
            .imgcon{
                margin-right:10px;
                width:100px;
                img{
                    border:1px solid rgba(0,0,0,0.1);
                    border-radius:100%;
                }
            }
            p{
                font-size:${({ theme }) => theme.fontSizeSmall};
                line-height:14px;
                margin-bottom:0px;
            }
            &:hover{
                background:${({ theme }) => theme.mainColor2};
                border:1px solid white;
                color:white;
                cursor:pointer;
            }
        }
    }
    @media only screen and (max-width: 768px){
        width:100%;
        &.active{
            .mobile-close{
                display:block;
            }   
            .search-icon{
                display:none;
            }
        }
        input{
            width:100%;
            &::placeholder{
                text-align:center;
            }
        }
    }
`
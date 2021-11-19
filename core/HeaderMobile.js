import { MenuContext } from '@/components/miscs/ContextMenuProvider';
import Link from 'next/link';
import React, { useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { CgCloseR } from 'react-icons/cg';
import { FiUser } from 'react-icons/fi';
import styled from 'styled-components';

const HeaderMobile = () => {
    const { general } = React.useContext(MenuContext)
    const [menuOpen, setMenuOpen] = useState(false)
    const handleMenu = () => {
        setMenuOpen(!menuOpen)
    }
    
    return (
        <>
            <Container className="container">
                <div className="drawer">
                    <div className={`menu ${menuOpen && 'open'}`}>
                        <div className="menu-top">
                            <div className="close-button" onClick={handleMenu}><CgCloseR /></div>
                        </div>
                        {general.menu.map(item => (
                            <Link href={item.link} onClick={handleMenu} key={item.id}><a className="menu-item">{item.title}</a></Link>
                        ))}
                    </div>
                    {menuOpen && (<div className="backdrop" onClick={handleMenu}>&nbsp;</div>)}
                </div>
                <div className="header">
                    <Link href="/"><img className="logo" src={process.env.serverUrl + general.logo.url} /></Link>
                    <div className="header-buttons">
                        <div className="header-button"><Link href="/auth"><a><FiUser /></a></Link></div>
                        <div className="header-button"><AiOutlineMenu onClick={handleMenu} /></div>
                    </div>
                </div>
                <hr />
            </Container>
        </>
    );
};

export default HeaderMobile;

const Container = styled.div`
    padding: 0;
    hr {
        margin: 0;
    }
    .menu, .backdrop {    
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
    }
    .drawer {
        z-index: 201;
        background: #fff;
    }
    .menu {
        max-width: 100%;
        width:auto;
        left: 50px;
        right: 0;
        z-index: 202;
        background-color: #fff;
        transform: translateX(100%);
        transition: transform 0.2s ease-in-out;
        padding: 5px 0 5px 15px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        box-shadow: 0 5px 10px 0 rgba(0,0,0,0.1);
        
        a.menu-item {
            padding: 20px 10px;
            font-size: 18px;
            cursor: pointer;
        }
        .menu-top {
            display: flex;
            justify-content: flex-end;
            .close-button {
                color: ${(props) => props.theme.mainColor};
                font-size: 35px;
                padding: 15px 10px;
                cursor: pointer;
            }
        }
    }
    .menu.open {
        transform: translateX(0);
    }
    .backdrop {
        z-index: 200;
        -webkit-backdrop-filter: blur(5px);
        backdrop-filter: blur(5px);
    }
    .header {
        display: flex;
        justify-content: space-between;
        height: 70px;
        padding: 10px 5px;
        img.logo {
            padding: 5px 0;
            height: 100%;
        }
        .header-buttons {
            display: flex;
            justify-content: space-around;
            align-items: center;
            .header-button {
                cursor: pointer;
                font-size: 25px;
                padding: 0 8px;
                color: ${(props) => props.theme.mainColor};
                &:first-child {
                    border-right: 1px solid ${(props) => props.theme.mainColor};
                }
            }
        }
    }
`
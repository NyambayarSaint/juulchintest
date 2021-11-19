import { Ecommerce } from '@/components/miscs/ContextEcommerceProvider';
import { MenuContext } from '@/components/miscs/ContextMenuProvider';
import minimize from '@/components/miscs/minimize';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const HeaderDesktop = (props) => {
    const { general } = React.useContext(MenuContext)
    const { cart, user } = React.useContext(Ecommerce)
    return (
        <Container>
            <div className="header-top container">
                <Link href="/"><img className="logo" src={minimize(general.logo, 'small')} /></Link>
                <div className="header-buttons">
                    {general.buttons.map(button => (
                        <Link href={button.link} key={button.id}>
                            <a className="header-button">
                                {button.title === 'Сагс' && (<span className="count-badge">{cart.length}</span>)}
                                <img className="header-button-icon" src={minimize(button.image, 'small')} />
                                {button.title === 'Нэвтрэх' ? (
                                    <span>{user ? 'Профайл' : button.title}</span>
                                ) : (
                                    <span>{button.title}</span>
                                )}
                            </a>
                        </Link>
                    ))}
                </div>
            </div>
            <hr />
            <div className="header-bottom container">
                {general.menu.map(item => (
                    <Link href={item.link} key={item.id}><a className="menu-item">{item.title}</a></Link>
                ))}
            </div>
            <hr />
        </Container>
    );
};

export default HeaderDesktop;


const Container = styled.div`
    hr {
        margin: 0;
    }
    .header-bottom {
        display: flex;
        justify-content: flex-start;
        text-transform: uppercase;
        .menu-item {
            position: relative;
            padding-bottom: 15px;
            padding-top: 15px;
            margin: 0 20px;
            font-size: ${(props) => props.theme.fontSize};
            font-weight: 700;
            color: #4d4d4d;
            line-height: 21px;
            letter-spacing: 0.08em;
        }
        .menu-item::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 0px;
            border-bottom: 4px solid ${(props) => props.theme.mainColor};
            bottom: 0;
            -webkit-transform: scaleX(0);
            -ms-transform: scaleX(0);
            transform: scaleX(0);
            -webkit-transition: -webkit-transform 0.15s ease-in;
            transition: transform 0.15s ease-in;
        }
        .menu-item:hover::before, .menu-item:active::before {
            -webkit-transform: scaleX(1);
            -ms-transform: scaleX(1);
            transform: scaleX(1);
        }
    }
    .header-top {
        height: 80px;
        display: flex;
        justify-content: space-between;
        img.logo, .header-buttons {
            height: 100%;
            padding: 5px 0;
        }
        img.logo {
            cursor: pointer;
        }
        .header-buttons {
            text-align: center;
            display: flex;
            align-content: center;
            align-content: center;
            font-weight: 500;
        }
        .header-button {
            position: relative;
            padding: 0 15px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            .count-badge {
                position: absolute;
                top: 12px;
                right: 5px;
                padding: 4px 6px;
                background-color: ${props => props.theme.mainColor};
                color: #fff;
                border-radius: 50%;
                font-weight: bold;
            }
            img.header-button-icon {
                width: auto;
                margin: 5px auto;
                height: 20px;
            }
            span {
                font-size: ${(props) => props.theme.fontSizeSmaller};
                line-height: 10.35px;
                color: rgba(0, 0, 0, 0.5);
            }
        }
    }
`
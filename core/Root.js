import Header from '@/core/Header'
import Footer from '@/core/Footer';
import { MenuContext } from '@/miscs/ContextMenuProvider';
import { useContext } from "react";
import styled from "styled-components";
import PreSeo from "@/components/miscs/PreSeo";
import ReactNotification from 'react-notifications-component'

export default function Root(props) {

    const { completelyLoaded } = useContext(MenuContext);

    return (
        <Body>
            <ReactNotification />
            <PreSeo seo={props.seo} />
            {completelyLoaded && <Header />}
            {props.children}
            {completelyLoaded && <Footer />}
        </Body>
    )
}

const Body = styled.div`

    font-size: ${(props) => props.theme.fontSize};
    font-family: ${(props) => props.theme.fontFamily};
    font-weight: ${props => props.theme.fontWeightNormal};
    line-height:${({ theme }) => theme.fontSize};
    color:black;
    a {
        text-decoration: inherit;
        color: inherit;
    }
    span,h3,div,p,li,a{
        font-weight: inherit;
        color:inherit;
    }
    input{
        outline:none;
    }
    img{
        max-width:100%;
    }
    .hvr{
        cursor:pointer;
    }
    p{
        line-height:18px;
        font-weight:500;
    }
    b{
        font-weight:600;
    }

    .g-title{
        font-weight:bold;
        font-size:45px;
        letter-spacing:2px;
    }
    .g-cntr{
        text-align:center;
    }
    .g-login{
        border:1px solid rgba(0,0,0,0.1);
        padding:30px;
        .links{
            display:flex;
            border-bottom:1px solid rgba(0,0,0,0.1);
            margin-bottom:30px;
            p{
                padding:15px;
                margin:0px;
                margin-right:15px;
                position:relative;
                text-transform:capitalize;
                &.active{
                    border-bottom:2px solid black;
                }
                &:hover{
                    text-decoration:underline;
                    cursor:pointer;
                }
                small{
                    position:absolute;
                    margin-left:15px;
                    display:block;
                    left:100%;
                    top:0px;
                    width:200px;
                    background:#f6e2ab;
                    padding:10px 15px;
                    opacity:0;
                    transition:0.3s ease;
                    div {
                        width: 0; 
                        height: 0; 
                        border-top: 7px solid transparent;
                        border-bottom: 7px solid transparent; 
                        border-right:7px solid #f6e2ab; 
                        position:absolute;
                        margin-left:-22px;
                        margin-top:-24.5px;
                    }
                }
            }
        }
        .social-con{
            margin-bottom:15px;
            button{
                border:none;
                text-align:center;
                color:white;
                width:100%;
                padding:13px;
                position:relative;
                svg{
                    position:absolute;
                    left:15px;
                }
            }
            .fb-button{
                background:rgb(59, 89, 152);
            }
            .gl-button{
                background:#DD472C;
            }

        }
        form{
            .helpers{
                display:flex;
                justify-content:space-between;
                margin-bottom:30px;
                input{
                    margin-right:10px;
                }
                ins{
                    &:hover{
                        cursor:pointer;
                    }
                }
            }
            .helpers.policy{
                margin-top:20px;
                margin-bottom:0px;
                p{
                    display:inline;
                    font-size:${({ theme }) => theme.fontSizeSmall};
                    margin:0px;
                    a{
                        color:rgb(0, 102, 192);
                        font-weight:500;
                    }
                }
            }
            button{
                width:100%;
                background:black;
                color:white;
                border:none;
                padding:10px;
                text-transform:capitalize;
            }
        }
    }
    button{
        transition:0.5s ease;
        outline:none;
        opacity:1;
        &:active{
            opacity:0.7;
        }
    }

    .form-group{
        label{
            display:block;
        }
        input{
            width:100%;
            border:1px solid rgba(0,0,0,0.2);
            padding:6px 10px;
        }
        div{
            font-size:${({ theme }) => theme.fontSizeSmall};
            margin-top:10px;
            color:red;
            font-weight:500;
            svg{
                font-size:${({ theme }) => theme.fontSize};
                margin-top:-3px;
            }
        }
    }
    form.g-form{
        border:1px solid rgba(0,0,0,0.1);
        padding:20px;
        padding-top:0px;
        margin-bottom:15px;
        border-radius:12px;
        &.disabled{
            .bottom{
                input{
                    border-bottom:1px solid black !important;
                }
                select{
                    border-bottom:1px solid black !important;
                }
                textarea{
                    border-bottom:1px solid black !important;
                }
            }
        }
        &:last-child{
            margin-bottom:0px;
        }
        button{
            border:1px solid rgba(0,0,0,0.1);
            background:${({theme})=>theme.mainColor};
            color:white;
            padding:8px 30px;
            border-radius:8px;
            svg{
                margin-top:-3px;
                margin-left:5px;
            }
            &.white{
                background:white;
                color:black;
                border:1px solid;
            }
        }
        .top{
            display:flex;
            justify-content:space-between;
            align-items:center;
            border-bottom:1px solid rgba(0,0,0,0.1);
            padding:15px 20px;
            margin:0px -20px;
            margin-bottom:25px;
            
            .title{
                margin:0px;
                font-weight:500;
                font-size:${({ theme }) => theme.fontSize};
                svg{
                    margin-right:5px;
                    margin-top:-3px;
                }
            }
        }
        .bottom{
            .group{
                margin-bottom:15px;
                &:last-child{
                    margin-bottom:0px;
                }
                label{
                    display:block;
                }
                input{
                    width:100%;
                    padding:5px 0px;
                    color:black;
                    background:unset;
                    border:none;
                    border-bottom:none;
                    margin-bottom:10px;
                    font-weight:500;
                    &::placeholder{
                        opacity:0.5;
                    }
                }
                select{
                    padding:5px 0px;
                    width:100%;
                    border:none;
                    outline:none;
                    font-weight:500;
                    margin-bottom:10px;
                    height:29px;
                    color:black;
                    opacity:1;
                }
                textarea{
                    padding:5px 0px;
                    width:100%;
                    border:none;
                    font-weight:500;
                    outline:none;
                    margin-bottom:10px;
                    min-height:29px;
                    height:29px;
                    color:black;
                    &::placeholder{
                        color:black;
                        opacity:0.3;
                    }
                }
                div{
                    font-size:${({ theme }) => theme.fontSizeSmall};
                    color:red;
                    font-weight:500;
                    svg{
                        font-size:${({ theme }) => theme.fontSize};
                        margin-top:-3px;
                    }
                }
                .section-group{
                    &:after{
                        content:"hehe";
                        display:block;
                    }
                }
            }
        }
    }
    .line-g{
        &::-webkit-scrollbar {
            width: 4px;
        }
        
        &::-webkit-scrollbar-track {
            box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        }
        
        &::-webkit-scrollbar-thumb {
            background-color: rgba(0,0,0,0.3);
            outline: 1px solid slategrey;
        }
    }

    ${'' /* 3rd party css customization */}
    .rec-carousel-item{
        display:flex;
        align-items:center;
    }
    .rec-pagination{
        button{

        }
        .rec-dot_active{
            box-shadow:0 0 1px 3px ${({ theme }) => theme.mainColor};
            background:white;
        }
    }
    .rec-arrow{
        background-color: rgba(255,255,255,0.6);
        outline:none;
        &:hover{
            background:${({ theme }) => theme.mainColor} !important;
        }
        &:focus{
            background:white;
            color:#333;
        }
    }
    .notifications-component{
        z-index:1000;
        .notification__item--default{
            background:black;
            color:white;
            border-left: unset;
            border-radius:0px;
            border:1px solid white;
            .notification__content{
                .notification__title{
                }
                .notification__message{
                    font-size:${({ theme }) => theme.fontSizeSmall};
                }
                .notification__timer{
                    background:white;
                    .notification__timer-filler{
                        background:${({ theme }) => theme.mainColor2};
                    }
                }
            }
        }
        .notification__item--danger{
            color:white;
            .notification__content{
                .notification__title{
                    font-weight:600;
                    margin-bottom:5px;
                }
            }
        }
        .notification__item--warning{
            color:white;
            background-image:linear-gradient(to bottom right, ${({theme})=>theme.mainColor}, ${({theme})=>theme.mainColor2});
        }
        .notification__item--success{
            background:white;
            border-color:#28a745;
            padding-left:8px solid #28a745;
            .notification__title{
                &:before{
                    content:"✓   ";
                    color:#28a745;
                    font-weight:bold;
                }
                font-weight:500;
            }
            .notification__timer{
                background:#28a745;
            }
        }
    }
    
    @media only screen and (max-width: 768px){
        overflow-x:hidden;
        .g-title{
            font-size:20px;
        }
    }
`
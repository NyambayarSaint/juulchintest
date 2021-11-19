import { MenuContext } from '@/components/miscs/ContextMenuProvider';
import { useContext } from "react";
import React from 'react';
import styled from 'styled-components';
import FooterContact from './FooterContact';
import FooterItem from './FooterItem';
import Address from './Address';

const Footer = () => {
   const { general } = useContext(MenuContext);    

      
    return (
        <Container>
            <footer>
                <div className="container">
                    <div className="row pt-59"> 
                        <div className="col-lg-12">
                            <div className="row pt-50">  
                                <FooterContact phones={general.phones.phone} emails ={general.emails.email}/>
                                {  
                                    general.footer.map((el, index) => (
                                        <FooterItem key={index} item={el}/>
                                    ))
                                }
                                <Address socials={general.socials.social} location={general.location} />                                
                            </div>
                            <hr/>
                            <div className="copyright">
                                { general.copyright}                                
                            </div>
                        </div>
                    </div>  
                </div>  
            </footer>    
        </Container>
    );
};

export default Footer;

const Container = styled.div`
    footer {
        background: #F8F8F8;
    }
    .title{
        font-family: PT Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 23px;
        letter-spacing: 0.08em;
        color: #000000;
        text-transform:uppercase;
        padding-bottom: 24px;
    }
    .list-unstyled {
        list-style-image: initial;
    }
    .mb {
        margin-bottom: 0.5rem !important;
    }

    ul > li{
        padding: 4px 0px;
    }

    .text-underline {
        text-decoration-line: underline;
    }

    .list-title{
        font-family: PT Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 13px;
        line-height: 17px;
        /* identical to box height */
        letter-spacing: 0.08em;
        color: rgba(0, 0, 0, 0.5);
    }

    /* padding */ 
    .pt-59{
        padding-top: 59px;
    }
    .copyright{
        padding-bottom: 24px;
        font-family: PT Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: 0.08em;
        color: rgba(0, 0, 0, 0.5);
    }  
    .pb-24{
        padding-bottom: 24px;
    }   
    .pt-30{
        padding-top: 30px;
    } 
    .pr-30{
        padding-right: 30px;
    }    

`
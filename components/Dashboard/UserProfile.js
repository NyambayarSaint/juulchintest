import React from 'react';
import styled from 'styled-components';
import { Ecommerce } from '../miscs/ContextEcommerceProvider';
import Link from 'next/link'
import { useRouter } from 'next/router'

const UserProfile = (props) => {
    const { user, set } = React.useContext(Ecommerce);
    const router = useRouter();

    // console.log(user)
    const firstName = user.hasOwnProperty('firstname') ? user.firstname : null;
    const lastName = user.hasOwnProperty('lastname') ? user.lastname.slice(0, 1) : null;
    const fullName = (firstName && lastName) ? firstName +' '+ lastName + '. ' : null;

    return (
        <Container>  
                <div className="user-info">
                    <img src="/img/profile.png" width="180" className="user-pic" />
                        { fullName !==null && <div><h5 className="user-name">{fullName}</h5></div> }
                        <h5 className="user-email">{user.email}</h5>
                    <div className="wallet-wrap" style={{ textAlign: "left"}}>
                        <img src="/img/wallet.png" className="wallet"/>
                        <div className="wallet-right">
                            <div>Таны хэтэвч</div>
                            <div className="amount"><strong>0₮</strong></div>
                        </div>
                    </div>

                    <div className="flex flex-column pt-30 ">
                        <Link href="/user/profile" >
                            <button className={"mt-13 button " +('/user/profile' === router.route  ? 'active' : '' ) + ""} >
                                Хувийн мэдээлэл
                            </button>                                
                        </Link>                        
                        <Link href="/user/orders">
                            <button className={"mt-13 button " +('/user/orders' === router.route  ? 'active' : '' ) + ""} >
                                Миний захиалгууд
                            </button>           
                        </Link>                     
                        <Link href="/user/wishlist" >
                            <button className={"mt-13 button " +('/user/wishlist' === router.route  ? 'active' : '' ) + ""} >
                                Хүслийн жагсаалт
                            </button>                                
                        </Link>
                        <Link href="/user/logout" >
                        <button className="mt-13 button">Гарах</button>                                
                        </Link>
                    </div>
                </div> 
        </Container>
    );
};

export default UserProfile;

const Container = styled.div`    
    display:block;        
    width:100%;
    

    .wallet-wrap{
        display:flex;
        width:230px;       
        margin-top:40px;               
    }

    .wallet{
        align-self: flex-end
    }

    @media only screen and (max-width: 768px){
        margin:0 5px;
        padding:0 10px;       

        .hidden-sm {
            display: none !important;
        }
    }

    .fix-size{
        display:block;        
        margin-top:40px;
        float:right;
    }                   

    .top{
        margin-top:30px;
    }

    .smallTitle{
        font-family: PT Sans;
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        line-height: 18px;
        letter-spacing: 0.04em;
        padding: 15px 0 5px 0;
    }

    .pull-right{
        float:right;
    }

    .title{
        font-family: PT Sans;
        font-style: normal;
        font-weight: bold;
        font-size: 20px;
        line-height: 26px;
        letter-spacing: 0.04em;
        color: #5A5A5A;
    }

    .formInput{
        color: #5A5A5A;
        display:block;
        width: 100%;        
        border: 1px solid rgba(27, 27, 27, 0.4);
        box-sizing: border-box;
        border-radius: 4px;
        line-height: 1.5;
        padding: 0.375rem 0.75rem;
    }

    .inline {
        display: block;
        width:100%
    }
    
    .pl-max{
        padding-left: 85px;
    }
    
    .ml-max{
        padding-left: 90px;
    }

    .pt-34{
        padding-top: 34px;
    }

    .primaryButton{                
        text-align:right;
        font-size: 14px;
        font-weight: bold;
        padding:11px 30px;
        color: #fff;
        background: #334195;
        border-radius: 4px;                
    }
    
    .flex-end {
        justify-content: end;
    }   
`;

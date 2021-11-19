import React from 'react';
import styled from 'styled-components';
import Profile from '@/components/Dashboard/UserInfo';
import Password from '@/components/Dashboard/Password';
import MobileConfirm from '@/components/Dashboard/MobileConfirm';
import ConfirmCode from '@/components/Dashboard/ConfirmCode';
import { Ecommerce } from '../miscs/ContextEcommerceProvider';

const Order = () => {

    const { user, set } = React.useContext(Ecommerce);

    console.log( user );
    return (
        <Container>
            <div className="container">
                {/* userifo */}
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-12">
                        <div className="user-info">
                            <img src="/img/profile.png" width="180" className="user-pic" />
                            <div>
                                <h5 className="user-name">{user.firstname}. {user.lastname.slice(0, 1)}</h5>
                            </div>
                                <h5 className="user-email">{user.email}</h5>

                            <div className="wallet-wrap" style={{ textAlign: "left"}}>
                                <img src="/img/wallet.png" className="wallet"/>
                                <div className="wallet-right">
                                    <div>Таны хэтэвч</div>
                                    <div className="amount"><strong>0₮</strong></div>
                                </div>
                            </div>

                            <div className="flex flex-column pt-30">
                                <button className="button active">Хувийн мэдээлэл</button>                                
                                <button className="mt-13 button">Миний захиалгууд</button>                                
                                <button className="mt-13 button">Хүслийн жагсаалт</button>                                
                                <button className="mt-13 button">Гарах</button>                                
                            </div>
                        </div> 
                    </div>                   
                    <div className="col-lg-8 col-md-8 col-sm-12">
                        <div class="left-wrapper">
                            <Profile />
                            <Password/>
                            <MobileConfirm/>                        
                            <ConfirmCode/>                       
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Order;

const Container = styled.div`
    padding:50px 0px;

    @media only screen and (max-width: 768px){
        margin:0 5px;
        padding:0 10px;    
        
        .left-wrapper{
            padding-left:0 !important
        }
    }

    .left-wrapper{
        padding-left: 84px;   
    }

    .active {        
        color: #fff !important;
        background: #334195 !important;
        text-transform: uppercase;
    }

    .wallet-wrap{
        display:flex;
        width:230px;       
        margin-top:40px;               
    }

    .wallet-right {
        font-size: 15px;      
        padding-left: 13px;        
    }

    .amount {
        padding-top:3px;
        font-size: 20px;        
    }

    .flex{
        display:flex;        
    }

    .flex-column{
        flex-direction: row;
        align-content: center;
    }

    h1{
        font-weight:400;
        margin-bottom:50px;
    }

    .con{
        display:flex;
        .left{
            flex:1;
            margin-right:7.5px;
        }
        .right{
            flex:1;
            margin-left:7.5px;
        }
    }
    .userLeft
    {
        flex: 0 0 auto;
        max-width: 32%;
    }

    .userRight
    {
        flex: 0 0 auto;
        max-width: 68%;
    }

    .user-info{
        // width:340px;    
        display: flex;        
        flex-direction: column;                
        background: #FFFFFF;            
        align-items: center;
        align-content: flex-start;         
        box-shadow: 0px 4px 6px rgba(123, 123, 123, 0.25);
        padding-bottom: 56px;
    }

    .user-pic {
        margin-top: 54px;
        border-radius:50%        
    }    

    .user-name {
        font-family: PT Sans;
        font-style: normal;
        font-weight: bold;
        font-size: 20px;  
        padding-top:15px;   
        margin-bottom:0;   
        padding-bottom:0;
    }

    .user-email {
        font-family: PT Sans;
        font-style: normal;
        font-size: 15px;
        padding-top:5px;    
        color: #5A5A5A;  
    }
    
    .list-unstyled {
        list-style-image: initial;
    }
    
    .mt-13{
        margin-top:13px !important;
    }

    .pl-25{
        padding-left:25px;
    }

    .pt-30{
        padding-top: 30px !important
    }

    .primaryButton{
        font-size: 14px;
        font-weight: bold;
        padding:11px 30px;
        color: #fff;
        background: #334195;
        border-radius: 4px;            
    }

    .button{     
        display:block;
        text-align:center;
        width:230px;        
        font-size: 14px;
        font-weight: bold;
        padding:11px 30px;
        color: #334195;
        background: #fff;
        border-radius: 4px;   
        border: 1px solid #334195;
    }

    .button:hover{
        background: #334195;
        color: #fff;        
    }

    @media only screen and (max-width: 768px){
        padding:15px 0px;
        .con{
            flex-direction:column;
        }
        h1{
            font-size:${({theme})=>theme.fontSize2};
            font-weight:bold;
            margin-bottom:15px;
            border-bottom:1px solid rgba(0,0,0,0.1);
            padding-bottom:15px;
        }
        .left{
            margin:0px !important;
        }
        .right{
            margin-left:0px !important;
            margin-top:15px;
        }       
    }
   
`
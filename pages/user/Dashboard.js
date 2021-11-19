import React from 'react';
import styled from 'styled-components';
import Password from '@/components/Dashboard/Password';
import MobileConfirm from '@/components/Dashboard/MobileConfirm';
import ConfirmCode from '@/components/Dashboard/ConfirmCode';
import { Ecommerce } from '@/miscs/ContextEcommerceProvider';
import UserInfo from '@/components/Dashboard/UserInfo';
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Orders from './Orders'
import Wishlist from '@/components/Dashboard/Wishlist';
import Avatar from './Avatar'
import Axios from 'axios';

const defineTab = (query) => {
    if(query.tab){
        if (query.tab === 'orders') return 1
        else if (query.tab === 'wishlist') return 2
    } else return 0
}

const Dashboard = () => {

    const { user, set } = React.useContext(Ecommerce);
    const [wishlist, setWishlist] = React.useState([])
    
    React.useEffect(() => {
      handlewishlist(user.wishlists);             
    }, []);
    
    const handlewishlist = async (lists) => {        
        const tmp = []
        await Promise.all(lists.map(async(list) => {
            let res = await Axios(process.env.serverUrl + `/travels/${list.id || list}`)
            tmp.push(res.data)
        }))        
        setWishlist(tmp)
    }
    
    
    const router = useRouter();
    const [defaultTab, setDefaultTab] = React.useState(defineTab(router.query))
    const firstName = user.hasOwnProperty('firstname') ? user.firstname : null;
    const lastName = user.hasOwnProperty('lastname') ? user.lastname.slice(0, 1) : null;
    const fullName = (firstName && lastName) ? firstName + ' ' + lastName + '. ' : null;
    
    return (
        <Container>
            <Tabs defaultIndex={defaultTab}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-4">
                            <UserProfile>
                                <div className="user-info">
                                    <Avatar/>
                                    {fullName !== null && <div><h5 className="user-name">{fullName}</h5></div>}
                                    <h5 className="user-email">{user.email}</h5>
                                    <div className="wallet-wrap" style={{ textAlign: "left" }}>
                                        <img src="/img/wallet.png" className="wallet" />
                                        <div className="wallet-right">
                                            <div>Таны хэтэвч</div>
                                            <div className="amount"><strong>0₮</strong></div>
                                        </div>
                                    </div>

                                    <div className="flex flex-column pt-30 ">
                                        <TabList>
                                            <Tab onClick={()=>router.push({ pathname: '/user' }, undefined, { shallow: true })}>
                                                <button className={"mt-13 button " + ('/user/profile' === router.route ? 'active' : '') + ""} >
                                                    Хувийн мэдээлэл
                                                </button>
                                            </Tab>
                                            <Tab onClick={()=>router.push({ pathname: '/user', query: {tab: 'orders'} }, undefined, { shallow: true })}>
                                                <button className={"mt-13 button " + ('/user/orders' === router.route ? 'active' : '') + ""} >
                                                    Миний захиалгууд
                                                </button>
                                            </Tab>
                                            <Tab onClick={()=>router.push({ pathname: '/user', query: {tab: 'wishlist'} }, undefined, { shallow: true })}>
                                                <button className={"mt-13 button " + ('/user/wishlist' === router.route ? 'active' : '') + ""} >
                                                    Хүслийн жагсаалт
                                                </button>
                                            </Tab>
                                            <Tab>
                                                <Link href="user/logout">
                                                <button className="mt-13 button">Гарах</button>                                
                                                </Link>
                                            </Tab>
                                       
                                        </TabList>
                                    </div>
                                </div>
                            </UserProfile>
                        </div>
                        <div className="col-lg-8 col-md-8">
                            <div className="left-wrapper container">
                                <TabPanel>
                                    <UserInfo />
                                    <Password />
                                    <MobileConfirm />
                                    <ConfirmCode />
                                </TabPanel>
                                <TabPanel>
                                    <Orders/>
                                </TabPanel>
                                <TabPanel>
                                    <Wishlist data={wishlist} />
                                </TabPanel>
                                <TabPanel></TabPanel>
                            </div>
                        </div>
                    </div>
                </div>
            </Tabs>
        </Container>
    );
};

export default Dashboard;

const Container = styled.div`
    padding:50px 0px;

    .react-tabs__tab-list {
        border:none !important;
        text-align:center;       
    }

    .react-tabs__tab--selected {
        border:none !important;        
        >button {
            color: #fff !important;
            background: #334195 !important;
            text-transform: uppercase;
        }
    }

    @media only screen and (max-width: 768px){
        margin:0 5px;
        padding:0 10px;    
        
        .left-wrapper{
            padding-left:0 !important
        }

        .user-info{
            display: flex;        
            flex-direction: column;                
            background: #FFFFFF;            
            align-items: center;
            align-content: flex-start;         
            box-shadow: none !important;    
            padding-bottom: 0 !important;        
        }

        .button{     
            display:block;
            text-align:center;
            width:340px !important;        
            font-size: 14px;
            font-weight: bold;
            padding:11px 30px;
            color: #334195;
            background: #fff;
            border-radius: 4px;   
            border: 1px solid #334195;
        }
    }

    .left-wrapper{
        padding-left: 25px;   
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

    .user-info{
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
        
        h1{
            font-size:${({ theme }) => theme.fontSize2};
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

const UserProfile = styled.div`
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
`
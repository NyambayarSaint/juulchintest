import React from 'react';
import styled from 'styled-components';

const data = [
    {
        id: 'qpay',
        img: '/img/qpay.png',
        name: 'Qpay',
        caption: 'Данс эсвэл QR код',
        description: 'Төлбөрийг дансанд шилжүүлэх. Интернет банк, мобайл банк, QR код, дансаар төлбөр төлөх.',
        disabled: false
    },
    // {
    //     id: 'khanbank',
    //     img: '/img/khanbank.png',
    //     name: 'Хаан банк',
    //     caption: 'Картаар',
    //     description: 'ХААН банкны картаар төлбөр төлөх бол энд дарна уу. Интернет ПИН код шаардлагатай.',
    //     disabled: false
    // },
    // {
    //     id: 'creditcard',
    //     img: '/img/creditcard.png',
    //     name: 'Кредит карт',
    //     caption: 'Олон улсын худалдааны карт',
    //     description: 'Олон улсын худалдааны картаар төлөх бол энд дарна уу. Visa, Master карт гэх мэт.',
    //     disabled: true
    // },
]

const Paymentoptions = ({ type, change }) => {
    return (
        <Container>
            <div className="row">
                {data.map(bank => (
                    <div className="col-md-6" onClick={() => !bank.disabled && change(bank.id)} key={Math.random()}>
                        <div className={`box ${bank.disabled && 'disabled'} ${type === bank.id && 'selected'}`}>
                            <div className="top">
                                <img src={bank.img} />
                                <div>
                                    <small>{bank.caption}</small>
                                    <p><b>{bank.name}</b></p>
                                </div>
                            </div>
                            <div className="bottom">
                                <small>{bank.description}</small>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </Container>
    );
};

export default Paymentoptions;

const Container = styled.div`
    .box{
        padding:15px;
        border:2px solid rgba(0,0,0,0.1);
        margin-bottom:30px;
        box-sizing:border-box;
        transition:0.3s ease;
        &:hover{
            cursor:pointer;
        }
        &.disabled{
            &:hover{
                cursor:not-allowed;
                border:2px solid rgba(0,0,0,0.1);
            }
        }
        &.selected{
            border:2px solid ${({ theme }) => theme.mainColor2};
        }
        .top{
            display:flex;
            img{
                margin-right:15px;
                width:35px;
                align-self:flex-start;
            }
        }
        small{
            font-weight:500;
        }
    }
`
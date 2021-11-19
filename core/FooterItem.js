import React from 'react';
import styled from 'styled-components';
import Link from 'next/link'

const FooterItem = (props) => {
    
    return (
        <div className="col-lg-3" key={props.item.id}>
            <div className="title">{ props.item.caption }</div>
            <ul className="list-unstyled">
                {
                    props.item.list.map((item, index) => (                        
                        <li key={index} className="list-title">
                            <Link href={item.link} key={index}>
                                { item.title}
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>   
    )
}

export default FooterItem;

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
    }
    .list-unstyled {
        list-style-image: initial;
    }
    .mb {
        margin-bottom: 0.5rem !important;
    }
`

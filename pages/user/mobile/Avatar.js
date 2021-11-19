import { Ecommerce } from '@/components/miscs/ContextEcommerceProvider';
import React from 'react';
import styled from 'styled-components';

const Avatar = () => {
    const { user } = React.useContext(Ecommerce);
    const firstName = user.hasOwnProperty('firstname') ? user.firstname : null;
    const lastName = user.hasOwnProperty('lastname') ? user.lastname.slice(0, 1) : null;
    const fullName = (firstName && lastName) ? firstName + ' ' + lastName + '. ' : null;
    return (        
        <div className="user-info">
            <img src="/img/profile.png" width="180" className="user-pic" />
            <div className="desc">
                {fullName !== null && <div><h5 className="user-name">{fullName}</h5></div>}
                <h5 className="user-email">{user.email}</h5>
            </div>
        </div>
        
    );
};

export default Avatar;

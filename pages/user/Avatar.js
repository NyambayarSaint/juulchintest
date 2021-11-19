import { Ecommerce } from '@/components/miscs/ContextEcommerceProvider';
import minimize from '@/components/miscs/minimize';
import React from 'react';
import styled from 'styled-components';
import {FaPencilAlt} from 'react-icons/fa'
import nProgress from 'nprogress';

const Avatar = () => {
    const { user, set } = React.useContext(Ecommerce)
    const formRef = React.useRef()
    const handleChange = () => {
        const request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (request.readyState == XMLHttpRequest.DONE) {
                if(request.status === 200) {
                    set({user: { ...user, avatar: JSON.parse(request.responseText)[0] }})
                    return nProgress.done()
                }
                else return nProgress.done()
            }
        }
        nProgress.start()
        request.open('POST', process.env.serverUrl + '/upload');
        request.send(new FormData(formRef.current))
    }
    return (
        <Container>
            <img src={minimize(user.avatar, 'medium')}/>
            <form ref={formRef}>
                <input type="text" name="ref" value="user" />
                <input type="text" name="source" value="users-permissions" />
                <input type="text" name="refId" value={user.id} />
                <input type="text" name="field" value="avatar" />
                <input id="image_element" onChange={handleChange} type="file" name="files" accept="image/png, image/gif, image/jpeg" />
                <span>Зураг солих <FaPencilAlt/></span>
            </form>
        </Container>
    );
};

export default Avatar;

const Container = styled.div `
    border:2px solid rgba(0,0,0,0.1);
    overflow: hidden;
    position: relative;
    img{
        width: 180px;
        height: 180px;
        object-fit: cover;
        object-position: center;
    }
    form{
        position: absolute;
        bottom: 0px;
        left: 0px;
        right: 0px;
        background: rgba(0,0,0,0.6);
        color: white;
        text-align: center;
        padding:10px 0px;
        cursor: pointer;
        input{
            display: none;
        }
        #image_element{
            display: block;
            position: absolute;
            left: 0px;
            right: 0px;
            top: 0px;
            bottom: 0px;
            opacity: 0;
            cursor: pointer;
        }
    }
`
import React from 'react';
import { MenuContext } from '@/miscs/ContextMenuProvider'
import { useContext } from "react";
import styled from 'styled-components';
import HeaderDesktop from './HeaderDesktop';
import HeaderMobile from './HeaderMobile';

const Header = () => {
    const { config } = useContext(MenuContext);
    return (
        <Container>
            <>
                {config.width > 768 && <HeaderDesktop />}
                {config.width <= 768 && <HeaderMobile />}
            </>
        </Container>
    );
};

export default Header;

const Container = styled.div`
`

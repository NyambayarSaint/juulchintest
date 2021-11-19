import React from "react";
import { motion } from "framer-motion";
import Root from "@/core/Root";
import ResolveComponent from "@/components/dynamic/ResolveComponent"
import checkLanguage from "@/components/miscs/checkLanguage";
import {MenuContext} from '@/miscs/ContextMenuProvider'
import Detail from './Detail'

const Index = ({data}) => {
    const {completelyLoaded} = React.useContext(MenuContext);
    return (
        <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Root>
                {completelyLoaded && <Detail data={data}/>}
            </Root>
        </motion.div>
    );
};

export default Index;

export async function getServerSideProps({params, req}){
    let res = await checkLanguage(`/blogs/${params.id}`, req, true);    
    return {props: {data: res.data}}
}
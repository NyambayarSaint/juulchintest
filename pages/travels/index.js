import styled from "styled-components"
import { motion } from "framer-motion";
import { useRouter } from "next/router";

import Root from "@/core/Root"

const Index = () => {
  return (
    <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Root>
        <Container className="container">
          <div className="row">
            
          </div>
        </Container>
      </Root>
    </motion.div>
  )
}

export default Index

const Container = styled.div`

`
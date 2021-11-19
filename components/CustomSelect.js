import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { BsChevronDown } from 'react-icons/bs';
import styled from 'styled-components';

const CustomSelect = ({ data, handleChange, value, placeholder }) => {
  const [show, setShow] = React.useState(false)
  React.useEffect(() => {
    setShow(false)
  }, [value])
  return (
    <Select onClick={() => setShow(!show)}>
      <div className="placeholder"> {value ? value : placeholder} <span><BsChevronDown /></span></div>
      <AnimatePresence>
        {(show && data) &&
          <motion.div initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }} className="options_wrapper">
            {data.map(instance => <div className="option" onClick={() => handleChange(instance)} key={Math.random()}>
              {instance}
            </div>)}
          </motion.div>
        }
      </AnimatePresence>
    </Select>
  );
};

export default CustomSelect;

const Select = styled.div`
  z-index: 50;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  cursor: pointer;
  position: relative;
  .placeholder {
    font-weight: bold;
    color: #777;
    display: flex;
    align-items: center;
    span {
      color: ${(props) => props.theme.mainColor};
      font-size: 18px;
      margin-left: auto;
    }
  }
  .options_wrapper {
    position: absolute;
    border: 1px solid rgba(0,0,0,0.1);
    background: white;
    left: -15px;
    right: 0px;
    top: calc(100% + 10px);
    max-height: 300px;
    overflow-y: scroll;
    .option {
      padding: 10px 15px;
      &:hover {
        background: rgba(0,0,0,0.1);
      }
    }
  }
`
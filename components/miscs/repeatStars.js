import { RiStarFill, RiStarLine } from 'react-icons/ri';
import repeater from '@/miscs/repeater';

const repeatStars = (num) => {
    return (
        <>
            {repeater(num).map(st => <RiStarFill key={Math.random()} />)}
            {repeater((5 % num)).map(st => <RiStarLine key={Math.random()} />)}
            {num === 2 && repeater((2)).map(st => <RiStarLine key={Math.random()} />)}
            {num === 1 && repeater((4)).map(st => <RiStarLine key={Math.random()} />)}
            {num === 0 && repeater((5)).map(st => <RiStarLine key={Math.random()} />)}
        </>
    )
};

export default repeatStars;
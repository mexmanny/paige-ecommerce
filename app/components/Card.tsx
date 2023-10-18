import { CardProps } from '../types';

const Card = ({ id, name, color, type, cost }: CardProps) => {
  return (
    <>
      <li key={id}>
        <p>Name: {name}</p>
        <p>Color: {color}</p>
        <p>Type: ${type}</p>
        <p>Cost: ${cost}</p>
      </li>
    </>
  );
};

export default Card;

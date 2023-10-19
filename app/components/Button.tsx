import { ButtonProps } from '../types';

const Button = ({ id, type, onClick, label }: ButtonProps) => {
  return (
    <>
      <button id={id} type={type} onClick={onClick}>
        {label}
      </button>
    </>
  );
};

export default Button;

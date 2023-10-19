import { InputProps } from '../types';

const Input = ({ placeHolder, onChange, type, id, term }: InputProps) => {
  return (
    <>
      <input
        id={id}
        type={type}
        placeholder={placeHolder}
        onChange={onChange}
        value={term}
      ></input>
    </>
  );
};

export default Input;

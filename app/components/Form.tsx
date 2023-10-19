import { FormProps } from '../types';

const Form = ({ id, formRole, formLabel, onSubmit, children }: FormProps) => {
  return (
    <form id={id} role={formRole} aria-label={formLabel}>
      {children}
    </form>
  );
};

export default Form;

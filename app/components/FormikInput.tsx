import { useField } from 'formik';
import React, { RefObject } from 'react';
interface Props {
  type?: string;
  className?: string;
  WrapperClass?: string;
  placeholder?: string;
  placeholderColor?: string;
  textColor?: string;
  name?: string;
  border?: boolean;
  disabled?: boolean;
  value?: string;
  passRef?: RefObject<any>;
  onChange?: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  onBlur?: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  onFocus?: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  theme?: 'dark' | 'light';
  rows?: number;
  maxLength?: number;
  customBgClass?: string;
}
const darkClass = 'bg-white border-gray-150';
const lightClass = 'bg-white';
const InputComponent = <P extends Props>(props: P) => {
  const {
    className,
    type,
    name = '',
    disabled = false,
    placeholder = '',
    placeholderColor = 'placeholder-gray-300',
    textColor = 'text-black',
    onChange,
    onBlur,
    onFocus,
    passRef,
    theme = 'dark',
    WrapperClass = '',
    rows = 1,
    customBgClass = '',
    ...otherPops
  } = props;
  const [field, meta] = useField(name);
  return (
    <div className={WrapperClass}>
      {type === 'textarea' ? (
        <textarea
          minrows={rows}
          name={name}
          ref={passRef}
          autoComplete="off"
          placeholder={placeholder}
          onChange={(e) => {
            field.onChange(e);
            onChange && onChange(e);
          }}
          disabled={disabled}
          onBlur={(e) => {
            field.onBlur(e);
            onBlur && onBlur(e);
          }}
          onFocus={(e) => {
            onFocus && onFocus(e);
          }}
          value={field.value || ''}
          className={`
              ${theme === 'dark' ? darkClass : lightClass}
              ${placeholderColor} ${textColor} font-sans-serif w-full rounded-lg border px-4 py-3 text-base focus:outline-none
              ${
                meta.error && meta.touched
                  ? 'border-red-400'
                  : 'focus:shadow-gray-inset-input hover:border-gray-250'
              }
              ${className}
            `}
          {...otherPops}
        />
      ) : (
        <input
          type={type || 'text'}
          name={name}
          ref={passRef}
          autoComplete="off"
          disabled={disabled}
          placeholder={placeholder}
          className={`
              ${
                customBgClass
                  ? customBgClass
                  : theme === 'dark'
                  ? darkClass
                  : lightClass
              }
              ${placeholderColor} ${textColor} h-11 w-full rounded-lg border px-3 text-lg focus:outline-none
              ${
                meta.error && meta.touched
                  ? 'border-red-400'
                  : 'focus:shadow-wh-inset-input hover:border-gray-250'
              } ${className}
            `}
          onChange={(e) => {
            field.onChange(e);
            onChange && onChange(e);
          }}
          onBlur={(e) => {
            field.onBlur(e);
            onBlur && onBlur(e);
          }}
          onFocus={(e) => {
            onFocus && onFocus(e);
          }}
          value={field.value || ''}
          {...otherPops}
        />
      )}
      <div className="mt-2px flex flex-wrap text-sm text-red-400">
        {meta.error}
      </div>
    </div>
  );
};
export const FormikInput = InputComponent;

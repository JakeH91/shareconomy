import { useFormContext } from "react-hook-form";

type InputWithLabelProps = React.InputHTMLAttributes<HTMLInputElement> & {
  styles?: { readonly [key: string]: string };
  label: string;
};

export default function InputWithLabel({
  styles,
  id,
  label,
  type,
  autoComplete,
  value,
  disabled,
}: InputWithLabelProps): React.ReactElement {
  const { register } = useFormContext();

  return (
    <>
      <label className={styles?.label} htmlFor={id}>
        {label}
      </label>
      <input
        className={styles?.input}
        type={type}
        id={id}
        defaultValue={value}
        {...register(id, { value, disabled })}
        autoComplete={autoComplete}
      />
    </>
  );
}

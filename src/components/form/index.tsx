import React, { useState } from 'react';
import { FormData, FormError } from '@/types/form';
import { FieldError } from '@/types/field';
import { type BaseSchema } from '@/utils/schema';

export interface FormChildProps<TData extends FormData> {
  id: string;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  values: TData;
  errors: FormError<TData>;
  isValid: boolean;
}

export interface Actions<TData> {
  validate: (validationSchema: ValidationSchema<TData>) => boolean;
}

export interface FormProps<TData extends FormData> {
  id: string;
  children: (props: FormChildProps<TData>) => React.ReactNode;
  onSubmit: (values: TData, actions: Actions<TData>) => Promise<void>;
  initialData?: TData;
  validationSchema?: ValidationSchema<TData>;
}

const getInitialError = <TData extends FormData>(data?: TData) => {
  const error: FormError<TData> = {} as FormError<TData>;
  for (const key in data) {
    error[key] = {
      success: true,
      message: undefined,
    };
  }
  return error;
};

export type ValidationSchema<TData> = {
  [K in keyof TData]?: BaseSchema;
};

const Form = <TData extends FormData>(props: FormProps<TData>) => {
  const [values, setValues] = useState<TData>((props.initialData ?? {}) as any);
  const [errors, setErrors] = useState<FormError<TData>>(
    getInitialError(props.initialData)
  );

  const setFieldError = (key: string, value: FieldError) =>
    setErrors((prev) => ({
      ...prev,
      [key]: value,
    }));

  const actions = {
    validate: (validationSchema: ValidationSchema<TData>) => {
      let isValid = true;
      for (const [fieldKey, schema] of Object.entries(validationSchema)) {
        let fieldError = { success: true } as FieldError;

        if (schema) {
          const error = schema.validateSync(values[fieldKey]);
          if (error) {
            fieldError = {
              success: false,
              message: error,
            };
            isValid = false;
          }
        }
        setFieldError(fieldKey, fieldError);
      }

      return isValid;
    },
  };

  return (
    <form
      id={props.id}
      className="bg-white shadow-md rounded-lg p-6"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (props.validationSchema) {
          const isValid = actions.validate(props.validationSchema);
          if (!isValid) return;
        }

        props.onSubmit(values, actions);
      }}
    >
      {props.children({
        id: props.id,
        handleChange: (
          e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
        ) => {
          setErrors({
            ...errors,
            [e.target.name]: {
              success: true,
            },
          });
          let newValue: string | string[] = e.target.value;
          if (e.target.multiple) {
            const prev = (values[e.target.name] ?? []) as string[];
            newValue = [...prev, e.target.value];
          }
          setValues({
            ...values,
            [e.target.name]: newValue,
          });
        },
        values,
        errors,
        isValid: Object.values(errors).every((e) => e.success),
      })}
    </form>
  );
};

export default Form;

import { isDisabled } from '@testing-library/user-event/dist/utils';
import { Field } from 'formik';
import React, { ReactElement } from 'react';

interface InputFieldProps {
    type: string;
    name: string;
    placeholder: string;
    errors: any;
    touched: any;
    className: string;
    disabled?: boolean;
}
export default function FormLayout({ type, name, placeholder, errors, touched, className, disabled }: InputFieldProps): ReactElement {
    return (
        <div className="mb-4">
            <Field
                className={className}
                type={type}
                name={name}
                placeholder={placeholder}
                disabled={disabled}
            />
            {errors[name] && touched[name] ? (
                <div className="text-red-500 text-xs ml-4 mt-2">{errors[name]}</div>
            ) : null}
        </div>
    );
}
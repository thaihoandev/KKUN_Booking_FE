import React from "react";

function FormField({ label, error, register, type = "text", ...props }) {
    return (
        <>
            <div className="form-inner mb-20">
                <label>
                    {label} <span>*</span>
                </label>
                {type === "textarea" ? (
                    <textarea {...register} {...props}></textarea>
                ) : (
                    <input type={type} {...register} {...props} />
                )}
                {error && <span className="text-danger">{error.message}</span>}
            </div>
        </>
    );
}

export default FormField;

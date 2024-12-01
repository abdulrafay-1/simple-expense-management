import React from "react"

export function Select({ register, options, name, ...rest }) {

    return (
        <select
            className="select select-bordered w-full max-w-xs"
            {...register(name)} {...rest}>
            {options.map((value) => (
                <option key={value}
                    value={value}>
                    {value}
                </option>
            ))}
        </select>
    )
}
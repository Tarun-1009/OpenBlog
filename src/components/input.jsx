import React,{useId}   from 'react';

const Input = React.forwardRef(({
     label, type, ...props
    }, ref) => {
    const id = useId()
    return
        <div className="input-group">
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                type={type}
                ref={ref}
            />
        </div>
})
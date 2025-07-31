import Joi from "joi-browser";

const validateProperty = (name, value, schema, setErrors) => {
    const derivedSchema = { [name]: schema[name] };
    const object = { [name]: value };
    const { error } = Joi.validate (object, derivedSchema);

    setErrors (errors => {
        const updatedErrors = {...errors};

        if (error) updatedErrors[name]= error.details[0].message;  
        else delete updatedErrors[name]; 
        
        return updatedErrors;
    })
}

export const handleChange = ({ currentTarget: input }, schema, setErrors, formData, setFormData) => {
    const { name, value } = input;

    if (name === 'role') {
        let role;
        role = (value === 'customer') ? false : true;
        return setFormData ({ ...formData, isAdmin: role }); 
    }

    validateProperty (name, value, schema, setErrors);
    setFormData ({ ...formData, [name]: value });
}

export const validateFunction = (formData, schema) => {
    const { error } = Joi.validate (formData, schema, { abortEarly: false });
    return error;
}

export const renderInputField = (label, type, placeholder, value, name, schema, errors, setErrors, formData, setFormData) => {
    return (
        <>
            <h2 className='text-white text-2xl'>{label}</h2>
            <input type={type} placeholder={placeholder} value={value} name={name} onChange={e => handleChange (e, schema, setErrors, formData, setFormData)} className='border border-white w-full m-2 px-3 py-1 rounded-2xl focus:outline-none focus:border-amber-100 placeholder-white/40 bg-transparent text-white' />
            { errors[name] && <div className='text-red-600 m-1'>{errors[name]}</div> }
        </>
    );
}

export const renderOptionsField = (schema, setErrors, formData, setFormData) => {
    return (
        <>
            <h2 className='text-white text-2xl'>Select Role</h2>
            <select name='role' onChange={e => handleChange (e, schema, setErrors, formData, setFormData)} className='text-white border border-white m-2 w-full rounded-2xl px-3 py-1 focus:outline-none focus:border-amber-100'>
                <option value='customer' className='bg-black text-white'>Customer</option>
                <option value='admin' className='bg-black text-white'>Admin</option>
            </select>
        </>
    );
}
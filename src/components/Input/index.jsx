import './style.css'
import '../../styles/variables.css'

export default function Input({ label, placeholder, type='text', value, onChange, error, ...props }) {
    const classname = `input ${error ? 'error' : ''}`;

    return (
        <div className='container'>
            <p className='label'>{label}</p>
            <input
                type={type}
                value={value}
                onChange={onChange}
                className={classname}
                placeholder={placeholder}
                {...props} 
            />
           {error && 
                <p className='error-message text-caption'>
                    {error}
                </p>
            }
        </div>
    )
}
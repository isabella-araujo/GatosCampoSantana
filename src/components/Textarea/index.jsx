import './style.css'
import '../../styles/variables.css'

export default function Textarea({ label, placeholder, value, onChange, error, ...props}) {
    const classname = `textarea ${error ? 'error' : ''}`;

    return (
        <div className='container'>
            <p className='label'>
                {label}
            </p>
            <textarea
                value={value}
                onChange={onChange}
                className={classname}
                placeholder={placeholder}
                {...props} 
            ></textarea>

           {error && 
                <p className='error-message text-caption'>
                    {error}
                </p>
            }
        </div>
    )
}
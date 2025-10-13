import './style.css'
import '../../styles/variables.css'

export default function Textarea({ label, placeholder, value, onChange, error, ...rest}) {
    const inputClassname = `textarea text-body1 ${error ? 'error' : ''}`;

    return (
        <div className='container'>
            <p className='label text-body1'>{label}</p>
            <textarea
                value={value}
                onChange={onChange}
                className={inputClassname}
                placeholder={placeholder}
                {...rest} 
            ></textarea>
           {error && <p className='error-message text-caption'>{error}</p>}
        </div>
    )
}
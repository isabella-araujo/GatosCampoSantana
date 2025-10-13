import './style.css'
import '../../styles/variables.css'

export default function Input({ label, placeholder, type='text', value, onChange, error, ...rest }) {
    const classname = `input text-body1 ${error ? 'error' : ''}`;

    return (
        <div className='container'>
            <p className='label text-body1'>{label}</p>
            <input
                type={type}
                value={value}
                onChange={onChange}
                className={classname}
                placeholder={placeholder}
                {...rest} 
            />
           {error && <p className='error-message text-caption'>{error}</p>}
        </div>
    )
}
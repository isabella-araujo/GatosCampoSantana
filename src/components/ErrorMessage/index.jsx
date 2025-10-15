import './style.css'

export default function ErrorMessage({children}) {
    return <p className='error-message text-caption'>
                {children}
            </p>
}
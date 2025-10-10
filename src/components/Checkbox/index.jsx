import './style.css'
import '../../styles/variables.css'
import { FaCheck } from "react-icons/fa6";

export default function Checkbox({ label, onClick, isChecked }) {
    const classname = `box ${isChecked ? 'checked' : ''}`

    return (
        <div className='container'>
            <div 
                className={classname}
                value={isChecked}
                onClick={onClick}
            >
                {isChecked && <FaCheck />}
            </div>
            <p className='text-body1'>{label}</p>
        </div>
    )
}
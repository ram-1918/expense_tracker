import { VerifyEmail } from "../users/UpdateProfile";

const inputStyles = 'w-64 p-2 text-lg font-normal border-b border-b-red-200 outline-none bg-inherit'
const trStyles = 'w-full flex flex-row justify-center items-center space-x-2 py-2';
const labelStyles = 'w-48 text-right text-lg font-light p-2';

const BaseDisplay = ({label, value, setField, type}) => {
    return (
        <>
            <div className={`${trStyles}`}>
                <label className={`${labelStyles} `}>{label}</label>
                { 
                !(label === 'EmployeeID' || label === 'Email' || label === 'Password') ? 
                <input type={type} className={`${inputStyles} `} name={value} value={value} onChange={(e) => setField(e.target.value) } /> :
                <input type={type} className={`${inputStyles} `} name={value} value={value} onChange={(e) => setField(e.target.value) } disabled /> 
            }
            </div> 
        </>

    )
}

export default BaseDisplay;
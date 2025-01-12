import Tooltip from "./Tooltip";

// const userButtonStyle = 'border-none rounded-full w-32 p-2 bg-green-600 text-white hover:opacity-80';
const userInputStyle = 'border-none w-80 h-10 px-2 bg-gray-100 text-md outline-none placeholder:text-gray-450 placeholder:text-sm';
const userTextArea = 'border-none w-80 p-2 bg-gray-100 text-md outline-none placeholder:text-gray-450 placeholder:text-sm';
const labelStyles = 'w-full text-md font-light flex-row-style space-x-2';

const BaseField = ({label, type, placeholder, setField, txtarea=false, register=true}) => {
    const title = <label className={labelStyles}> <span>{label} </span>{(label === 'Password' && register) && <Tooltip type="password"/>} {label === 'Comment' && <Tooltip type="comment"/>} </label>
    const input = <input onChange={(e) => setField(e.target.value)} type={type} placeholder={placeholder} className={`${userInputStyle}`} required/>
    const textarea = <textarea onChange={(e) => setField(e.target.value)} rows="3" placeholder={placeholder} className={`${userTextArea}`} required />

    return (
        
        !txtarea ? 
            <span>
                {/* <label className={labelStyles}><span>{label} </span>{(label === 'Password' && register) && <Tooltip type="password"/>}</label>  */}
                {/* <input onChange={(e) => setField(e.target.value)} type={type} placeholder={placeholder} className={`${userInputStyle}`} required/> */}
                {title}
                {input}
            </span>
            :
            <span>
                {title}
                {textarea}
                {/* <label className={labelStyles}><span>{label} </span>{label === 'Comment' && <Tooltip type="comment"/>}</label>  */}
                {/* <textarea onChange={(e) => setField(e.target.value)} rows="3" placeholder={placeholder} className={`${userTextArea}`} required /> */}
            </span>
        
    )
}

export default BaseField;
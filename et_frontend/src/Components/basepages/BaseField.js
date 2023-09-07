
const BaseField = ({legend, type, plholder, value, setField, txtarea=false}) => {
    const inputStyles = 'bg-inherit outline-0 p-2 w-72 text-md';
    const fieldsetStyles = 'border border-gray-400 text-left rounded-md flex justify-center items-center';
    const legendStyles = 'mx-4 text-md font-light px-2';
    const buttonStyles = 'border w-24 border-cyan-600 outline-none rounded-lg p-[4px] transition duration-300 hover:outline-none hover:border-cyan-600 hover:bg-cyan-600 hover:text-white';
    return (
            <fieldset className={`${fieldsetStyles}`}>
                <legend className={`${legendStyles}`}>{legend}</legend>
                {!txtarea ? 
                    <input 
                        className={`${inputStyles}`}
                        type={type}
                        placeholder={plholder}
                        value={value}
                        onChange = {(e) => setField(e.target.value)} required />
                    :
                    <textarea 
                        className={`${inputStyles}`}
                        placeholder={plholder}
                        value={value}
                        onChange = {(e) => setField(e.target.value)} required >
                    </textarea>

                    }
            </fieldset>
    )
}

export default BaseField;
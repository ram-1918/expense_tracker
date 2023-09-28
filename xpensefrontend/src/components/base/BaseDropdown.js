
const dropdownStyles = 'w-32 border border-stone-400 rounded-lg p-2 bg-[#fff] appearence-none focus:outline-none focus:shadow-lg focus:border-[#0066ff]';
const optionStyles = 'appearence-none border-none bg-[#fff] text-[#333] hover:bg-[#f0f0f0]';

const BaseDropdown = ({options, setValueFunction, value, rarecase=''}) => {
    return (
        <select className={dropdownStyles} value={value} onChange={(e) => rarecase ? setValueFunction(prev => {console.log(prev, rarecase, e.target.value); return {...prev, [rarecase]: e.target.value }}) : setValueFunction(e.target.value)}>
            {Object.keys(options).map((option, idx) => (
                <option key={idx} className={optionStyles}>
                    {option}
                </option>
            ))}
        </select>
    )
}

export default BaseDropdown;
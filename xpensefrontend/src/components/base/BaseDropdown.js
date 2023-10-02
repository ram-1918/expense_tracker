
const dropdownStyles = 'w-32 h-9 border border-stone-400 rounded-lg bg-[#fff] appearence-none focus:outline-none focus:shadow-lg focus:border-[#0066ff]';
const optionStyles = 'appearence-none border-none bg-[#fff] text-[#333] hover:bg-[#f0f0f0]';

const BaseDropdown = ({options, setValueFunction, value, rarecase='', mapper=null}) => {
    const handleSelection = (e) => {
        rarecase ? 
        setValueFunction(prev => (
            {...prev, [rarecase]: mapper ? mapper[e.target.value] : e.target.value }
            )) : 
        setValueFunction(e.target.value)
    }
    return (
        <select className={dropdownStyles} onChange={(e) => handleSelection(e)}>
            <option default hidden>{rarecase}</option>
            {Object.keys(options).map((option, idx) => (
                <option key={idx} className={optionStyles}>
                    {option}
                </option>
            ))}
        </select>
    )
}

export default BaseDropdown;

const dropdownStyles = 'w-36 h-8 border border-stone-400 rounded-md px-2 text-sm bg-[#fff] appearence-none focus:outline-none focus:shadow-lg focus:border-[#0066ff]';
const optionStyles = 'appearence-none border-none bg-[#fff] text-[#333] hover:bg-[#f0f0f0]';

const BaseDropdown = ({options, setValueFunction, title='', rarecase='', mapper=null}) => {
    const handleSelection = (e) => {
        rarecase ? 
        setValueFunction(prev => (
            {...prev, [rarecase]: mapper ? mapper[e.target.value] : e.target.value }
            )) : 
        setValueFunction(e.target.value)
    }
    return (
        <select className={dropdownStyles} onChange={(e) => handleSelection(e)}>
            <option default hidden>{rarecase || title}</option>
            {Object.keys(options).map((option, idx) => (
                <option key={idx} className={optionStyles}>
                    {option}
                </option>
            ))}
        </select>
    )
}

export default BaseDropdown;
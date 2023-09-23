
// const dropdown = 'relative w-32 block border border-gray-400 rounded-lg text-center text-sm';
const dropdown = 'border border-slate-400 w-32 block rounded-lg cursor-pointer text-sm';
const dropdownContent = 'absolute list-none shadow-lg w-28 flex-col-style justify-center bg-white';
const dropdownOption = 'border-b border-gray-100 w-full px-2 text-neutral-500 cursor-pointer hover:bg-neutral-100';
const activeOption = dropdownOption + ' bg-neutral-200';
const labelStyles = 'w-full h-full text-neutral-600 flex-row-style justify-evenly';

const BaseDropdown = ({options, setShowFunction, show, setValueFunction, value, selectStyle}) => {
    const dropdownOptions = options.map((obj, idx) =>
     <li 
     onClick={() => {setValueFunction(obj); setShowFunction(prev => !prev)}} 
     key={idx} 
     className={`${value === obj ? activeOption : dropdownOption} `}>
        {obj}
    </li>)
    return (
        <div className={`${dropdown} ${value.includes('Choose') ? 'bg-white' : 'bg-blue-100 '}`}>
            <span className={labelStyles} onClick={() => setShowFunction(prev => !prev)}>
                <span className={value.includes('Choose') ? '' : selectStyle}>{value}</span>
            </span>
            {show && 
            <div className={dropdownContent}>
                {dropdownOptions}
            </div>
            }
        </div>
    )
}

export default BaseDropdown;
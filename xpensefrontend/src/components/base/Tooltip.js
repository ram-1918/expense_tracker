
const mark = 'border border-gray-500 rounded-full w-4 h-4 flex-row-style justify-center text-[0.8rem] cursor-pointer hover:scale-[1.03]';
const tooltipStyles = 'absolute border w-72 min-h-full flex-col-style justify-center left-0 bottom-[0] rounded-lg bg-slate-100 opacity-0 group-hover/tooltip:opacity-100 px-4 ml-2 mb-4 text-sm';
const Tooltip = ({type}) => {
    return (
        <span className='group/item relative flex-row-style justify-center h-10'>
            <span className={`group/tooltip ${mark}`}>?</span>
            {type === 'password' ? 
            <span className={tooltipStyles}>
                <li>atleast one number</li>
                <li>atleast one symbol (@.#$%^!&*)</li>
                <li>atleast one uppercase & lowercase letters</li>
            </span>
            :
            <span className={tooltipStyles}>
                <li>Details about your role and company</li>
            </span>
            }
        </span>
    )
}

export default Tooltip;
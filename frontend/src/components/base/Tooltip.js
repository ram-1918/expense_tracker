
const outerdiv = 'group/item relative flex-row-style justify-center h-10';
const mark = 'group/tooltip border border-gray-500 rounded-full w-4 h-4 flex-row-style justify-center text-[0.8rem] font-semibold cursor-pointer hover:scale-[1.03]';
const tooltipStyles = 'absolute left-0 bottom-0 border rounded-md w-72 min-h-fit flex-col-style justify-center shadow-lg bg-white p-2 ml-2 mb-4 text-[0.8rem] hidden group-hover/item:block';
const listStyle = 'bg-white';
const Tooltip = ({type, msg=''}) => {
    const passwordrules = [
        'atleast one number', 
        'atleast one symbol (@.#$%^!&*)',
        'atleast one uppercase & lowercase letters'
    ]
    const commentrules = [
        'Include expected role and employee id'
    ]
    const tooltipMapper = {
        'password' : passwordrules.map((e) => <li className={listStyle}>{e}</li>),
        'comment': commentrules.map((e) => <li className={listStyle}>{e}</li>),
        'custom': <li>{msg}</li>
    }
    const tooltip = (type) => <span className={tooltipStyles}> {tooltipMapper[type]} </span>
    return (
        <span className={outerdiv}>
            <span className={mark}>?</span>
            {tooltip(type)}
        </span>
    )
}

export default Tooltip;
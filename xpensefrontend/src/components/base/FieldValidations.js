
const title = "text-gray-600 font-light";
const closeIcon = "fa fa-close text-red-500 font-extralight";
const tickIcon = "fa fa-check text-green-500 font-extralight";


const FieldValidations = ({setName, setEmail, setAmount, setexpensetitle, setTags}) => {
    const titleMapper = {
        'expense': 'Is Expense title valid?',
        'amount': 'Is Amount valid?',
        'tags': 'Are tags separated?',
        'email': 'Is Email address Valid?',
        'name': 'Is Name valid?'
    }
    return (
        <div className="border-0 w-[25%] h-[80%] flex-col-style mx-4 ">
            {setexpensetitle && <span><i className={closeIcon}></i> <span className={title}>Is Expense title valid?</span></span>}
            {setAmount && <span><i className={closeIcon}></i> <span className={title}>Is Amount valid?</span></span>}
            {setTags && <span><i className={closeIcon}></i> <span className={title}>Are tags separated?</span></span>}

            {setEmail && <span><i className={closeIcon}></i> <span className={title}>Is Email address Valid?</span></span>}
            {setName && <span><i className={closeIcon}></i> <span className={title}>is Name valid?</span></span>}
        </div>
    )
}

export default FieldValidations;
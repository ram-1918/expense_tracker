const FieldValidations = ({setName, setEmail, setAmount, setexpensetitle, setTags}) => {
    return (
        <div className="border-0 w-[25%] h-[80%] flex-col-style mx-4 ">
            {setexpensetitle && <span><i className="fa fa-close text-red-500 font-extralight"></i> <span className="text-gray-600 font-light">Is Expense title valid?</span></span>}
            {setAmount && <span><i className="fa fa-close text-red-500 font-extralight"></i> <span className="text-gray-600 font-light">Is Amount valid?</span></span>}
            {setTags && <span><i className="fa fa-close text-red-500 font-extralight"></i> <span className="text-gray-600 font-light">Are tags separated?</span></span>}

            {setEmail && <span><i className="fa fa-close text-red-500 font-extralight"></i> <span className="text-gray-600 font-light">Is Email address Valid?</span></span>}
            {setName && <span><i className="fa fa-close text-red-500 font-extralight"></i> <span className="text-gray-600 font-light">is Name valid?</span></span>}
        </div>
    )
}

export default FieldValidations;
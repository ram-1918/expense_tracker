
const BaseButton = ({text, type, mode, others}) => {
    let style = '';
    if(mode === 'user'){
        style = 'border border-cyan-600 outline-none rounded-lg p-2 transition duration-300 hover:outline-none hover:border-cyan-600 hover:bg-cyan-600 hover:text-white'
    }
    else if(mode === 'accept'){
        style = 'border-none outline-none rounded-lg p-2 mx-2 bg-green-200'
    }
    else if(mode === 'reject'){
        style = 'border-none outline-none rounded-lg p-2 mx-2 bg-red-200'
    }
    else if(mode === 'submit'){
        style = 'border border-cyan-600 outline-none rounded-lg p-2 transition duration-300 hover:outline-none hover:border-cyan-600 hover:bg-cyan-600 hover:text-white'
    }
    return <button type={type} className={`${style} ${others}`}>{text}</button>
}

export default BaseButton;
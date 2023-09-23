
const Popup = ({text, type}) => { 
    const popupMapper = {
        'succuss': 'bg-green-700 text-white',
        'error': 'bg-red-600 text-white'
    }
    const iconMapper = {
        'succuss': <i className="fa fa-check"></i>,
        'error': <i className="fa fa-close"></i>,
    }
    const popupstyle = `absolute top-[10%] left-[36%] px-4 rounded-full font-light ${popupMapper[type]} `;

    const result = text && <div className={popupstyle}> {iconMapper[type]} {text} </div>
    
    return result;
}

export default Popup;
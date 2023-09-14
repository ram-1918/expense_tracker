import { useState } from "react";

const Popup = ({text, type}) => { 
    // setTimeout(() => setSuccussMsg(''), 2800);
    // setTimeout(() => setErrorMsg(''), 2800);
    return (
        <div className="absolute top-[10%] left-[36%]">
            {type === 'succuss' && text }
            {type === 'error' && text }
        </div>
    )
}

export default Popup;
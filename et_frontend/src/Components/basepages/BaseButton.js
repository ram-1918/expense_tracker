import { useState } from "react";

const BaseButton = (props) => {
    const [classnames, setClassnames] = useState('');
    // const [type_, setType] = useState(props.type);

    const login_classnames = 'border-0 outline-0 w-16 p-2 bg-green-200 rounded-lg';
    const other_classnames = 'border-0 outline-0 w-16 p-2 bg-red-200 rounded-lg';
    if(props.mode === 'login' || props.mode === 'register'){
        setClassnames(login_classnames);
    }
    if (props.mode === 'other'){
        setClassnames(other_classnames);
        // setType('button');
    }
    return <button type={props.type} className={classnames}>{props.text}</button>
}

export default BaseButton;
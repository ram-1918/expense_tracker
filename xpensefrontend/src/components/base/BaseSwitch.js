import { useState } from "react";

const switchStyle = 'border border-slate-400 w-12 flex-row-style justify-between rounded-full cursor-pointer text-sm bg-gray-100';
const commonstyles = 'border w-4 h-4 rounded-full';

const switchon = (switchOn) => <span className={`${commonstyles} bg-gray-400 ${switchOn ? 'invisible' : 'block'}`}></span>;
const switchoff = (switchOn) => <span className={`${commonstyles} bg-blue-500 ${switchOn ? 'block' : 'invisible'}`}></span>

const BaseSwitch = ({setValue}) => {
    const [switchOn, setSwitchOn] = useState(false);
    return (
        <div className={`${switchStyle}`} onClick={() => {setSwitchOn(prev => !prev); setValue(switchOn ? '' : true)} }>
            {switchon(switchOn)}
            {switchoff(switchOn)}
        </div>
    )
}

export default BaseSwitch;
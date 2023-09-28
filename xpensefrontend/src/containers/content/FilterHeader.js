// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]

import { useEffect, useState } from "react";

const outerdiv = "w-full grid grid-flow-col grid-rows-2 gap-2 font-light p-4 bg-white";
const buttonStyles = 'border border-slate-400 w-32 h-8 flex-row-style text-[0.8rem] justify-center rounded-lg px-2 cursor-pointer';

function FilterHeader({ allKeys, setKeys, active, setActive }) {
    const [allkeys, setallkeys] = useState(allKeys);

    useEffect(() => {
        sortedKeys(allKeys);
    }, [allKeys]);

    const sortedKeys = (keys) => {
        keys.sort((a,b) => {
            if ((active[a] && active[b]) || (!active[a] && !active[b])) return 0;
            else if (active[a] && !active[b]) return -1;
            else return 1;
        })
        setallkeys(keys);
      };
      
    const handleKeys = (ele) => {
        setKeys(prev => {
            const getIndexOfele = prev.findIndex((key) => key === ele);
            if(getIndexOfele !== -1){
                prev = prev.filter((e) => e !== ele)
            } else {
                console.log(ele, prev)
                prev = [...prev, ele];
            }
            return prev
        });
        setActive(prev => ({...prev, [ele]: !prev[ele]}))
        sortedKeys(allKeys);
    }
    return (
        <div className={outerdiv}>
            {allkeys.map((ele, idx) => <button key={idx} type="submit" onClick={() => handleKeys(ele)} className={`${buttonStyles} ${active[ele] && 'border border-teal-900 bg-teal-100'}`}>{ele}</button>)}
        </div>
    );
    }

export default FilterHeader;

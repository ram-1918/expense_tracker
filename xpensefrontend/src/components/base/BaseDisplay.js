
// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]s

import UFilters from "../home/UFilters";
import USavedFilters from "../home/USavedFilters";
import UMain from "../home/UMain";
import USummary from "../home/USummary";
import UFavorites from "../home/UFavorites";

import XFilters from "../xpenses/XFilters";
import XSavedFilters from "../xpenses/XSavedFilters";
import XMain from "../xpenses/XMain";
import XSummary from "../xpenses/XSummary";
import XFavorites from "../xpenses/XFavorites";

import { useParams } from "react-router";
import { useEffect, useState } from "react";

function getUsersData(){
    const data = [
        {"name":"Ram", "email": "crc.5453@gmail.com", "phone": "716671918", "createdat": "August 29th, 2023", "isactive": true, "role": "admin", "employeeid": 123},
        {"name":"Chandra", "email": "rcb.23@gmail.com", "phone": "7324748217", "createdat": "September 2th, 2023", "isactive": true, "role": "Superadmin", "employeeid": 423},
        {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233},
    ]
    // axios.get(`${API_URL}/users`)
    // .then((res) => console.log('Succuss'))
    return data
}

function getXpenseData(){
    const data = [
        {"expense":"Ram", "email": "crc.5453@gmail.com", "phone": "716671918", "createdat": "August 29th, 2023", "role": "admin", "employeeid": 123},
        {"expense":"Chandra", "email": "rcb.23@gmail.com", "phone": "7324748217", "createdat": "September 2th, 2023", "role": "Superadmin", "employeeid": 423},
        {"expense":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "role": "employee", "employeeid": 233},
    ]
    // axios.get(`${API_URL}/users`)
    // .then((res) => console.log('Succuss'))
    return data
}

function BaseDisplay() {
    const { type } = useParams();
    const base_title_headers = '';
    const [data, setData] = useState([]);
    const [keys, setKeys] = useState([]);
    // const type = 'users'
    useEffect(() => {
        if(type === 'users'){
            const d = getUsersData();
            setKeys(Object.keys(d[0]))
            setData(d);
        }
        if(type === 'xpenses'){
            const d = getXpenseData();
            // alert(d.length);
            setKeys(Object.keys(d[0]))
            setData(d)
        }
    }, [type])
    return (
        <div className='border w-full h-full flex-row-style justify-center space-x-2 p-2'>
            <div className="border w-[20%] h-full flex-col-style justify-start space-y-8">
                <div className='border w-full h-[50%]'>
                    <span className={`${base_title_headers}`}>Filters</span>
                    <div>
                        {/* Filters from called component */}
                        {type === 'xpenses' && <XFilters />} {type === 'users' && <UFilters />}
                    </div>
                </div>
                <div className='border w-full h-[45%] flex-col-style justify-start'>
                    <span className={`${base_title_headers}`}>Saved filters</span>
                    {/* Top 3 filters will be saved. using Redis for storing the results would be appropriate. Needs clarification. */}
                    <div>
                        {/* Appropriate Saved Filters from called component */}
                        {type === 'xpenses' && <XSavedFilters />} {type === 'users' && <USavedFilters />}

                    </div>
                </div>
            </div>
            <div className="border w-[65%] h-full overflow-x-scroll overflow-y-scroll">
                <div>
                    {/* Appropriate content from called component ========== 
                    Include Pagination...... and also ONE SEARCH BAR VARIOUS FUCTIONALITY 
                    Any data that enters/that received changes(when updates ot delets]) the expense tabLe its status should be pendinG(3) */}
                    {type === 'xpenses' && <XMain data={data} keys={keys}/>} {type === 'users' && <UMain data={data} keys={keys}/>}
                </div>
            </div>
            <div className="border w-[20%] h-full space-y-8">
                <div className="border w-full h-[35%]">
                    <span className={`${base_title_headers}`}>Tags</span>
                    <div>
                        {/* Tags related to component */}
                        {type === 'xpenses' && <XFavorites />} {type === 'users' && <UFavorites />}
                    </div>
                </div>
                <div className="border w-full h-[65%]">
                    <span className={`${base_title_headers}`}>Summary</span>
                    <div>
                        {/* Summary of the data from the called component */}
                        {type === 'xpenses' && <XSummary />} {type === 'users' && <USummary />}
                    </div>
                </div>
            </div>
        </div>
    );
  }
  
  export default BaseDisplay;
  
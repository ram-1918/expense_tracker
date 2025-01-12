import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TableCaption = ({args:{caption, dispatch, apifunc, otherArgs}}) => {

    return (
        <thead>
            <tr className="flex-row-style justify-center space-x-2">
                <td className="caption-top py-2 text-xl text-gray-500 font-semibold">{caption}</td>
                <td onClick={() => {dispatch(apifunc())}} className="cursor-pointer hover:opacity-60 text-sm"><FontAwesomeIcon icon={faRefresh} /></td>
            </tr>
        </thead>
    )
}

export default TableCaption;
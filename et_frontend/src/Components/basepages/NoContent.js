import { noContent } from "../BaseStyles";

const NoContent = ({msg}) => {
    return (
    <div className={`${noContent.body}`}>
        <span className={`${noContent.text}`}>{msg}</span>
    </div>
    )
}

export default NoContent;
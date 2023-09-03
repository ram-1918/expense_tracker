import { message } from "../BaseStyles";

const Message = ({msg, type, others}) => {
    const bgstyle = type === 'succuss' ? message.succuss.bg : message.error.bg;
    const txtstyle = type === 'succuss' ? message.succuss.text : message.error.text;
    return (
        <span className={`${msg ? message.flyoff : ''} ${bgstyle} ${txtstyle} ${others}`}>
            {msg}
        </span>
    )
}

export default Message;
import { useState } from "react";
import { useParams } from "react-router-dom";
import BaseButton from "../basepages/BaseButton";
import BaseField from "../basepages/BaseField";
import Message from "../basepages/Message";
import { get_expenses, submit_expense } from "./services/apicalls";

const HandleForm = () => {
    const formdata = new FormData();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [tags, setTags] = useState('');
    const [images, setImages] = useState([]);
    const [filenames, setFileNames] = useState([]);
    const [succussMsg, setSuccussMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    setTimeout(() => {
        setSuccussMsg('');
        setErrorMsg('');
    }, 2500);

    let res = [];

    Array.from(images).forEach((obj) => {res.push(obj.name)})
    // Array.from(images).map((obj) => {setFileNames(...filenames, obj.name)})
    // Array.from(images).forEach((obj, idx) => {formdata.append(`images[${idx}]`, obj)})

    function handleSubmit(e) {
        e.preventDefault()
        if (title === '' || description === '' || amount === '' || tags === ''){
            setErrorMsg('All the fields have to be filled!')
            return 
        }
        formdata.append('name', title);
        formdata.append('description', description);
        formdata.append('amount', amount);
        formdata.append('tags', tags);
        Array.from(images).forEach((obj, idx) => {formdata.append(`image[${idx}]`, obj)}) // images should be sent in the form of formdata inorder for the backend to recognize as an image file
        console.log(images, 'FILENAMES')
        submit_expense(formdata)
        .then((res) => {setSuccussMsg('Submitted succussfully!')})
        .then(() => {
            setTitle(''); setAmount(''); setDescription(''); setFileNames([]); setTags(''); res = []
        })
        .catch(() => setErrorMsg('Error occured!'))
    }
    const fileStyles = 'block w-72 text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-neutral-100 file:text-neutral-700 hover:file:bg-violet-100'

    return (
        <>
            <Message type="succuss" msg={succussMsg} />
            <Message type="error" msg={errorMsg} />
            <div className="w-full m-auto p-2 flex flex-col justify-center items-center space-y-4">
                <h3>Session data: Last submitted: 4, current submissions: 2</h3>
                <BaseField legend="Title" plholder="Title for the expense" type="text" value={title} setField={setTitle} />
                <BaseField txtarea={true} legend="Description" plholder="Description for the expense" type="text" value={description} setField={setDescription} />
                <BaseField legend="Amount" plholder="Amount for the expense" type="text" value={amount} setField={setAmount} />
                <BaseField legend="Tags" plholder="Tags (,) comma separated" type="text" value={tags} setField={setTags} />
                <input className={`${fileStyles} w-72 `} type="file" accept="image/png, image/jpg, .jpeg, image/*" onChange={(e) => {setImages(e.target.files)}} multiple />
                <div className="my-2 border-slate-300">
                    {res.length ? <span className="font-light">Selected proofs</span> : <></>}
                    {res &&
                    (
                        res.map((obj, idx) => <span className="flex flex-col p-[3px] text-slate-800 font-semibold">{idx+1}. {obj}</span>)
                    )}
                </div>
                <span onClick={(e) => handleSubmit(e)}><BaseButton text="Submit" type="submit" value={images} mode="submit" ></BaseButton></span>
            </div>
        </>
    )
}


const SubmitExpense = () => {
    const {userid} = useParams();

    return (
            <div className='m-auto flex flex-col h-screen overflow-scroll'>
                <form className="m-auto border border-neutral-500 rounded-xl w-[40%] h-fit py-4 shadow-3xl flex flex-col justify-center items-center">
                    <span className="text-2xl font-semibold p-2 ">Submit your expense</span>
                    <HandleForm />
                </form>
            </div>
        )

}
export default SubmitExpense;
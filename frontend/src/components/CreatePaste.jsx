
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../context/baseurl";
import { toast } from "react-toastify";

export default function CreatePaste() {
    const [text, setText] = useState();
    const [expire, setExpiry] = useState();
    const [views, setViews] = useState();
    const [link, setLink] = useState();
    const [id, setId] = useState();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const CopyLink = () => {
        if (link) {
            navigator.clipboard.writeText(link);
            toast.success("Link Copied")
        } else {
            toast.error("Text not copied!")
        }
    }

    const CreatePaste = async () => {
        if (!text) {
            toast.warning("Text field is missing!")
            return;
        }

        try {

            if (expire < 1) {
                toast.warning("Expiry time not be zero!")
                return;
            }
            if (views < 1) {
                toast.warning("Maxviews not be zero!")
                return;
            }
            console.log("okoko")
            setLoading(true)
            const url = `${baseurl}/pastes`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    content: text,
                    ttl_seconds: Number(expire),
                    maxviews: Number(views)
                })
            });
            console.log("api called")

            if (response.status === 201) {
                const data = await response.json();
                console.log(data);
                toast.success(data.message)
                const paste_link = `${window.location.origin}/view/${data.id}`;
                setLink(paste_link);
                setId(data.id)
            }
        }
        catch (err) {
            console.log(err)
            toast.error(err)
        }
        finally {
            setLoading(false)
        }
    }
    
    return (

        <div className='flex flex-col justify-center items-center gap-3 bg-white w-auto h-auto text-black p-4 border border-black rounded-lg'>
            <h2 className='text-3xl font-bold mx-10 mb-3'>PASTEBIN</h2>
            <div className='flex mx-1 justify-between items-center gap-2 w-full'>
                <label htmlFor="text" className='text-2xl font-medium'>Text</label>
                <input type="text" name="text" id="text" className='p-2 border border-black rounded-lg ' value={text} onChange={(e) => { setText(e.target.value) }} placeholder='Enter Text' />
            </div>
            <div className='flex mx-1 justify-between items-center gap-2 w-full'>
                <label htmlFor="expire" className='text-2xl font-medium'>Expiry Time</label>
                <input type="number" name="expiry" id="expiry" className='p-2 border border-black rounded-lg ' value={expire} onChange={(e) => { setExpiry(e.target.value) }} placeholder='Enter Expiry time' />
            </div>
            <div className='flex mx-1 justify-between items-center gap-2 w-full'>
                <label htmlFor="expire" className='text-2xl font-medium'>Max views</label>
                <input type="number" name="views" id="views" className='p-2 border border-black rounded-lg ' value={views} onChange={(e) => { setViews(e.target.value) }} placeholder='Enter number of views' />
            </div>

            <button disabled={loading}
                className={`flex justify-center items-center p-2 rounded-lg w-full
    ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`} onClick={CreatePaste}>
                {loading ? "Creating Paste..." : "Create Paste"}
            </button>
            {link &&
                <>
                    <h2 className='text-3xl font-bold mx-10'>link</h2>
                    <div className='flex px-2 justify-center items-center'>
                        <p>{link}</p>
                    </div>
                    <div className='flex justify-between mx-2 items-center w-full gap-3'>
                        <button className='flex bg-red-600 hover:bg-red-700 justify-center items-center p-2 rounded-lg w-full' onClick={() => { navigate(`/view/${id}`) }}>
                            View Text
                        </button>
                        <button className='flex bg-green-600 hover:bg-green-700 justify-center items-center p-2 rounded-lg w-full' onClick={CopyLink}>
                            Copy Link
                        </button>
                    </div>
                </>
            }
        </div>
    )
}
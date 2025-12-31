import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { baseurl } from "../context/baseurl";
export default function ViewPaste() {
    const [text, setText] = useState();
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const ViewPaste = async () => {
        try {

            const url = `${baseurl}/pastes/${id}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                },
            })

            const data = await response.json();
            console.log(data);
            setText(data.content)
        }
        catch (err) {
            console.log(err);
        }
        finally{
            setLoading(false)
        }
    }
    useEffect(() => {
        ViewPaste();
    }, [])
    if (loading) {
        return (
            <div className="flex p-2 text-black">
                <p>Loading...</p>
            </div>
        );
    }
    return (

        text ? (
            <div className="flex p-10 text-black w-full justify-start items-start rounded-lg border border-black m-3">
                <p>{text}</p>
            </div>
        ) : (
            <div className="flex p-2 text-black w-full justify-start items-start">
                <p>Not found</p>
            </div>
        )
    )
}
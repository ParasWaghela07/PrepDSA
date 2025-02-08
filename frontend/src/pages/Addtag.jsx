import React, { useState } from 'react';
import toast from 'react-hot-toast';

const AddTag = () => {
    const [tag, setTag] = useState('');

    const handleChange = (e) => {
        setTag(e.target.value);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const response=await fetch('http://localhost:4000/addtag',{
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({
                tagname: tag,
                }),
                credentials: "include",
            })

            const data=await response.json();
            if(data.success){
                toast.success(data.message);
            }
        }
        catch(e){
            console.log(e);
        }
        console.log('Tag submitted:', tag);
        setTag('');
    };

    return (
        <div>
            <h1>Add a New Tag</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={tag}
                    onChange={handleChange}
                    placeholder="Enter tag"
                />
                <button type="submit">Add Tag</button>
            </form>
        </div>
    );
};

export default AddTag;
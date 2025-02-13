import { useState } from "react";
import Questionstrip from "./Questionstrip";
import toast from "react-hot-toast";

function Questionbox({ questions ,role,kahaseayahai}) {
    const [sheetarray,setsheetarray]=useState([]);
    const [sheetname,setsheetname]=useState("");
    async function pushsheet(){
        try{
            const res = await fetch("http://localhost:4000/addsheet",{
                method:"POST",
                credentials:"include",
                headers:{
                    "Content-Type":"application/json",
                    },
                    body:JSON.stringify({sheetname:sheetname,questions:sheetarray})
            })
            const data = await res.json();
            if(data.success){
                toast.success(`Sheet ${sheetname} added`)
            }
            else{
                //toast.alert(`Kyu nai ho paa rha developement??`)
            }
        }
        catch(e){
            console.log(e);
        }
    }
    return (
        <div className="bg-gray-900 p-6 rounded-lg shadow-md text-gray-300 overflow-x-hidden">
            {
                role=="admin"&&
                <div>
                    <input className="mr-4 text-black p-2 rounded-md" onChange={(e)=>{
                        setsheetname(e.target.value)
                       // value={sheetarray}
                    }} type="text" />
                    <button onClick={pushsheet} className="px-2 py-1 bg-teal-400 text-black rounded-md font-bold">
                        Add sheet
                    </button>
                </div>

            }
            <h2 className="text-xl font-semibold text-white mb-4">Questions</h2>
            <div className="grid gap-4">
                {questions.map((question, index) => (
                    <Questionstrip
                        key={index}
                        questionid1={question._id}
                        difficulty={question.difficulty}
                        title={question.question_title}
                        role={role}
                        sheetarray={sheetarray} 
                        setsheetarray={setsheetarray}
                        kahaseayahai={kahaseayahai}
                    />
                ))}
            </div>
        </div>
    );
}

export default Questionbox;

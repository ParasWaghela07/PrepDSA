import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

function Sheetbox() {
    const [sheetlist, setSheetlist] = useState([]);
    const navigate = useNavigate();

    async function getAllSheets() {
        const toastid = toast.loading("Loading sheets...");
        try {
            const res = await fetch("http://localhost:4000/gettallsheets", {
                method: "GET",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });

            const data = await res.json();
            console.log("Fetched Data:", data);

            if (data.success) {
                setSheetlist(data.data);
                console.log("Sheets fetched successfully!");
            } else {
                console.log("Sheets not fetched.");
            }
        } catch (e) {
            console.log("Error fetching sheets:", e);
        }
        toast.dismiss(toastid);
    }

    useEffect(() => {
        getAllSheets();
    }, []);

    const handleSelectChange = (event) => {
        const sheetName = event.target.value;
        const selected = sheetlist.find(sheet => sheet.sheet_name === sheetName);
        if (selected) {
            navigate("/displaysheet", {
                state: {
                    question: selected.question_list,
                    sheetname: selected.sheet_name,
                },
            });
        }
    };

    return (
        <div className="p-6">
            {sheetlist.length === 0 ? (
                <p className="text-white">No sheets available.</p>
            ) : (
                <select 
                    className="w-full p-3 bg-gray-800 text-white rounded-md border border-teal-400 focus:outline-none" 
                    onChange={handleSelectChange}
                >
                    <option value="">Solve a sheet</option>
                    {sheetlist.map((sheet, index) => (
                        <option key={index} value={sheet.sheet_name}>
                            {sheet.sheet_name}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
}

export default Sheetbox;

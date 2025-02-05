import { useEffect, useState } from "react";

function Sheetbox() {
    const [sheetlist, setSheetlist] = useState([]);
  
    async function getAllSheets() {
      try {
        const res = await fetch("http://localhost:4000/gettallsheets", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
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
    }
  
    useEffect(() => {
      getAllSheets();
    }, []);
  
    useEffect(() => {
      console.log("Updated sheet list:", sheetlist);
    }, [sheetlist]);
  
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-teal-400">Available Sheets</h2>
        <div className="grid gap-6">
          {sheetlist.length === 0 ? (
            <p className="text-white">No sheets available.</p>
          ) : (
            sheetlist.map((sheet, index) => (
              <div
                key={index}
                className="bg-gray-700 flex justify-between items-center p-6 rounded-lg shadow-lg cursor-pointer"
                onClick={() => {
                    
                }}
              >
                <h3 className="text-xl font-semibold text-white">{sheet.sheet_name}</h3>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
  
  export default Sheetbox;
  
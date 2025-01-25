import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import { Companies } from "../components/Companies";
import { Solutions } from "../components/Solutions";
import { Complexities } from "../components/Complexities";
import { Topics } from "../components/Topics";

const platformLogos = {
  leetcode: "https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png",
  geeksforgeeks: "https://upload.wikimedia.org/wikipedia/commons/4/43/GeeksforGeeks.svg",
  codeforces: "https://sta.codeforces.com/s/84732/images/codeforces-logo-with-telegram.png",
  codechef: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7e/CodeChef_logo.png/1200px-CodeChef_logo.png",
};

const getPlatformDetails = (url) => {
  if (url.includes("leetcode.com")) return { name: "LeetCode", logo: platformLogos.leetcode };
  if (url.includes("geeksforgeeks.org")) return { name: "GeeksforGeeks", logo: platformLogos.geeksforgeeks };
  if (url.includes("codeforces.com")) return { name: "Codeforces", logo: platformLogos.codeforces };
  if (url.includes("codechef.com")) return { name: "CodeChef", logo: platformLogos.codechef };
  return { name: "Unknown", logo: null };
};

const RedirectLinks = ({ links }) => {
  return (
    <div className="flex flex-col gap-4">
      {links.map((link, index) => {
        const { name, logo } = getPlatformDetails(link);
        return (
          <a
            href={link}
            key={index}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-gray-800 text-white rounded-lg shadow-md p-4 gap-4 hover:scale-105 transition-transform"
          >
            {logo ? (
              <img src={logo} alt={name} className="w-10 h-10 object-contain" />
            ) : (
              <div className="w-10 h-10 bg-gray-600 flex items-center justify-center rounded-full">
                ?
              </div>
            )}
            <span className="font-semibold text-sm">{name}</span>
          </a>
        );
      })}
    </div>
  );
};

function Question() {

  const { loader, setloader } = useContext(AppContext);
  const qstid = useParams();
  const [question, setquestion] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  async function pushtosolved() {
    try {
        const response=await fetch("http://localhost:4000/solved", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                questionid: qstid.qstid,
                difficulty: question.difficulty,
            }),
            credentials: "include",
        });
        const res=await response.json();
        if(res.success) localStorage.setItem("user", JSON.stringify(res.user));
        setIsChecked(true);
    } catch (error) {
        console.error("Error marking question as solved:", error);
    }
}

async function checkstatus() {
    try {
        const response = await fetch("http://localhost:4000/checksolvestatus", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                questionid: qstid.qstid,
            }),
            credentials: "include",
        });

        const responseData = await response.json();

        if (responseData.data) {
            setIsChecked(true);
            
        }
    } catch (error) {
        console.error("Error fetching solve status:", error);
    }
}

  async function getqstdetail() {
    setloader(true);
    try {
      const response = await fetch("http://localhost:4000/getquestiondetail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          qstid: qstid.qstid,
        }),
        credentials: "include",
      });

      const data = await response.json();
      console.log(data)
      if (data.success) {
        setquestion(data.data);
      }
    } catch (error) {
      console.error("Error fetching question:", error);
    }
    setloader(false);
  }

  useEffect(() => {
    getqstdetail();
    checkstatus();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-900 text-white">
      {/* Left Section */}
      <div className="flex-1 p-8 overflow-y-auto">
        {loader ? (
          <p>Loading...</p>
        ) : (
          <div>
            <div className="flex">
            <h1 className="text-3xl font-bold mb-4">{question.question_title}</h1>
            <div>
              <button onClick={pushtosolved} className=" flex p-2 m-2 items-center bg-blue-600">
                {isChecked?"solved":"solve"}
              </button>
            </div>
            </div>
           
            <p className="text-lg font-medium mb-4">
              Difficulty: {question.difficulty === 1 ? "Easy" : question.difficulty === 2 ? "Medium" : "Hard"}
            </p>
            <div className="mb-4">
              <Companies companies={question.companies} />
            </div>
            <div className="mb-4">
              <Solutions solutions={question.solution_links} />
            </div>
            <div className="mb-4">
              <Complexities complexities={question.time_complexity} />
            </div>
            <div>
              <Topics topics={question.topics} />
            </div>
          </div>
        )}
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-80 p-4 bg-gray-800 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Redirect Links</h2>
        <RedirectLinks links={question.redirectLinks || []} />
      </div>
    </div>
  );
}

export default Question;

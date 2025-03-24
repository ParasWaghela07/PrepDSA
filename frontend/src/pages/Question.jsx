import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import { Companies } from "../components/Companies";
import { Solutions } from "../components/Solutions";
import { Complexities } from "../components/Complexities";
import { Topics } from "../components/Topics";
import { ConfirmationModal } from "../components/ConfirmationModal";
import { toast } from "react-hot-toast";

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
            className="flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg p-4 gap-4 hover:scale-105 transition-transform"
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
  const { loader, setloader, user, setuser } = useContext(AppContext);
  const qstid = useParams();
  const [question, setquestion] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const [modal, setModal] = useState(false);

  async function pushtosolved() {
    try {
      const response = await fetch("http://localhost:4000/solved", {
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
      const res = await response.json();
      if (res.success) setuser(res.user), setIsChecked(true);
    } catch (error) {
      console.error("Error marking question as solved:", error);
    }
    setModal(false);
  }

  function cancel() {
    setModal(false);
  }

  function checkstatus() {
    const user_solved_qsts = user.solved_question_ids;
    for (let i = 0; i < user_solved_qsts?.length; i++) {
      if (user_solved_qsts[i]._id === question._id) {
        setIsChecked(true);
        break;
      }
    }
  }

  async function getqstdetail() {
    const toastid = toast.loading("Fetching question...");
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
      if (data.success) {
        setquestion(data.data);
      }
    } catch (error) {
      console.error("Error fetching question:", error);
    }
    toast.dismiss(toastid);
  }

  useEffect(() => {
    getqstdetail();
  }, []);

  useEffect(() => {
    checkstatus();
  }, [user, question]);

return (
  <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
    {/* Main Question Section */}
    <div className="flex-1 p-8 overflow-y-auto">
      {loader ? (
        <p className="text-center text-lg">Loading...</p>
      ) : (
        <div>
          {/* Title & Solve Button */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-teal-400">{question.question_title}</h1>
            <button
              onClick={() => !isChecked && setModal(true)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all shadow-md ${
                isChecked
                  ? "bg-green-600 cursor-default"
                  : "bg-blue-600 hover:bg-blue-700 hover:scale-105"
              }`}
            >
              {isChecked ? "Solved" : "Mark as Solved"}
            </button>
          </div>

          {/* Difficulty Level */}
          <p className="text-lg mb-4">
            Difficulty:{" "}
            <span
              className={`font-semibold px-3 py-1 rounded-md ${
                question.difficulty === 1
                  ? "text-green-400"
                  : question.difficulty === 2
                  ? "text-yellow-500"
                  : "text-red-500"
              }`}
            >
              {question.difficulty === 1 ? "Easy" : question.difficulty === 2 ? "Medium" : "Hard"}
            </span>
          </p>

          {/* Related Information */}
          <div className="mb-6 space-y-4">
            <Companies companies={question.companies} />
            <Solutions solutions={question.solution_links} />
            <Complexities complexities={question.time_complexity} />
            <Topics topics={question.topics} />
          </div>
        </div>
      )}
    </div>

    {/* Sidebar - Redirect Links */}
    <div className="w-full lg:w-80 p-6 bg-gray-800 rounded-t-xl lg:rounded-none lg:border-l border-gray-700 shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-200">Redirect Links</h2>
      <RedirectLinks links={question.redirectLinks || []} />
    </div>

    {/* Solve Confirmation Modal */}
    {modal && (
      <ConfirmationModal
        title="Are you sure?"
        desc="Once marked, you won't be able to undo this action. Make sure you're certain!"
        btn2="Cancel"
        btn1="Confirm Solve"
        btn2fn={cancel}
        btn1fn={pushtosolved}
      />
    )}
  </div>
);

}

export default Question;
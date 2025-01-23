import Questionstrip from "./Questionstrip";

function Questionbox({ questions }) {
    console.log(questions);
    return (
        <div className="bg-gray-900 p-6 rounded-lg shadow-md text-gray-300 overflow-x-hidden">
            <h2 className="text-xl font-semibold text-white mb-4">Questions</h2>
            <div className="grid gap-4">
                {questions.map((question, index) => (
                    <Questionstrip
                        key={index}
                        questionid1={question._id}
                        difficulty={question.difficulty}
                        title={question.question_title}
                    />
                ))}
            </div>
        </div>
    );
}

export default Questionbox;

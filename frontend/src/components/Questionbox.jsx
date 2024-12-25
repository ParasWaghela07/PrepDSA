import Questionstrip from "./Questionstrip";

function Questionbox({ questions, difficulty, companies, topics }) {
  return (
    <div>
      {questions.map((question, index) => (
        <Questionstrip
          key={index} 
          questionid1={question._id}
          difficulty={question.difficulty}
          title={question.question_title}
        />
      ))}
    </div>
  );
}

export default Questionbox;

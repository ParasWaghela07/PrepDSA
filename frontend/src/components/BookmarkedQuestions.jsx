function BookmarkedQuestions({ questions }) {
  const diff=["Easy","Medium","Hard"];
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-teal-400">Bookmarked Questions</h2>
      <div className="grid gap-6">
        {questions.map((question, index) => (
          <div key={index} className="bg-gray-700 flex justify-between items-center p-6 rounded-lg shadow-lg cursor-pointer">
            <h3 className="text-xl font-semibold text-white">{question.question_title}</h3>
            <h1 className={`font-medium ${question.difficulty==1?"text-green-400":question.difficulty==2?"text-yellow-400":"text-red-400"}`}>{diff[question.difficulty-1]}</h1>
          </div>
        ))}
      </div>
    </div>
  );
  }
  
  export default BookmarkedQuestions;
  
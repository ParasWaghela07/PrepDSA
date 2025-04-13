function ListQuestions({ questions }) {
  const diff = ["Easy", "Medium", "Hard"];
  return (
    <div className="space-y-6 px-4 md:px-8 lg:px-16">
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {questions?.map((question, index) => (
          <div
            key={index}
            className="bg-gray-700 flex justify-between items-center p-6 rounded-lg shadow-lg cursor-pointer"
            onClick={() => {
              window.location.href = `/question/${question._id}`;
            }}
          >
            <h3 className="text-lg md:text-xl font-semibold text-white">
              {question.question_title}
            </h3>
            <h1
              className={`font-medium ${
                question.difficulty == 1
                  ? "text-green-400"
                  : question.difficulty == 2
                  ? "text-yellow-400"
                  : "text-red-500"
              }`}
            >
              {diff[question.difficulty - 1]}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListQuestions;

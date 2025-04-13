function ListQuizzes({ quizzes }) {
    
    return (
      <div className="space-y-6 px-4 md:px-8 lg:px-16">
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {quizzes?.map((quiz, index) => (
            <div
              key={index}
              className="bg-gray-700 flex justify-between items-center p-6 rounded-lg shadow-lg "
            >
              <h3 className="text-lg md:text-xl font-semibold text-white">
                {quiz.duration}
              </h3>

              <p className="font-semibold text-lg">
                <span className={
                    quiz.quiz_score > 7 
                    ? 'text-green-500' 
                    : quiz.quiz_score > 4 
                        ? 'text-yellow-400' 
                        : 'text-red-500'
                }>
                    {quiz.quiz_score}
                </span>/{quiz.quiz_marks}
                </p>

            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default ListQuizzes;
  
function BookmarkedQuestions({ questions }) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-teal-400">Bookmarked Questions</h2>
        <div className="grid gap-6">
          {questions.map((question, index) => (
            <div key={index} className="bg-gray-700 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-white">{question.question_title}</h3>
              <div className="mt-2 text-gray-300">
                <p><strong>Difficulty:</strong> {question.difficulty === 1 ? 'Easy' : question.difficulty === 2 ? 'Medium' : 'Hard'}</p>
                <p><strong>Time Complexity:</strong> {question.time_complexity.join(', ')}</p>
                <p>
                  <strong>Solution:</strong> 
                  <a href={question.solution_links[0]} target="_blank" rel="noopener noreferrer" className="text-teal-400 ml-1">
                    View Solution
                  </a>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default BookmarkedQuestions;
  
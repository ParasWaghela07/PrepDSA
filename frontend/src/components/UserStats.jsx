function UserStats({ userDetails }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-gray-700 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-teal-400">Easy Questions</h3>
        <p>{userDetails.easy_question_count}</p>
      </div>
      <div className="bg-gray-700 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-teal-400">Medium Questions</h3>
        <p>{userDetails.medium_question_count}</p>
      </div>
      <div className="bg-gray-700 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-teal-400">Hard Questions</h3>
        <p>{userDetails.hard_question_count}</p>
      </div>
      <div className="bg-gray-700 p-4 rounded-lg col-span-1 md:col-span-3">
        <h3 className="text-lg font-semibold text-teal-400">Daily Streak</h3>
        <p>{userDetails.daily_streak}</p>
      </div>
    </div>
  );
}

export default UserStats;

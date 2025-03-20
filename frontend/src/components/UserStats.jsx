import { DoughnutChart } from "./DoughnutChart";
import BarChart from "./BarChart";

function UserStats({ userDetails }) {
  let count = userDetails?.solved_question_ids?.length;
  let topicToQst = [];

  userDetails?.solved_question_ids?.map((question) => {
    question.topics.map((topic) => {
      if (topicToQst[topic.topic_name]) {
        topicToQst[topic.topic_name] += 1;
      } else {
        topicToQst[topic.topic_name] = 1;
      }
    });
  });

  return (
    <>
      {count > 0 ? (
        <div className="w-full flex flex-col lg:flex-row lg:justify-around justify-between gap-y-16 sm:gap-y-32 px-4 sm:px-6">
          <div className="w-full lg:w-[30%] flex flex-col h-[200px] items-center gap-y-5">
            <DoughnutChart
              easy={userDetails.easy_question_count}
              medium={userDetails.medium_question_count}
              hard={userDetails.hard_question_count}
            />
            <div className="flex flex-wrap justify-center items-center gap-4">
              <div className="font-semibold flex flex-col justify-center items-center text-green-400 bg-gray-50/[0.2] px-3 sm:px-4 py-2 rounded-md text-lg sm:text-2xl">
                <p>Easy</p>
                <p>{userDetails.easy_question_count}</p>
              </div>
              <div className="font-semibold flex flex-col justify-center items-center text-yellow-400 bg-gray-50/[0.2] px-3 sm:px-4 py-2 rounded-md text-lg sm:text-2xl">
                <p>Medium</p>
                <p>{userDetails.medium_question_count}</p>
              </div>
              <div className="font-semibold flex flex-col justify-center items-center text-red-400 bg-gray-50/[0.2] px-3 sm:px-4 py-2 rounded-md text-lg sm:text-2xl">
                <p>Hard</p>
                <p>{userDetails.hard_question_count}</p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[60%] flex justify-center items-center h-[300px] sm:h-[400px]">
            <BarChart topicToQst={topicToQst} />
          </div>
        </div>
      ) : (
        <p className="font-bold text-xl sm:text-2xl text-center px-4">No question is solved yet</p>
      )}
    </>
  );
}

export default UserStats;

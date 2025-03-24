import { useNavigate } from "react-router-dom";
export const Topics = ({ topics }) => {
  const navigate = useNavigate();

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-300 mb-2">Topics</h3>
      {topics?.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {topics.map((topic, index) => (
            <span
              key={index}
             className="bg-blue-500/[0.4] text-white px-3 py-1 rounded-full text-sm shadow-md cursor-pointer hover:bg-blue-500/[0.8] transition duration-200"
              onClick={() => navigate(`/topic/${topic._id}`)}
            >
              {topic.topic_name}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No topics found</p>
      )}
    </div>
  );
};

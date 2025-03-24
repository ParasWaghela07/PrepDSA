export const Complexities = ({ complexities }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-300 mb-2">Time Complexity</h3>
      {complexities?.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {complexities.map((comp, index) => (
            <span
              key={index}
              className="bg-teal-400/[0.3] text-white px-3 py-1 rounded-full text-sm shadow-md"
            >
              {comp}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No complexities found</p>
      )}
    </div>
  );
};

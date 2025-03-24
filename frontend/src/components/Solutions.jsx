export const Solutions = ({ solutions }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-300 mb-2">Solutions</h3>
      {solutions?.length > 0 ? (
        <div className="flex flex-wrap gap-3">
          {solutions.map((solution, index) => (
            <a
              key={index}
              href={solution}
              target="_blank"
              rel="noreferrer"
              className="bg-green-700 text-white px-3 py-1 rounded-full text-sm shadow-md hover:bg-green-500 transition duration-200"
            >
              Solution-{index + 1}
            </a>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No solutions available</p>
      )}
    </div>
  );
};

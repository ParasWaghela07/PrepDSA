export const Companies = ({ companies }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-300 mb-2">Companies</h3>
      {companies?.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {companies.map((company, index) => (
            <span
              key={index}
              className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm shadow-md"
            >
              {company.company_name}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No companies found</p>
      )}
    </div>
  );
};

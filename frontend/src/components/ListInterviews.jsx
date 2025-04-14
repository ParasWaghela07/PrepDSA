function ListInterviews({ interviews }) {
    return (
      <div className="space-y-6 px-4 md:px-8 lg:px-16">
        {interviews?.length > 0 ? (
          <p className="font-medium text-lg">
            Total mock interviews attended : {interviews?.length}
          </p>
        ) : (
          <p className="font-medium text-lg">No mock interviews attended</p>
        )}
  
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {interviews?.map((interview, index) => (
            <div
              key={index}
              className="bg-gray-700 flex justify-between items-center p-6 rounded-lg shadow-lg"
            >
              <div className="flex flex-col">
                <h3 className="text-lg md:text-xl font-bold text-white">
                  {interview.company === null ? 'Random' : interview.company}
                </h3>
  
                <p className="font-medium text-sm md:text-md">
                  Duration : {interview.duration}
                </p>
  
                <p className="text-sm text-gray-300">
                  Attended on:{' '}
                  {new Date(interview.attended_at).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              </div>
  
              {(interview.interview_score / interview.interview_marks) * 100 > 80 ? (
                <p className="text-green-400 font-semibold">Cracked !</p>
              ) : (
                <p className="text-red-400 font-semibold">Failed !</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default ListInterviews;
  
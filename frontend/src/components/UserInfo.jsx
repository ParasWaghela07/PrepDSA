function UserInfo({ userDetails }) {
  const formattedDate = new Date(userDetails.createdAt).toLocaleDateString("en-GB"); // 'en-GB' for date/month/year format

  return (
    <div className="flex flex-col items-start px-4 sm:px-6 md:px-8">
      <div className="flex flex-col items-start gap-y-4">
        <div>
          <p className="text-2xl sm:text-3xl font-bold">{userDetails.name}</p>
          <p className="text-md sm:text-lg font-semibold">{userDetails.username}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-x-10">
          <div className="bg-gray-50/[0.1] p-3 sm:p-4 rounded-lg">
            <p className="text-lg sm:text-xl font-bold">Registered email</p>
            <p className="text-sm sm:text-md font-semibold">{userDetails.email}</p>
          </div>

          <div className="bg-gray-50/[0.1] p-3 sm:py-2 sm:px-4 rounded-lg">
            <p className="text-lg sm:text-xl font-bold">Joined at</p>
            <p className="text-sm sm:text-md font-semibold">{formattedDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;

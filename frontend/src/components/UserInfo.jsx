

function UserInfo({ userDetails }) {
  const formattedDate = new Date(userDetails.createdAt).toLocaleDateString('en-GB'); // 'en-GB' for date/month/year format

  return (
    <div className="flex flex-col items-start">
      <div className="flex flex-col  items-start gap-y-4">

        <div>
        <p className="text-3xl font-bold">{userDetails.name}</p>
        <p className="text-lg font-semibold">{userDetails.username}</p>
        </div>

        <div className="flex gap-x-10">
        <div className="bg-gray-50/[0.1] p-2 rounded-lg">
        <p className="text-xl font-bold">Registered email</p>
        <p className="text-md font-semibold">{userDetails.email}</p>
        </div>

        <div className="bg-gray-50/[0.1] py-2 px-4 rounded-lg">
        <p className="text-xl font-bold">Joined at</p>
        <p className="text-md font-semibold">{formattedDate}</p>
        </div>
        </div>

        <p className="font-bold text-xl">Current streak : {userDetails.daily_streak}</p>

      </div>
      
      
    </div>
  );
}

export default UserInfo;

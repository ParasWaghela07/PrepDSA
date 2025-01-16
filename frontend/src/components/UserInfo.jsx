function UserInfo({ userDetails }) {
  const formattedDate = new Date(userDetails.createdAt).toLocaleDateString('en-GB'); // 'en-GB' for date/month/year format

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-teal-400">Basic Information</h2>
      <p><strong>Name:</strong> {userDetails.name}</p>
      <p><strong>Username:</strong> {userDetails.username}</p>
      <p><strong>Email:</strong> {userDetails.email}</p>
      <p><strong>Joined:</strong> {formattedDate}</p>
    </div>
  );
}

export default UserInfo;

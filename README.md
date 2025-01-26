clone the repo from GitHub

go to backend directory in terminal then install all the dependencies mentioned in package.json (eg. npm i express mongoose etc..)

create an .env file in your backend folder and add 
PORT=4000
mongodb_url=your_mongo_url
JWT_SECRET=xyz

MAIL_HOST=smtp.gmail.com
MAIL_USER=your_email(which should have 2 step authentication enabled to get MAIL_PASS)
MAIL_PASS=your password

(use cloudinary)
CLOUD_NAME = cloud_name
CLOUD_API_KEY = cloud_key
CLOUD_API_SECRET =cloud_Secret
FOLDER_NAME = folder_name to store media (images)


go to frontend directory in terminal and run "npm install"
and install all dependencies mentioned in package.json ->dependencies (eg npm i react-icons)

open 2 terminals for frontend and backend and run "npm run dev" in both the terminals

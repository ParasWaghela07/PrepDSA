import React from 'react';
import LineChart from './LineChart';

const UserQuizProgress = ({userDetails}) => {
    
    let sum=0;
    for(let i=0;i<userDetails?.quizzes?.length;i++){
        sum += userDetails?.quizzes[i]?.quiz_score;
    }

    sum=sum/userDetails?.quizzes?.length;
    

    return (
        <div>
            <LineChart scores={userDetails?.quizzes?.map(quiz => quiz?.quiz_score)} />
            <div className="flex flex-col items-center justify-center mt-4">
                <h2 className="text-lg font-semibold">Average Score: {sum.toFixed(2)}</h2>
                <p className="text-sm text-gray-500">Based on {userDetails?.quizzes?.length} quizzes</p>
            </div>
        </div>
    );
};

export default UserQuizProgress;
function Questionstrip({ difficulty, title }) {
    return (
      <div className="flex justify-between p-2">
        <h3>{title}</h3>
        <p>Difficulty: {difficulty}</p>
      </div>
    );
  }
  
  export default Questionstrip;
  
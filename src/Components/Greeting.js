
const Greeting = ({ user }) => {
  const now = new Date();
  const hour = now.getHours();

  let period = "Morning";
  if (hour >= 12 && hour < 18) period = "Afternoon";
  else if (hour >= 18 || hour < 4) period = "Evening";

  return (
    <p id="greeting-page">
      Good {period}, {user}
    </p>
  );
};

export default Greeting;
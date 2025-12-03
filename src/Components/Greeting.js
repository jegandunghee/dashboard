
const Greeting = ({ user }) => {
  const now = new Date();
  const hour = now.getHours();

  let period = "morning";
  if (hour >= 12 && hour < 18) period = "afternoon";
  else if (hour >= 18 || hour < 4) period = "evening";

  return (
    <p className="center-greeting">
      Good {period}, {user}.
    </p>
  );
};

export default Greeting;
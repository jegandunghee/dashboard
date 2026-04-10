const Greeting = ({ user }) => {
  const now = new Date();
  const hour = now.getHours();

  let period = "";

  if (hour >= 5 && hour < 12) {
    period = "Morning";
  } else if (hour >= 12 && hour < 18) {
    period = "Afternoon";
  } else if (hour >= 18 && hour < 22) {
    period = "Evening";
  } else if (hour >= 22 && hour < 24) {
    period = "Night";
  } else {
    period = "Midnight";
  }

  return (
    <p id="greeting-page" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
      Good {period}.
    </p>
  );
};

export default Greeting;

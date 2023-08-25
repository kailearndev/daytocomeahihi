export const helloUser = () => {
  const currentHour = new Date().getHours();
  let hello = "";
  if (currentHour < 12) {
    return (hello = "Good Morning ");
  } else if (currentHour < 18) {
    return (hello = "Good Afternoon ");
  } else {
    return (hello = "Good Evening ");
  }
};

function getInitials(name) {
  // Trim any extra spaces and split the name by spaces
  const nameParts = name.trim().split(" ");

  // Get the first letter of the first name
  const firstNameInitial = nameParts[0].charAt(0).toUpperCase();

  // Get the first letter of the last name if it exists
  const lastNameInitial =
    nameParts.length > 1 ? nameParts[1].charAt(0).toUpperCase() : "";

  // Return the initials, combining first and last initials
  return firstNameInitial + lastNameInitial;
}
export default getInitials;

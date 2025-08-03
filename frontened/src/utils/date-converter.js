export function formatMongoDate(mongoDate) {
  const date = new Date(mongoDate);
  if (isNaN(date)) return "";

  // Format: YYYY-MM-DD
  return date.toISOString().split("T")[0];
}

export function parseInputDateToMongoDate(inputDate) {
  // inputDate is expected as a string in YYYY-MM-DD format
  const date = new Date(inputDate);
  return isNaN(date) ? null : date; // Returns a valid Date object
}

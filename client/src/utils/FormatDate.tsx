const FormatDate = (date: string | number | Date | undefined): string => {
  return date
    ? new Date(date).toISOString().slice(0, 10).split("-").reverse().join("-")
    : "";
};
export default FormatDate;
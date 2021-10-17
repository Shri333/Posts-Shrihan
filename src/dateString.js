function dateString(number) {
  const date = new Date(number);
  const time = date.toLocaleString("en-US", {
    timeStyle: "short",
    hour12: true
  });
  const day = date.toLocaleString("en-US", { day: "numeric", month: "short" });

  return { time, day };
}

export default dateString;

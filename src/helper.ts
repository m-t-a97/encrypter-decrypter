const sleep = (seconds = 2) =>
  new Promise((resolve) => setTimeout(resolve, seconds * 1000));

export { sleep };

const dateFunctions = {
  month (timestamp) {
    return (new Date(timestamp).getMonth() + 1).toString();
  },
  day (timestamp) {
    return new Date(timestamp).getDate().toString();
  },
  year (timestamp) {
    return new Date(timestamp).getUTCFullYear().toString();
  }
};

export default dateFunctions;

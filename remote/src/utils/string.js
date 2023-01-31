const format = (str, ...args) => {
  var s = str;
  var i = args.length;

  while (i--) {
    s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), args[i]);
  }

  return s;
};

const formatTrim = (string, length) => {
  const trimmedString =
    string.length > length ? string.substring(0, length - 3) + '...' : string;

  return trimmedString;
};

const formatCapitalize = (string) => {
  return string[0].toUpperCase() + string.slice(1);
};

const getRandomColor = () => {
  return '#000000'.replace(/0/g, function () {
    return (~~(Math.random() * 16)).toString(16);
  });
};

const formatEmptyString = (value) => {
  return value || '-';
};

export {
  format,
  formatTrim,
  formatCapitalize,
  getRandomColor,
  formatEmptyString,
};

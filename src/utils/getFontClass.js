const getFontClass = (language) => {
  switch (language) {
    case "en":
      return "font-eng-primary";
    case "kh":
      return "font-kh-primary";
    default:
      return "font-kh-secondary"; 
  }
};

export default getFontClass;

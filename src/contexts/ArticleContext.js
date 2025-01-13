import { createContext, useContext, useState } from "react";

const ArticleContext = createContext();

export const ArticleProvider = ({ children }) => {
  const [state, setState] = useState([]);

  return (
    <ArticleContext.Provider value={{ state, setState }}>
      {children}
    </ArticleContext.Provider>
  );
};

export const useArticleContext = () => useContext(ArticleContext);

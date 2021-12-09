import { createContext, useEffect, useState } from "react";
import apiHelper from "../apiHelper/apiHelper";

export const CategoryContext = createContext({})

const CategoryProvider = ({children}) => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getCategories();
  }, [])

  const getCategories = async () => {
    // GET/api/categories
    const response = await apiHelper("/categories");
    setCategories(response.data);
  }

  return (
    <CategoryContext.Provider
      value={{
        categories
      }}
    >
      {children}
    </CategoryContext.Provider>
  )
}

export default CategoryProvider;
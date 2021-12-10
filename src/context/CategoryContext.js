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
    try {
      const response = await apiHelper("/categories");
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
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
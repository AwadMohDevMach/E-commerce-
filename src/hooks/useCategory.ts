import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetCategories } from "@store/act/actGetCategories";
import { cleaUCategoriesRecords } from "@store/categories/categoreisSlice";

const useCategory = () => {
  const dispatch = useAppDispatch();
  const { loading, error, records } = useAppSelector(
    (state) => state.categories
  );

  useEffect(() => {
    const promis = dispatch(actGetCategories());

    return () => {
      promis.abort();
      dispatch(cleaUCategoriesRecords());
    };
  }, [dispatch]);
  return { loading, error, records };
};

export default useCategory;

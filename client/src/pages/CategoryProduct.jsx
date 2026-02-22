import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import productCategory from "../helpers/productCategory";
import BackButton from "../components/BackButton";
import SummaryApi from "../common";
import InputSuggestionVerticalCard from "../components/InputSuggestionVerticalCard";

const CategoryProduct = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListingArray = urlSearch.getAll("category");


  const urlCategoryListObject = {};
  urlCategoryListingArray.forEach((el) => {
    urlCategoryListObject[el] = true;
  });

  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
  const [filterCategoryList, setFilterCategoryList] = useState([]);

  const fetchData = async () => {
    const res = await fetch(SummaryApi.filterProducts.url, {
      method: SummaryApi.filterProducts.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        category: filterCategoryList,
      }),
    });
    const api = await res.json();
    setData(api?.data || []);
  };

  const handleSelectCategory = (e) => {
    const { name, value, checked } = e.target;

    setSelectCategory((preve) => {
      return {
        ...preve,
        [value]: checked,
      };
    });
  };

  useEffect(() => {
    fetchData();
  }, [filterCategoryList]);

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory).map(
      (categoryKeyName) => {
        if (selectCategory[categoryKeyName]) {
          return categoryKeyName;
        }

        return null;
      }
    );
    setFilterCategoryList(arrayOfCategory);

    // format for url change when change on the checkbox
    const urlFormat = arrayOfCategory.map((el, index) => {
      if (arrayOfCategory.length - 1 === index) {
        return `category=${el}`;
      }
      return `category=${el}&&`;
    });

    navigate("/product-category?" + urlFormat.join(""));
  }, [selectCategory]);

  const handleOnChangeSortBy = (e) => {
    const { value } = e.target;
    setSortBy(value);

    if (value === "asc") {
      setData((preve) => preve.sort((a, b) => a.sellingPrice - b.sellingPrice));
    }
    if (value === "dsc") {
      setData((preve) => preve.sort((a, b) => b.sellingPrice - a.sellingPrice));
    }
  };

  useEffect(() => {
  }, [sortBy]);

  return (
    <div className="container mx-auto p-3 min-h-[calc(100vh-125px)]">
      {/* desktop version */}
      <div className="hidden lg:grid grid-cols-[200px,1fr]">
        {/* left side */}
        <div className="bg-white p-2 min-h-[calc(100vh-153px)] overflow-y-scroll scrollbar-none">
          {/* sort by */}
          <div className="">
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
              sort by :
            </h3>

            <form className="text-sm flex flex-col gap-2 py-2">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  value={"asc"}
                  checked={sortBy === "asc"}
                  onChange={handleOnChangeSortBy}
                />
                <label>Price - Low to High</label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  value={"dsc"}
                  checked={sortBy === "dsc"}
                  onChange={handleOnChangeSortBy}
                />
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>

          {/* filter by */}
          <div className="">
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
              Category
            </h3>

            <form className="text-sm flex flex-col gap-2 py-2">
              {productCategory.map((categoryName, i) => {
                return (
                  <div
                    key={categoryName + i}
                    className="flex items-center gap-3"
                  >
                    <input
                      type="checkbox"
                      name="category"
                      value={categoryName?.value}
                      checked={selectCategory[categoryName?.value] || false}
                      id={categoryName?.value}
                      onChange={handleSelectCategory}
                    />
                    <label htmlFor={categoryName?.value}>
                      {categoryName?.label}
                    </label>
                  </div>
                );
              })}
            </form>
          </div>
        </div>

        {/* right side ( product ) */}
        <div className="h-[calc(100vh-154px)] overflow-y-scroll lg:w-[1000px] scrollbar-none pl-4">
          <div className="flex items-center justify-between ">
            <BackButton />
            <p className="text-slate-500 text-xl my-3 relative  flex gap-2">
              Search Results :
              <span className="text-red-600">{data.length}</span>
            </p>
          </div>
          <div>
            {data.length !== 0 && (
              <InputSuggestionVerticalCard data={data} loading={loading} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;

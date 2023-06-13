import React from "react";

const CategoryForm = ({ hanleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={hanleSubmit} className=" m-5">
        <div>
          <input
            type="text"
            placeholder="Enter New Category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className=" p-3 border-2 border-slate-950 w-72"
          />
        </div>
        <button className=" mt-2 w-24 rounded p-2 bg-green-400" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default CategoryForm;

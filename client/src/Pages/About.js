import React from "react";
import Layout from "../components/Layout/Layout";
import AboutUs from "../images/aboutUs.jpg";

const About = () => {
  return (
    <Layout title={"AboutUs - Ecommerce App"}>
      <div className="absolute max-w-[800px] max-h-100 md:flex md:mt-32 md:ml-64 col-span-2 grid ">
        <div className=" w-full h-full p-4">
          {" "}
          <img src={AboutUs} alt="about us" />
        </div>
        <div className=" p-4">
          Sed no et et magna no, labore sanctus ut accusam dolor eirmod aliquyam
          kasd gubergren diam. Diam et ut sanctus vero. Aliquyam et elitr erat
          elitr, lorem sea magna gubergren rebum lorem, nonumy et dolor justo et
          et diam diam. Aliquyam sit ipsum et nonumy diam amet eos eirmod.
          Nonumy.
        </div>
      </div>
    </Layout>
  );
};

export default About;

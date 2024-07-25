import React from "react";
import NabarCompo from "./navbar";
import Footer from "./Footer";
import a from "../../src/assests/a.jpg";
import a1 from "../../src/assests/a1.jpg";
import a2 from "../../src/assests/a2.jpg";
import a3 from "../../src/assests/a3.jpg";
import a4 from "../../src/assests/a4.jpg";
import a5 from "../../src/assests/a5.jpg";
import a6 from "../../src/assests/a6.jpg";
import a7 from "../../src/assests/a7.jpg";
import a8 from "../../src/assests/a8.jpg";
import a9 from "../../src/assests/a9.jpg";
import a10 from "../../src/assests/a10.jpg";
import a11 from "../../src/assests/a11.jpg";
import a12 from "../../src/assests/a12.jpg";
import a13 from "../../src/assests/a13.jpg";
import a14 from "../../src/assests/a14.jpg";
import a15 from "../../src/assests/a15.jpg";
import a16 from "../../src/assests/a16.jpg";

function About() {
  return (
    <div className="">
      <NabarCompo />

      <div className="container">
        <div className="row">
          <img src={a} alt="vhs about image" />
          <img src={a1} alt="vhs about image" />
          <img src={a2} alt="vhs about image" />
          <img src={a3} alt="vhs about image" />
          <img src={a4} alt="vhs about image" />
          <img src={a5} alt="vhs about image" />
          <img src={a6} alt="vhs about image" />
          <img src={a7} alt="vhs about image" />
          <img src={a8} alt="vhs about image" />
          <img src={a9} alt="vhs about image" />
          <img src={a10} alt="vhs about image" />
          <img src={a11} alt="vhs about image" />
          <img src={a12} alt="vhs about image" />
          <img src={a13} alt="vhs about image" />
          <img src={a14} alt="vhs about image" />
          <img src={a15} alt="vhs about image" />
          <img src={a16} alt="vhs about image" />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default About;

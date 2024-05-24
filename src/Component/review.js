import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./layout.css";

export default function Review() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "ease-in-out",
  };
  const reviw = [
    {
      img: "../assests/prfil4.jfif",
      review:
        "Hi The Vu Care   team ws very good in work wise, hard working  made my home look neat n tidy   staff behaviour ws good and all the services  completed they were in time reached my place Bangarpet   I Recommend the vucare for the Vu Care thank u for the service",
    },
    {
      img: "../assests/prfil2.jfif",
      review:
        "Hi The Vu Care   team ws very good in work wise, hard working  made my home look neat n tidy   staff behaviour ws good and all the services  completed they were in time reached my place Bangarpet   I Recommend the vucare for the Vu Care thank u for the service",
    },
    {
      img: "../assests/prfil1.jfif",
      review:
        "Hi The Vu Care   team ws very good in work wise, hard working  made my home look neat n tidy   staff behaviour ws good and all the services  completed they were in time reached my place Bangarpet   I Recommend the vucare for the Vu Care thank u for the service",
    },
    {
      img: "../assests/prfil4.jfif",
      review:
        "Hi The Vu Care   team ws very good in work wise, hard working  made my home look neat n tidy   staff behaviour ws good and all the services  completed they were in time reached my place Bangarpet   I Recommend the vucare for the Vu Care thank u for the service",
    },
  ];

  return (
    <>
    <div className="row mt-5">
      <div className="row align-items-center m-auto">
        <span className="col-md-3 hrline"></span>
        <h4 className="col-md-5 m-auto fnt text-center boldt grndclr text-black">
          Hear What They Say About Us
        </h4>{" "}
        <span className="col-md-3 m-auto hrline"></span>
      </div>
      <div className="row mt-5 ">
        <iframe
          className="col-md-4"
          height="215"
          src="https://www.youtube.com/embed/zsgzaPvpb4U?si=PJPAcz3MetyqwfWb"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
        <iframe
          className="col-md-4"
          height="215"
          src="https://www.youtube.com/embed/vPvrxAIVkBQ?si=rld9riPYlwYsXzmW"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
        <iframe
          className="col-md-4"
          height="215"
          src="https://www.youtube.com/embed/ooSJGLA3DlE?si=z1jm5cv0vJO_MnNA"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    </div></>
  );
}

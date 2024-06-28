// import React from "react";
// import NabarCompo from "./navbar";

// function Career() {
//   return (
//     <div className="row">
//       <NabarCompo />
//     </div>
//   );
// }

// export default Career;

// Auto Play

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/navigation"; // Import navigation CSS

import { FreeMode, Pagination, Autoplay, Navigation } from "swiper/modules";
import axios from "axios";

export default function Career() {
  const [testimonialdata, settestimonialdata] = useState([]);
  useEffect(() => {
    getalltestimonial();
  }, []);
  const getalltestimonial = async () => {
    let res = await axios.get(
      "https://api.vijayhomeservice.com/api/testimonial/getalltestimonial"
    );
    if ((res.status = 200)) {
      settestimonialdata(res.data?.data);
    }
  };
  const getEmbedUrl = (videoUrl) => {
    if (videoUrl.includes("youtube.com/shorts")) {
      const videoId = videoUrl.split("/").pop();
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (videoUrl.includes("youtube.com/watch")) {
      const videoId = new URLSearchParams(new URL(videoUrl).search).get("v");
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return videoUrl;
  };

  console.log("testimonialdata=====", testimonialdata);
  return (
    <div className="container">
      <div className="row">
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="mySwiper"
        >
          <div className="col-md-4">
            {testimonialdata.map((testimonial) => (
              <SwiperSlide
                key={testimonial._id}
                style={{
                  // height: "500px",
                  // width: "500px",
                  backgroundColor: "white",
                  padding: "0px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              >
                {testimonial.videolink && (
                  <iframe
                    width="100%"
                    height="200"
                    src={getEmbedUrl(testimonial.videolink)}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                )}
                <div className="poppins-medium mt-2">{testimonial.title}</div>

                <div className="poppins-medium">
                  {testimonial.Testimonialname}
                </div>

                <div className="poppins-regular mt-2">{testimonial.review}</div>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
    </div>
  );
}

// import React, { useState, useEffect } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/free-mode";
// import "swiper/css/pagination";
// import "swiper/css/autoplay";
// import "swiper/css/navigation"; // Import navigation CSS

// import { FreeMode, Pagination, Autoplay, Navigation } from "swiper/modules";
// import axios from "axios";

// export default function Career() {
//   const [testimonialdata, settestimonialdata] = useState([]);
//   useEffect(() => {
//     getalltestimonial();
//   }, []);
//   const getalltestimonial = async () => {
//     let res = await axios.get(
//       "https://api.vijayhomeservice.com/api/testimonial/getalltestimonial"
//     );
//     if ((res.status = 200)) {
//       settestimonialdata(res.data?.data);
//     }
//   };
//   const getEmbedUrl = (videoUrl) => {
//     if (videoUrl.includes("youtube.com/shorts")) {
//       const videoId = videoUrl.split("/").pop();
//       return `https://www.youtube.com/embed/${videoId}`;
//     } else if (videoUrl.includes("youtube.com/watch")) {
//       const videoId = new URLSearchParams(new URL(videoUrl).search).get("v");
//       return `https://www.youtube.com/embed/${videoId}`;
//     }
//     return videoUrl;
//   };

//   console.log("testimonialdata=====", testimonialdata);

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="swiper-container">
// <Swiper
//   slidesPerView={3}
//   spaceBetween={30}
//   freeMode={true}
//   pagination={{
//     clickable: true,
//     el: ".swiper-pagination",
//   }}
//   // autoplay={
//   //   {
//   //     delay: 1500,
//   //     disableOnInteraction: false,
//   //   }
//   // }
//   navigation={{
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   }}
//   modules={[FreeMode, Pagination, Autoplay, Navigation]}
//   className="mySwiper"
// >
//             <div className="col-md-4">
//               {testimonialdata.map((testimonial) => (
// <SwiperSlide
//   key={testimonial._id}
//   style={{
//     // height: "500px",
//     // width: "500px",
//     backgroundColor: "white",
//     padding: "0px",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "flex-start",
//   }}
// >
//                   {testimonial.videolink && (
//                     <iframe
//                       width="100%"
//                       height="200"
//                       src={getEmbedUrl(testimonial.videolink)}
//                       title="YouTube video player"
//                       frameBorder="0"
//                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                       allowFullScreen
//                     ></iframe>
//                   )}
//                   <div className="poppins-medium mt-2">{testimonial.title}</div>

//                   <div className="poppins-medium">
//                     {testimonial.Testimonialname}
//                   </div>

//                   <div className="poppins-regular mt-2">
//                     {testimonial.review}
//                   </div>
//                 </SwiperSlide>
//               ))}
//             </div>
//           </Swiper>

//           {/* Custom navigation buttons */}
//           <div className="swiper-button-prev">
//             <i className="fa-solid fa-arrow-left"></i>
//           </div>
//           <div className="swiper-button-next">
//             <i className="fa-solid fa-arrow-right"></i>
//           </div>

//           {/* Hide pagination dots */}
//           <div className="swiper-pagination"></div>
//         </div>
//       </div>
//     </div>
//   );
// }

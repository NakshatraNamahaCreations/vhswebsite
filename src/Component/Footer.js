// import React from "react";
// import AddIcCallIcon from "@mui/icons-material/AddIcCall";
// import MailOutlineIcon from "@mui/icons-material/MailOutline";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import Review from "./review";
// export default function Footer() {
//   const cities = [
//     "Ahmedabad",
//     "Bangalore",
//     "Lucknow",
//     "Chennai",
//     "Hyderabad",
//     "Pune",
//     "Mumbai",
//     "Surat",
//     "Vadodara",
//     "Gurugram",
//     "NCR",
//     "Noida",
//     "Sarjapur Road",
//     "Whitefield",
//     "Bannerghatta Road",
//     "Electronic City",
//     "HSR Layout",
//     "Jayanagar",
//     "JP Nagar",
//     "Hosur Road",
//     "Indira Nagar",
//     "Koramangala",
//     "Hesaraghatta Main Road",
//     "Devanahalli",
//     "Marathahalli",
//     "Hebbal",
//     "Kanakapura Road",
//     "Anekal",
//     "Hennur Road",
//     "CV Raman Nagar",
//     "Kalyan Nagar",
//     "RT Nagar",
//     "Jalahalli",
//     "HRBR Layout",
//     "BTM Layout",
//     "Ramamurthy Nagar",
//     "Brooke Field",
//     "Jakkur",
//     "Dollars Colony",
//     "Abbigere",
//     "Rajanukunte",
//     "GM Palya",
//     "Kundalahalli",
//     "Madiwala",
//     "Fraser Town",
//     "Chandapur",
//     "Gottigere",
//     "BasavaNagar",
//     "Nagarbhavi",
//     "Belandur",
//     "Hoskote",
//     "Chamarajpet",
//     "Richards Town",
//     "Lavelle Road",
//     "Kodigehalli",
//     "Chikkajala",
//     "Hanumanth Nagar",
//     "Akshaya Nagar",
//     "Thanisandra",
//     "Sarjapur",
//     "Hegde Nagar",
//     "Jigani",
//     "Industrial Area",
//     "House Road",
//     "Mathikere Rest",
//     "Begur Road",
//     "Rajajinagar",
//     "MG Road",
//     "HBR Layout",
//     "Banaswadi",
//     "Uttarahalli",
//     "Airport Road",
//     "Thippasandra",
//     "Banashankari",
//     "Bagalur",
//     "KR Puram",
//     "Bommanahalli",
//     "OMBR Layout",
//     "Mysore Road",
//     "Silkboard",
//     "RMV Extension Stage",
//     "Old Madras Road",
//     "Kasturi Nagar",
//     "Tumkur Road",
//     "Richmond Road",
//     "Vidyaranyapura",
//     "Mahadevapura",
//     "Rajarajeshwari Nagar",
//     "Malleshwaram",
//     "AECS Layout",
//     "Chikkaballapur",
//     "Defence Colony",
//     "Kanaka Nagar",
//     "Hulimavu",
//     "Thyagaraj Nagar",
//     "Basaveshwaranagar",
//     "Airport Area",
//     "Kumaraswamy Layout",
//     "Sanjay Nagar",
//     "Hoskote",
//     "Kudlu Gate",
//     "RBI Layout",
//     "Palace Road",
//     "Hoodi Village",
//     "Millers Road",
//     "Huskur",
//     "Vijaya Bank Layout",
//     "Shanti Nagar",
//     "Hebbal Kempapura",
//     "Tippasandra",
//     "Naganathapura",
//     "Yeshwantpur",
//     "Jeevan Bima Nagar",
//     "Cox Town",
//     "Ulsoor",
//     "Benson Town",
//     "ITPL",
//     "Doddaballapur",
//     "Kaggadaspura Nagwar",
//     "Attibele",
//     "Padmanabhanagar",
//     "Vijayanagar",
//     "Kengeri",
//     "Peenya",
//     "Magadi Road",
//     "Nelamangala",
//     "Sahakar Nagar",
//     "Dodballapur Road",
//     "Outer Ring Road",
//     "Vigyan Nagar",
//     "Basavanagudi",
//     "Mallesh Palaya",
//     "Peenya",
//     "Cookes Town",
//     "Old Airport Road",
//     "Bellary Road",
//     "Sadaramangala",
//     "Anjanapura",
//     "Majestic",
//     "Vasanth Nagar",
//     "Wilson Garden",
//     "ISRO Layout",
//     "HMT Layout",
//     "Nagawara",
//     "Doddaballapur Road",
//     "Central Silk Board",
//     "Nandi Hills",
//     "GangaNagar",
//     "Bommasandra",
//     "Pai Layout",
//     "Sadaramangala",
//     "Prashanth Nagar",
//     "Hennur",
//     "Raj Bhavan",
//     "VidyaNagar",
//     "Bilekahalli",
//     "Manek Chowk",
//     "Chambal River",
//     "Indraprastha",
//   ];
//   return (
//     <>
//       <div className="container">
//         <div className="row align-items-center m-auto">
//           <span className="col-md-4 hrline"></span>
//           <h4 className="col-md-3 m-auto fnt text-center boldt grndclr text-black">
//             Why Choose Us ?
//           </h4>{" "}
//           <span className="col-md-4 m-auto hrline"></span>
//         </div>
//         <div className="row mt-5">
//           <div className="col-md-2 text-center">
//             <img
//               src="./Newimg/painter.svg"
//               width={80}
//               // className="row  "
//               height={80}
//               alt=""
//             />
//             <p>Trained Professionals</p>
//           </div>
//           <div className="col-md-2 text-center ">
//             <img src="./Newimg/certificate.svg" width={80} height={80} alt="" />
//             <p>Assian Paint Certified</p>
//           </div>{" "}
//           <div className="col-md-2 text-center">
//             <img width={80} height={80} src="./Newimg/guarantee-1.svg" alt="" />
//             <p>100% Guarantee</p>
//           </div>
//           <div className="col-md-2 text-center">
//             <img src="./Newimg/best-price.svg" width={80} height={80} alt="" />
//             <p>Best Price Best Work</p>
//           </div>
//           <div className="col-md-2 text-center">
//             <img src="./Newimg/guarantee.svg" width={80} height={80} alt="" />
//             <p>1 Year Service Warranty</p>
//           </div>
//           <div className="col-md-2 text-center   ">
//             <img src="./Newimg/network.svg" width={80} height={80} alt="" />
//             <p>No Subcontract</p>
//           </div>
//         </div>
//         <div className="row align-items-center m-auto">
//           <span className="col-md-4 hrline"></span>
//           <h4 className="col-md-4 m-auto fnt text-center boldt grndclr text-black">
//             Awards and Recognition
//           </h4>{" "}
//           <span className="col-md-4 m-auto hrline"></span>
//         </div>
//         <div className="row mt-5">
//           <div className="col-md-3 ">
//             <img
//               src="./Newimg/01-thumb.jpg"
//               className="brd"
//               width={220}
//               height={220}
//               alt=""
//             />
//           </div>
//           <div className="col-md-3 ">
//             <img
//               src="./Newimg/02-thumb.jpg"
//               className="brd"
//               width={220}
//               height={220}
//               alt=""
//             />
//           </div>
//           <div className="col-md-3 ">
//             <img
//               src="./Newimg/03-thumb.jpg"
//               className="brd"
//               width={220}
//               height={220}
//               alt=""
//             />
//           </div>{" "}
//           <div className="col-md-3 ">
//             <img
//               src="./Newimg/05-thumb.jpg"
//               className="brd"
//               width={220}
//               height={220}
//               alt=""
//             />
//           </div>
//         </div>
//         <Review />
//       </div>
//       <div className="row mt-5 bg-dark text-white m-auto ">
//         <div className="container ">
//           <div className="row grid-container3   p-2">
//             <li
//               className="col-md-1"
//               style={{ fontSize: "12px", listStyleType: "none" }}
//             >
//               <a href="#" style={{ textDecoration: "none", color: "white" }}>
//                 Home
//               </a>
//             </li>
//             <li
//               className="col-md-1"
//               style={{ fontSize: "12px", listStyleType: "none" }}
//             >
//               {" "}
//               <a href="#" style={{ textDecoration: "none", color: "white" }}>
//                 Contact
//               </a>
//             </li>
//             <li
//               className="col-md-1"
//               style={{ fontSize: "12px", listStyleType: "none" }}
//             >
//               {" "}
//               <a href="#" style={{ textDecoration: "none", color: "white" }}>
//                 About Us
//               </a>
//             </li>
//             <li
//               className="col-md-2"
//               style={{ fontSize: "12px", listStyleType: "none" }}
//             >
//               {" "}
//               <a href="#" style={{ textDecoration: "none", color: "white" }}>
//                 Terms and Condition
//               </a>
//             </li>
//             <li
//               className="col-md-2"
//               style={{ fontSize: "12px", listStyleType: "none" }}
//             >
//               <a href="#" style={{ textDecoration: "none", color: "white" }}>
//                 Refund and Cancellation
//               </a>
//             </li>
//             <li
//               className="col-md-2"
//               style={{ fontSize: "12px", listStyleType: "none" }}
//             >
//               {" "}
//               <a href="#" style={{ textDecoration: "none", color: "white" }}>
//                 Policy Privacy Policy
//               </a>
//             </li>
//             <li
//               className="col-md-1"
//               style={{ fontSize: "12px", listStyleType: "none" }}
//             >
//               {" "}
//               <a href="#" style={{ textDecoration: "none", color: "white" }}>
//                 VHS Logo
//               </a>
//             </li>
//             <li
//               className="col-md-1"
//               style={{ fontSize: "12px", listStyleType: "none" }}
//             >
//               {" "}
//               <a href="#" style={{ textDecoration: "none", color: "white" }}>
//                 Career
//               </a>
//             </li>
//             <li
//               className="col-md-1"
//               style={{ fontSize: "12px", listStyleType: "none" }}
//             >
//               {" "}
//               <a href="#" style={{ textDecoration: "none", color: "white" }}>
//                 Work with us
//               </a>
//             </li>
//           </div>
//           <p
//             className="mt-2 m-auto"
//             style={{ border: "1px solid #ECE8DD" }}
//           ></p>
//           <h4 className="p-2">INDIA</h4>
//           <div className="row">
//             {cities.map((city, cityIndex) => (
//               <>
//                 <div key={cityIndex} style={{ width: "auto" }}>
//                   <span
//                     className="fnt12 amazon_fnt li_f pdnl bordr45"
//                     key={cityIndex}
//                   >
//                     {city}
//                   </span>{" "}
//                 </div>
//               </>
//             ))}
//           </div>
//           <div className="row mt-4">
//             <h4>UAE (Comming Soon)</h4>
//             <p>
//               <span>Dubai</span>
//               <span>Abu Dhabi </span>
//               <span>Sharjah</span>
//             </p>
//           </div>
//           <div className="row mt-4">
//             <h4>London (Comming Soon)</h4>
//             <p>
//               <span>Enfield</span>

//               <span>Greenwich</span>
//             </p>
//           </div>
//           <p
//             className="mt-2 m-auto"
//             style={{ border: "1px solid #ECE8DD" }}
//           ></p>

//           <div className="row p-2">
//             <p className="col-md-8  m-auto" style={{ fontSize: "13px" }}>
//               <span className="fntf me-2">
//                 {" "}
//                 © Copyright 2023 Vijay Home Services. All rights reserved.
//                 Designed and Developed By
//               </span>
//               <a
//                 style={{ textDecoration: "none" }}
//                 className="fntf"
//                 href="https://nakshatranamahacreations.com/"
//               >
//                 Nakshatra Namaha Creations
//               </a>
//             </p>
//             <div className="col-md-4 ">
//               <div className=" row grid-footer">
//                 <div className="col-md-2 m-auto ">
//                   <img
//                     width={100}
//                     height={50}
//                     src="..\NImages\Screenshot (19).png"
//                     alt=""
//                   />
//                 </div>
//                 <div className="col-md-2 m-auto ">
//                   <img
//                     style={{ borderRadius: "5px" }}
//                     width={100}
//                     height={50}
//                     src="..\NImages\Screenshot (20).png"
//                     alt=""
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

import React from "react";

function Footer() {
  return (
    <div
      className="row"
      style={{ backgroundColor: "#C2C2C2", padding: "40px" }}
    >
      <div className="d-flex">
        <img
          src="./images/vhs.png"
          alt="loading...."
          style={{ width: "60px", height: "55px" }}
        />
        <div
          className="mx-3 mt-2 pt-1"
          style={{ color: "darkred", fontSize: "20px", fontWeight: "bold" }}
        >
          Vijay Home Services
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-4">
          <div
            className=""
            style={{ color: "black", fontSize: "16px", fontWeight: "bold" }}
          >
            Information
          </div>

          <div className="f-desc">
            <a href="/" style={{ textDecoration: "none", color: "black" }}>
              Home
            </a>
          </div>
          <div className="f-desc">
            {" "}
            <a href="/about" style={{ textDecoration: "none", color: "black" }}>
              About Us
            </a>
          </div>
          <div className="f-desc">Categories</div>
          <div className="f-desc">Blog</div>
          <div className="f-desc">Career</div>
          {/* <div className="f-desc">
            {" "}
            <a href="/login" style={{ textDecoration: "none", color: "black" }}>
              Login
            </a>
          </div> */}
          {/* <div className="f-desc">
            <a
              href="/Register"
              style={{ textDecoration: "none", color: "black" }}
            >
              Register
            </a>
          </div> */}
        </div>

        <div className="col-md-4">
          <div
            className=""
            style={{ color: "black", fontSize: "16px", fontWeight: "bold" }}
          >
            Legal
          </div>

          <div className="f-desc">
            <a href="/" style={{ textDecoration: "none", color: "black" }}>
              Terms & conditions
            </a>
          </div>
          <div className="f-desc">
            {" "}
            <a href="/about" style={{ textDecoration: "none", color: "black" }}>
              Privacy policy
            </a>
          </div>
          <div className="f-desc">Cancellation policy</div>
        </div>

        <div className="col-md-4">
          <div
            className=""
            style={{ color: "black", fontSize: "16px", fontWeight: "bold" }}
          >
            About/Contacts
          </div>

          <div className="f-desc">
            Vijay Home Services - Home Painting & Deep Cleaning Expert
          </div>

          <div className="d-flex mt-3">
            <img
              src="../assests/insta.webp"
              alt="loading..."
              style={{ width: "30px", height: "30px", borderRadius: "20px" }}
            />
            <img
              className="mx-3"
              src="../assests/youtube.png"
              alt="loading..."
              style={{ width: "30px", height: "30px", borderRadius: "20px" }}
            />
            <img
              // className="mx-3"
              src="../assests/facebook.png"
              alt="loading..."
              style={{ width: "30px", height: "30px", borderRadius: "20px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;

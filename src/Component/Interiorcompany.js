import React from "react";
import Footer from "./Footer";
import Homenavbar from "./Homenavbar";
import NavbarCompo from "./navbar";
import interior from "../../src/assests/interior.png";
import interior1 from "../../src/assests/interior1.png";
import interiorpainting from "../../src/assests/interiorpainting.jpeg";
import Social1 from "../../src/assests/socila1.webp";
import Social from "../../src/assests/social.webp";
import Carpet7 from "../../src/assests/carpet7.jpg";
import cheading1 from "../../src/assests/cheading1.jpg";

function Interiorcompany() {
  return (
    <div>
      <NavbarCompo />
      <Homenavbar />
      <div className="container">
        <div className="">
          <img
            src={interior}
            alt="loading...."
            style={{ width: "100%", height: "350px" }}
          />

          <div className="row mt-4">
            <div className="col-md-6">
              <img
                src={cheading1}
                alt="VHS"
                style={{ width: "100%", height: "230px" }}
              />
            </div>
            <div
              className="col-md-6"
              style={{ backgroundColor: "lightgrey", padding: "20px" }}
            >
              <div className="text-center poppins-black">Booking Now</div>
              <div className="d-flex mt-3">
                <div className="col-md-6">
                  <div className="text-center poppins-black">Name</div>
                </div>
                <div className="col-md-6">
                  <input type="text" className="i-input" />
                </div>
              </div>
              <div className="d-flex mt-3">
                <div className="col-md-6">
                  <div className="text-center poppins-black">Contact No</div>
                </div>
                <div className="col-md-6">
                  <input type="text" className="i-input" />
                </div>
              </div>

              <div
                className=""
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div
                  className="text-center poppins-regular p-2"
                  style={{
                    backgroundColor: "red",
                    fontSize: "14px",
                    color: "white",
                    borderRadius: "5px",
                    width: "40%",
                  }}
                >
                  GET STARTED
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="text-center poppins-black">
              Collaborate with Us -{" "}
              <span className="poppins-bold">100% Inhouse team</span>
            </div>
            <div className="poppins-regular text-center mt-1">
              Partner with Vijay Home Services to enhance your interior projects
              and provide your clients with an exceptional, turnkey experience.
              Together, we can:
            </div>

            <div className="row">
              <div className="col-md-6">
                <ul className="mt-4">
                  <li className="poppins-regular">
                    <span className="poppins-black">
                      Seamlessly Integrate Services :{" "}
                    </span>
                    Ensuring a smooth handover from renovation to final
                    cleaning, eliminating any disruptions for your clients.
                  </li>

                  <li className="poppins-regular mt-3">
                    <span className="poppins-black">Deliver Excellence : </span>
                    Combining our expertise to turn beautiful designs into
                    stunning, ready-to-live spaces.
                  </li>

                  <li className="poppins-regular mt-3">
                    <span className="poppins-black">Improve Efficiency : </span>
                    Streamline the post-renovation process by integrating
                    cleaning services into your project timeline, reducing
                    delays and ensuring timely project completion.
                  </li>

                  <li className="poppins-regular mt-3">
                    <span className="poppins-black">Showcase Quality : </span>
                    Present your completed projects in the best light with our
                    meticulous cleaning, ensuring that your work is displayed at
                    its highest quality.
                  </li>
                </ul>
              </div>

              <div className="col-md-6">
                <ul className="mt-4">
                  <li className="poppins-regular">
                    <span className="poppins-black">
                      Customized Solutions :{" "}
                    </span>
                    Tailor our cleaning services to meet the specific needs of
                    each project, offering flexible solutions that align with
                    your design vision and client expectations.
                  </li>

                  <li className="poppins-regular mt-3">
                    <span className="poppins-black">
                      Strengthen Reputation :{" "}
                    </span>
                    Enhance your reputation by partnering with a trusted
                    cleaning service, known for reliability and excellence,
                    reflecting positively on your brand.
                  </li>

                  <li className="poppins-regular mt-3">
                    <span className="poppins-black">Cost-Effective : </span>
                    Offering competitive pricing and bundled service packages
                    that provide value without compromising on quality.
                  </li>

                  <li className="poppins-regular mt-3">
                    <span className="poppins-black">
                      Eco-Friendly Options :{" "}
                    </span>
                    Incorporating environmentally friendly cleaning practices to
                    meet the growing demand for sustainable solutions in home
                    services.
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-4">
              <div className="text-center poppins-black">Why Choose Us?</div>
              <ol className="mt-4">
                <li className="poppins-regular">
                  <span className="poppins-black">
                    Comprehensive Cleaning Expertise :{" "}
                  </span>
                  Our specialized post-renovation cleaning services ensure every
                  corner of your newly designed space is free from dust, debris,
                  and any construction residues.
                </li>

                <li className="poppins-regular mt-3">
                  <span className="poppins-black">
                    Enhanced Client Satisfaction :{" "}
                  </span>
                  A spotless, well-maintained space not only highlights the
                  beauty of your designs but also significantly boosts client
                  satisfaction.
                </li>

                <li className="poppins-regular mt-3">
                  <span className="poppins-black">
                    Professional and Reliable Service :{" "}
                  </span>
                  Our team is known for reliability, attention to detail, and a
                  commitment to delivering the highest standards of cleanliness.
                </li>
              </ol>
            </div>

            <div className="mt-4">
              <div className="text-center poppins-black">Our Services</div>
              <ul className="mt-4">
                <li className="poppins-regular">
                  <span className="poppins-black">
                    Detailed Post-Renovation Cleaning :{" "}
                  </span>
                  We offer a thorough, multi-phase cleaning process to address
                  any unfinished issues, making sure your space is immaculate
                  and ready for occupancy.
                </li>

                <li className="poppins-regular mt-3">
                  <span className="poppins-black">
                    Custom Cleaning Plans :{" "}
                  </span>
                  Tailored to fit the specific needs of each project, our
                  cleaning packages ensure optimal results for every space.
                </li>

                <li className="poppins-regular mt-3">
                  <span className="poppins-black">Flexible Scheduling : </span>
                  We coordinate with your project timelines to provide a
                  hassle-free experience, stepping in as soon as the renovation
                  work is complete.
                </li>
              </ul>
            </div>

            <div className="">
              <div className="text-center poppins-black">How We Work</div>
              <img
                src={interior1}
                alt="VHS"
                style={{ width: "100%", height: "500px" }}
              />
              <div className="">
                <div className="poppins-black">
                  Book Post-Interior Cleaning in the App
                </div>
                <ul>
                  <li className="poppins-regular mt-1">
                    Simply open the app, select the post-interior cleaning
                    service, and provide details about your project. Choose a
                    date and time that works best for you, and confirm your
                    booking with just a few taps.
                  </li>
                </ul>
              </div>

              <div className="">
                <div className="poppins-black">Place the Order with Date</div>
                <ul>
                  <li className="poppins-regular mt-1">
                    Once you’ve selected your service, finalize your order by
                    choosing a specific date for the cleaning. This ensures our
                    team is scheduled to meet your needs exactly when you need
                    us.
                  </li>
                </ul>
              </div>

              <div className="">
                <div className="poppins-black">
                  Auto Confirmation with Message
                </div>
                <ul>
                  <li className="poppins-regular mt-1">
                    After placing your order, you will receive an automatic
                    confirmation message. This will include all the details of
                    your booking, ensuring you have everything you need for a
                    smooth process.
                  </li>
                </ul>
              </div>

              <div className="">
                <div className="poppins-black">
                  Personalized Project Management
                </div>
                <ul>
                  <li className="poppins-regular mt-1">
                    We will assign a dedicated Post-Interior Cleaning Team
                    Manager to oversee your project. From start to finish, your
                    manager will ensure that every aspect of the cleaning
                    process is handled meticulously, keeping you updated and
                    addressing any concerns promptly.
                  </li>
                </ul>
              </div>
              <div className="">
                <div className="poppins-black">
                  Job Start Update with Photos on WhatsApp
                </div>
                <ul>
                  <li className="poppins-regular mt-1">
                    On the day your project begins, our team will send you a job
                    start update along with photos via WhatsApp. This keeps you
                    informed and reassured that the work is progressing as
                    planned.
                  </li>
                </ul>
              </div>

              <div className="">
                <div className="poppins-black">Job Completion with Photos</div>
                <ul>
                  <li className="poppins-regular mt-1">
                    Upon completion of the cleaning, our team will send you a
                    final update with photos, showcasing the immaculate
                    condition of your space. This allows you to review the work
                    done and confirm your satisfaction.
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-4">
              <div className="text-center poppins-black">
                Experience the Vijay Home Services Difference
              </div>
              <ul className="mt-4">
                <li className="poppins-regular">
                  <span className="poppins-black">Seamless Integration : </span>
                  Enjoy a smooth, hassle-free experience with our streamlined
                  process and dedicated support.
                </li>

                <li className="poppins-regular mt-3">
                  <span className="poppins-black">
                    Custom Cleaning Plans :{" "}
                  </span>
                  Our professional cleaning team is trained to handle all
                  post-renovation cleaning tasks, ensuring your space is
                  immaculate.
                </li>

                <li className="poppins-regular mt-3">
                  <span className="poppins-black">
                    Customer Satisfaction :{" "}
                  </span>
                  We prioritize your satisfaction, providing high-quality
                  service and attention to detail in every project.
                </li>
              </ul>
            </div>

            <div className="row">
              <div className="poppins-semibold text-center">BOOK NOW</div>
              <div className="row mt-3 p-4">
                <div className="col-md-4">
                  <div className="d-flex">
                    <div
                      className="col-md-6"
                      style={{
                        display: "flex",

                        justifyContent: "center",
                      }}
                    >
                      <div className="poppins-black">Name</div>
                    </div>
                    <div className="col-md-6">
                      <input type="text" className=" c-input" />
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="d-flex">
                    <div
                      className="col-md-6"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <div className="poppins-black">Contact No</div>
                    </div>
                    <div className="col-md-6">
                      <input type="number" className=" c-input" />
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-4"
                  style={{ display: "flex", justifyContent: "end" }}
                >
                  <div
                    className="text-center poppins-black p-2"
                    style={{
                      backgroundColor: "red",
                      fontSize: "14px",
                      color: "white",
                      borderRadius: "5px",
                      width: "70%",
                      height: "40px",
                    }}
                  >
                    GET STARTED
                  </div>
                </div>
              </div>
            </div>

            <div className="row ">
              <div className="poppins-semibold text-center">
                Get Started Today!
              </div>
              <div
                className="mt-3"
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "center",
                }}
              >
                <div
                  className="col-md-6"
                  style={{ display: "flex", justifyContent: "end" }}
                >
                  <a href="https://play.google.com/store/apps/details?id=com.vhs1">
                    <img
                      src={Social1}
                      alt="vhs"
                      style={{ width: "auto", height: "50px" }}
                    />
                  </a>
                </div>
                <div className="col-md-6" style={{}}>
                  <img
                    src={Social}
                    alt="vhs"
                    style={{ width: "auto", height: "50px" }}
                  />
                </div>
              </div>
              <div className="poppins-extralight-italic text-center mt-3 mb-3">
                Download the Vijay Home Services app and book your post-interior
                cleaning service now to transform your newly renovated space
                into a pristine, livable home.
              </div>
            </div>
            <img
              src={Carpet7}
              alt="Carpet cleaning Image"
              style={{ width: "100%" }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Interiorcompany;

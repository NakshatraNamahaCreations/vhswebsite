import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import NavbarCompo from "./navbar";
import Footer from "./Footer";
import axios from "axios";
import ReactPlayer from "react-player";
import call from "../assests/call.gif";
import web from "../assests/web.gif";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { FreeMode, Pagination, Autoplay, Navigation } from "swiper/modules";
import Faq from "react-faq-component";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, clearCart } from "../Redux1/MyCartSlice";

const Subcategory = () => {
  const [subcategoryData, setSubcategoryData] = useState([]);
  const { subcategory } = useParams();
  const [allSubcat, setAllSubcat] = useState([]);
  const [sub, setSub] = useState("");
  const [subcategoryVideo, setsubcategoryVideo] = useState([]);
  const [offerBannerdata, setofferBannerdata] = useState([]);
  const [vshow, setvShow] = useState(false);
  const [show, setShow] = useState(false);
  const MyCartItmes = useSelector((state) => state.cart);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [Item, setItem] = useState([]);
  const dispatch = useDispatch();
  const [Bannermidledata, setBannermidledata] = useState([]);

  const vhandleClose = () => setvShow(false);
  const vhandleShow = () => setvShow(true);

  useEffect(() => {
    getSubcategories();
  }, []);

  useEffect(() => {
    if (subcategory && allSubcat.length > 0) {
      const parts = subcategory.split("-");
      const category1 = capitalizeFirstLetter(parts[0]);

      console.log("Searching for:", category1);
      console.log("Available subcategories:", allSubcat);

      const fullServiceName = allSubcat.find((service) =>
        service.subcategory.toLowerCase().includes(category1.toLowerCase())
      );

      console.log("Found fullServiceName:", fullServiceName);

      if (fullServiceName) {
        setSub(fullServiceName.subcategory);
        getSubcategory(fullServiceName.subcategory);
      } else {
        console.error("Service not found");
      }
    }
  }, [subcategory, allSubcat]);

  const localstoragecitys = localStorage.getItem("city");

  const getSubcategories = async () => {
    try {
      const res = await axios.get(
        `https://api.vijayhomesuperadmin.in/api/userapp/getappsubcat`
      );
      if (res.status === 200) {
        setAllSubcat(res.data.subcategory);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getbannerdatamiddle();
  }, []);

  const getbannerdatamiddle = async () => {
    let res = await axios.get(
      "https://api.vijayhomesuperadmin.in/api/userapp/getallSpotlightSP"
    );
    if ((res.status = 200)) {
      setBannermidledata(
        res.data?.SpotlightSP.filter((i) => i?.service === sub)
      );
    }
  };

  const getSubcategory = async (category) => {
    try {
      const res = await axios.post(
        `https://api.vijayhomesuperadmin.in/api/userapp/postsubcatservice`,
        { Subcategory: category }
      );
      if (res.status === 200) {
        console.log("servuce data ", res.data.subcatdata);
        setSubcategoryData(res.data.subcatdata);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    getsubcategoryVideo();
  }, []);

  const getsubcategoryVideo = async () => {
    try {
      let res = await axios.get(
        "https://api.vijayhomesuperadmin.in/api/userapp/getappsubcat"
      );
      if ((res.status = 200)) {
        let subcategorys = subcategoryData?.subcategory?.toLowerCase();
        let filteredData = res?.data?.subcategory?.filter((Ele) => {
          let videoLink = Ele?.subcategory?.toLowerCase();

          return subcategorys?.includes(videoLink);
        });
        // console.log(res.data.subcategory);
        setsubcategoryVideo(filteredData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getbannerimg();
  }, []);

  const getbannerimg = async () => {
    let res = await axios.get(
      "https://api.vijayhomesuperadmin.in/api/userapp/getallofferbanner"
    );
    if ((res.status = 200)) {
      setofferBannerdata(
        res.data?.offerbanner.filter((i) => i.subcategory === sub)
      );
    }
  };

  const [selectedData, setSelectedData] = useState([]);

  const handleBook = (data) => {
    setSelectedData(data);
    setShow(true);
  };

  const [selectedItems, setSelectedItems] = useState([]);

  const TotalPrice = MyCartItmes.reduce(
    (acc, cur) => acc + Number(cur.offerprice) * cur.qty, // Calculate total price considering quantity
    0
  );
  const dispatchService = useDispatch();
  const cartItems = useSelector((state) => state.viewCart);

  const navigate = useNavigate();

  const handleViewCartClick = () => {
    navigate("/cart");
  };

  const handleItemClick = (item, index) => {
    setSelectedItemIndex(index);
    setItem(selectedData);
    const Item = selectedData;
    const itemToAdd = {
      _id: item._id,
      category: sub,
      service: Item,
      pName: item.pName,
      pPrice: item.pPrice,
      pofferprice: item.pofferprice,
      pservices: item.pservices,
    };

    if (!item.pservices) {
      const existingCartItem = MyCartItmes.find(
        (cartItem) => cartItem.category === sub
      );

      if (existingCartItem) {
        dispatch(addToCart({ ...itemToAdd, id: existingCartItem.id }));
      } else {
        dispatch(clearCart());
        dispatch(addToCart(itemToAdd));
      }
    } else {
      // alert("This is AMC services ")
      navigate("/summary", { state: { plan: item, sdata: selectedData } });
      console.log("amc service", selectedData);
    }

    setSelectedItems((prevSelectedItems) => {
      const updatedSelectedItems = [...prevSelectedItems];
      updatedSelectedItems[index] = !updatedSelectedItems[index];
      return updatedSelectedItems;
    });
  };

  const scrollToService = (index) => {
    const section = document.getElementById(`service-${index}`);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  console.log("subcategoryData====", subcategoryData);

  return (
    <div>
      <NavbarCompo />
      <div className="container">
        <div className="row mt-3">
          <h1 className="poppins-semibold">{subcategory}</h1>
          <ul>
            {subcategoryData.map((data, index) => (
              <>
                <li key={index} style={{ color: "black" }}>
                  {data?.serviceName}
                </li>
                <img src={data.imglink} />
              </>
            ))}
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Subcategory;

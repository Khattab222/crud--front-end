import { useEffect, useState } from "react";
import axios from "axios";
import Axios from "axios";
import Joi from "joi";
import { useNavigate } from "react-router-dom";

export default function AddProductHook() {
  let navigate = useNavigate();
  let userId = JSON.parse(localStorage.getItem("userinfo")).id;
  let userName = JSON.parse(localStorage.getItem("userinfo")).name;
  const [status, setStatus] = useState("add product");
  const [updatProdId, setupdatProdId] = useState(0);
  const [products, setproducts] = useState([]);
  const [validerror, setvaliderror] = useState([]);
  const [apierror, setapierror] = useState([]);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    pName: "",
    pDescription: "",
    price: "",
    UserId: userId,
  });
  // get all products
  const getData = async () => {
    const { data } = await Axios.get("http://localhost:3000/api/v1/product/");
    if (data) {
      setproducts(data.data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // when change inputs
  const handleInputChange = (e) => {
    setvaliderror([]);
    setapierror([]);
    let newPro = { ...product };
    newPro[e.target.name] = e.target.value;

    setProduct(newPro);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validate = validation();
    setLoading(true);
    if (validate.error) {
      setvaliderror(validate.error.details);

      setLoading(false);
    } else {
      setvaliderror([]);
      sendApi(product);
    }
  };

  // validation
  function validation() {
    const schema = Joi.object({
      pName: Joi.string()
        // .alphanum()
        .min(5)
        .max(30)
        .required(),
      pDescription: Joi.string().min(3).max(20).required(),
      price: Joi.number().min(10).max(100000).required(),
      UserId: Joi.number(),
    });
    return schema.validate(product, { abortEarly: false });
  }
  // send data to api
  const sendApi = async (prodData) => {
    const { data } = await axios.post(
      "http://localhost:3000/api/v1/product/add",
      prodData
    );
    if (data.message === "success") {
      setTimeout(() => {
        getData();
        product.pName = "";
        product.pDescription = "";
        product.price = "";
        setLoading(false);
      }, 2000);
    } else if (data.Error) {
      setapierror(data.Error.errors);
      setLoading(false);
    }
  };
  // delete product
  const deleteProd = async (prodId) => {
    const res = await axios.delete(
      `http://localhost:3000/api/v1/product/delete/${prodId}/${userId}`
    );
    getData();
  };

  //update product
  const updatProd = (prod) => {
    let newProducts = products.filter((item) => item.id !== prod.id);
    console.log(prod);
    setproducts(newProducts);
    setupdatProdId(prod.id);
    setStatus("Update");
    product.pName = prod.pName;
    product.pDescription = prod.pDescription;
    product.price = prod.price;
  };

  // on submit update
  const handleUpdat = (e) => {
    e.preventDefault();
    let validate = validation();
    setLoading(true);
    if (validate.error) {
      setvaliderror(validate.error.details);

      setLoading(false);
    } else {
      setvaliderror([]);
      sendUpdateApi(product);
    }
  };

  // send updated data to api
  const sendUpdateApi = async (prodData) => {
    const { data } = await axios.put(
      `http://localhost:3000/api/v1/product/update/${updatProdId}/${userId}`,
      prodData
    );
    console.log(data);
    if (data.message === "success") {
      setTimeout(() => {
        getData();
        product.pName = "";
        product.pDescription = "";
        product.price = "";
        setLoading(false);
        setStatus("add product");
      }, 2000);
    } else if (data.Error) {
      console.log("err");
      setapierror(data.Error.errors);
      setLoading(false);
    }
  };
  // sign out
  const logOut = () => {
    localStorage.removeItem("userinfo");
    navigate("/");
  };

  //
  const searchProduct = async (e) => {
    const { data } = await axios.get(
      `http://localhost:3000/api/v1/product/search/?name=${e.target.value}`
    );
    if (data.message === "success") {
      setproducts(data.data);
    } else {
      console.log(data.message);
    }
  };

  return [
    userName,
    logOut,
    status,
    handleUpdat,
    handleSubmit,
    apierror,
    handleInputChange,
    product,
    validerror,
    loading,
    searchProduct,
    products,
    deleteProd,
    updatProd,
    userId,
  ];
}

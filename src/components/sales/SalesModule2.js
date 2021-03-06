import React, { useState, useEffect } from "react";
import axios from "axios";
import { Menu, MenuItem, List, ListItem, ListItemText } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";
import { Fade } from "react-reveal";
import "../styles/VentasModulo.css";
import VentasTabla from "./SalesTable";
import VentasModuloForm from "./SalesModuleForm";
import NoPermits from "../NoPermits";
import emailjs from "emailjs-com";

const SalesModule = () => {
  const uri = "https://zap4allserver.herokuapp.com";
  const user = useSelector(selectUser);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [typeOfUser, setTypeOfUser] = useState({ type: "", status: "" });
  const [options, setOptions] = useState([]);
  const [rows, setRows] = useState([]);
  const [isEditing, setIsEditing] = useState({ state: false, id: "" });
  const [nameProduct, setNameProduct] = useState("");
  const [valueUnit, setValueUnit] = useState(null);
  const [idProduct, setIdProduct] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState("");
  const [newProduct, setNewProduct] = useState({
    quantity: "",
    idClient: "",
    nameClient: "",
    email: "",
    cvvcode: "",
    expirationdate: "",
  });
  const handleNewProduct = async () => {
    const { quantity, idClient, nameClient, email, cvvcode, expirationdate } = newProduct;
    await axios
      .post(uri + "/ventas", {
        nameProduct,
        valueUnit,
        quantity,
        idClient,
        nameClient,
        email,
        id: idProduct,
        cvvcode,
        expirationdate,
        total: parseInt(valueUnit) * parseInt(newProduct.quantity),
        date: JSON.stringify(new Date()).replace("T", ",").slice(1, 17),
        nameSeller: user.name,
      })
      .then(({ data }) => setRows(data))
      .catch((e) => console.error(e));
    setSelectedIndex(null);
    alert("Se ha realizado la venta con exito")
    setNameProduct("");
    try {
      await emailjs.send(
        "service_e149ima",
        "template_ioproup",
        {
          "from_name":nameClient,
          "producto":nameProduct,
          "cantidad":quantity,
          "precio":parseInt(valueUnit),
          "total":parseInt(valueUnit) * parseInt(newProduct.quantity),
          "idcompra": Math.round(Math.random()*1000000),
          "fecha":new Date().toLocaleString("en-GB"),
          "tarjeta":idClient,
          "email":email,
        },
        "A8WbuwBuAv7mC5sj1"
      );
      alert("Se ha realizado la venta con exito")
    } catch (e) {
      alert("El mensaje no pudo ser enviado");
    }
    setValueUnit(null);
    setNewProduct({
      quantity: "",
      idClient: "",
      nameClient: "",
      email:"",
      cvvcode: "",
      expirationdate: "",
    });
  };


  const handleUpdateProduct = async () => {
    await axios
      .put(uri + `/ventas/${isEditing.id}`, {
        nameProduct: nameProduct,
        valueUnit: valueUnit,
        total: parseInt(valueUnit) * parseInt(newProduct.quantity),
        quantity: newProduct.quantity,
        idClient: newProduct.idClient,
        cvvcode : newProduct.cvvcode,
        expirationdate : newProduct.expirationdate,
        nameClient: newProduct.nameClient,
        email: newProduct.email,
      })
      .then(({ data }) => setRows(data))
      .catch((e) => console.error(e));
    setSelectedIndex(null);
    setNameProduct("");
    setNewProduct({
      quantity: "",
      idClient: "",
      nameClient: "",
      email:"",
      cvvcode: "",
      expirationdate: "",
    });
    setIsEditing({ ...isEditing, state: false, id: "" });
  };
  const handleOnChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };
  const handleMenuItemClick = (index) => {
    setSelectedIndex(index);
    setNameProduct(options[index].description);
    setValueUnit(options[index].price);
    setIdProduct(options[index].idProduct);
    setAnchorEl(null);
  };

  const fetchData = async () => {
    await axios.get(uri + "/products").then(({ data }) => setOptions(data));
  };
  useEffect(() => {
    fetchData();
  }, []);

  
    return (
      <div className="ventasModulo">
        <Fade left>
          <div className="ventasModulo__left">
            <div>
              <List component="div">
                <h1 style={{ textAlign: "center", marginBottom: "40px" }}>
                  Sales
                </h1>
                <ListItem
                  style={{ borderBottom: "1px solid black" }}
                  button
                  id="lock-button"
                  aria-haspopup="listbox"
                  aria-controls="lock-menu"
                  aria-expanded={open ? "true" : undefined}
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                >
                  <ListItemText primary={nameProduct || "Select option"} />
                  <KeyboardArrowDownIcon />
                </ListItem>
              </List>
              <Menu
                id="lock-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
                MenuListProps={{
                  "aria-labelledby": "lock-button",
                  role: "listbox",
                }}
              >
                {options.map((option, index) => (
                  <MenuItem
                    key={option.description}
                    selected={index === selectedIndex}
                    onClick={() => handleMenuItemClick(index)}
                  >
                    {option.description}
                  </MenuItem>
                ))}
              </Menu>
            </div>
            <VentasModuloForm
              handleNewProduct={handleNewProduct}
              handleUpdateProduct={handleUpdateProduct}
              handleOnChange={handleOnChange}
              valueUnit={valueUnit}
              newProduct={newProduct}
              isEditing={isEditing}
            />
          </div>
        </Fade>
      </div>
    );
};

export default SalesModule;

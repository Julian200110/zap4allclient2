import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Form, FormControl } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import axios from "axios";
import NoPermits from "../NoPermits";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Producto.css";

const ProductsModule = () => {
  const user = useSelector(selectUser);
  const uri = "https://zap4allserver.herokuapp.com";
  const [rows, setRows] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [isEditing, setIsEditing] = useState({ state: false, id: "" });
  const [typeOfUser, setTypeOfUser] = useState({ type: "", status: "" });
  const [newProduct, setNewProduct] = useState({
    description: "",
    img: "",
    price: "",
    status: "",
  });
  const getUsers = async () => {
    await axios.get(uri + "/usuarios").then(({ data }) => {
      const userActual = data.find((userFind) => userFind.idGoogle === user.id);
      if (userActual) {
        if (userActual.role === "admin" && userActual.estado === "Active") {
          setTypeOfUser({ ...typeOfUser, type: "admin", status: "active" });
        }
        if (userActual.role === "admin" && userActual.estado === "Inactive") {
          setTypeOfUser({ ...typeOfUser, type: "admin", status: "inactive" });
        }
        if (userActual.role === "user" && userActual.estado === "Active") {
          setTypeOfUser({ ...typeOfUser, type: "user", status: "active" });
        }
        if (userActual.role === "user" && userActual.estado === "Inactive") {
          setTypeOfUser({ ...typeOfUser, type: "user", status: "inactive" });
        }
      }
    });
  };
  const fetchData = async () => {
    await axios.get(uri + "/products").then(({ data }) => setRows(data));
  };
  useEffect(() => {
    getUsers();
    fetchData();
  }, []);
  const handleNewProduct = async () => {
    await axios
      .post(uri + "/products", newProduct)
      .then(({ data }) => setRows(data))
      .catch((e) => console.error(e));
    setNewProduct({
      description: "",
      img: "",
      price: "",
      status: "",
    });
  };
  const handleUpdateProduct = async () => {
    await axios
      .put(uri + `/products/${isEditing.id}`, {
        description: newProduct.description,
        img: newProduct.img,
        price: newProduct.price,
        status: newProduct.status,
      })
      .then(({ data }) => setRows(data))
      .catch((e) => console.log(e));

    setIsEditing({ ...isEditing, state: false, id: "" });
    setNewProduct({
      description: "",
      img: "",
      price: "",
      status: "",
    });
  };
  const handleOnChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };
  const handleRow = async (idProduct) => {
    const option = window.confirm(
      "OK: Editar registro \nCANCEL: Borrar registro"
    );
    const row = rows.find((row) => row._id === idProduct);

    if (option) {
      setIsEditing({ ...isEditing, state: true, id: idProduct });
      setNewProduct({
        description: row.description,
        img: row.img,
        price: row.price,
        status: row.status,
      });
    } else {
      if (window.confirm("¿Seguro que desea eliminar este producto?")) {
        await axios
          .delete(uri + `/products/`, { data: { _id: idProduct } })
          .then(({ data }) => setRows(data));
      }
    }
  };
  if (typeOfUser.type === "admin" && typeOfUser.status === "active") {
    return (
      <div className="admin">
        <Container className="box-effect">
          <br></br>
          <br></br>
          <div className="row">
            <h3 className="title-style text-center">REGISTRO DE PRODUCTOS</h3>
          </div>
          <div>
            <Form className="row d-flex justify-content-center">
              <Form.Group
                className="col-8 mb-4 mt-4"
                controlId="description"
                onChange={(e) => handleOnChange(e)}
              >
                <Form.Control
                  value={newProduct.description}
                  name="description"
                  placeholder="Descripcion del producto"
                  onChange={(e) => handleOnChange(e)}
                />
              </Form.Group>
              <Form.Group
                className="col-8 mb-4 mt-4"
                controlId="img"
                onChange={(e) => handleOnChange(e)}
              >
                <Form.Control
                  value={newProduct.img}
                  name="img"
                  placeholder="Url de la imagen"
                  onChange={(e) => handleOnChange(e)}
                />
              </Form.Group>
              <Form.Group
                className="col-8 mb-4 mt-4"
                controlId="price"
                onChange={(e) => handleOnChange(e)}
              >
                <Form.Control
                  value={newProduct.price}
                  name="price"
                  placeholder="Precio"
                  onChange={(e) => handleOnChange(e)}
                />
              </Form.Group>
              <Form.Group
                className="col-8 mb-4 mt-4"
                controlId="status"
                onChange={(e) => handleOnChange(e)}
              >
                <Form.Select
                  aria-label="Default select example"
                  value={newProduct.status}
                  name="status"
                  placeholder="Product Status"
                  onChange={(e) => handleOnChange(e)}
                >
                  <option hidden>Estado del producto</option>
                  <option value="disponible">Disponible</option>
                  <option value="No disponible">No disponible</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </div>
          <div className="row text-center pb-4">
            <div className="col-12">
              {!isEditing.state ? (
                <Button
                  className=" mb-4 mt-4 text-center"
                  variant="primary"
                  type="submit"
                  onClick={() => handleNewProduct()}
                >
                  Guardar producto
                </Button>
              ) : (
                <Button
                  className=" mb-4 mt-4 text-center"
                  variant="secondary"
                  color="success"
                  onClick={() => handleUpdateProduct()}
                >
                  Actualizar producto
                </Button>
              )}
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <Form.Group className="col-2 mb-4 mt-1">
              <FormControl
                type="search"
                placeholder="Buscar"
                aria-label="Search"
                onChange={(e) => setSearchData(e.target.value)}
              />
            </Form.Group>
            <div className="col-8">
              <Table
                striped
                bordered
                hover
                variant="light"
                className="col-8 overflow-auto"
              >
                <thead>
                  <tr>
                    <th>Id del producto</th>
                    <th>Descripcion</th>
                    <th>Precio</th>
                    <th>Estado del producto</th>
                  </tr>
                </thead>
                <tbody>
                  {rows
                    .filter((row) =>
                      JSON.stringify(row)
                        .trim()
                        .toLowerCase()
                        .includes(searchData.trim().toLowerCase())
                    )
                    .map((row) => (
                      <tr key={row._id} onClick={() => handleRow(row._id)}>
                        <td>{row._id}</td>
                        <td>{row.description}</td>
                        <td>{row.price}</td>
                        <td>{row.status}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return <NoPermits />;
};

export default ProductsModule;

import axios from "axios";
import { AutoComplete } from "primereact/autocomplete";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import React, { useState } from "react";
import ProductService from "../../services/productService";
import { CONFIG } from "../../ultils/constants";
import moment from "moment";

function CreateInventory({ getInventory, getAccounts }) {
  const [visibleSignUpinventory, setVisibleSignUpInventory] = useState(false);
  const [inventoryName, setInventoryName] = useState("");
  const [unit, setUnit] = useState("");
  const [quantity, setQuantity] = useState();
  const [priceBuy, setPriceBuy] = useState();
  const [priceTotal, setPriceTotal] = useState();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const date = moment().format("YYYYMMDD");

  const onClickSignUpInventory = (todo) => {
    const headers = { "Content-Type": "application/json;charset=utf-8" };
    console.log("productCode ", selectedProduct.productCode);
    console.log("inventoryName ", inventoryName);
    console.log("unit ", unit);
    console.log("quantity ", quantity);
    console.log("priceBuy ", priceBuy);
    console.log("priceTotal ", priceTotal);
    console.log("date ", date);
    let object = JSON.stringify({
      productId: selectedProduct.id,
      productCode: selectedProduct.productCode,
      productName: inventoryName,
      unit: unit,
      quantity: quantity,
      priceBuy: priceBuy,
      priceTotal: priceTotal,
      date: date,
    });
    axios
      .post(`${CONFIG.SERVER}/inventory/insert`, object, { headers })
      .then((response) => {
        getInventory();
        setSelectedProduct("");
        setInventoryName("");
        setUnit("");
      })
      .catch((error) => console.log(error));
    setVisibleSignUpInventory(false);
    // set
  };

  const searchProduct = async (event) => {
    console.log(selectedProduct);
    const products = await ProductService.searchProductByName(event.query);
    setProducts(products);
  };

  const onSelecteProduct = (e) => {
    const product = e.value;
    setSelectedProduct(product);
    setInventoryName(product.productName);
    setUnit(product.unit);
  };

  const onChangePrice = (e) => {
    setPriceBuy(e.value);
    onChangePriceTotal();
  };

  const onChangeQuantity = (e) => {
    setQuantity(e.value);
    onChangePriceTotal();
  };

  const onChangePriceTotal = (e) => {
    setPriceTotal(quantity * priceBuy);
  };

  const onHide = () => {
    setVisibleSignUpInventory(false);
    setSelectedProduct("");
    setInventoryName("");
    setUnit("");
    //TODO
  };

  const onShow = () => {
    setVisibleSignUpInventory(true);
    //TODO
  };

  return (
    <div className="App">
      <header>
        <Button label="Inventory In" text onClick={() => onShow()} />
        <div className=" flex justify-content-center">
          <Dialog
            header="Inventory In"
            style={{ width: "50vw", textAlign: "center" }}
            visible={visibleSignUpinventory}
            onHide={() => onHide(false)}
          >
            <div className="">
              <div className="">
                <div className="flex flex-column gap-2">
                  <div className="in-block-inventory">
                    <label className="labelInputinventory">
                      InventoryCode:{" "}
                    </label>{" "}
                    <br />
                    <AutoComplete
                      field="productCode"
                      value={selectedProduct}
                      suggestions={products}
                      completeMethod={searchProduct}
                      onChange={(e) => onSelecteProduct(e)}
                    />
                  </div>
                  <div className="in-block-inventory">
                    <label className="labelInputinventory">
                      InventoryName:{" "}
                    </label>{" "}
                    <br />
                    <InputText
                      id="inventoryName"
                      type="inventoryName"
                      required
                      value={inventoryName}
                      minLength={7}
                      aria-describedby="inventoryName-help"
                      onChange={(e) => setInventoryName(e.target.value)}
                    />
                  </div>

                  <div className="in-block-inventory">
                    <label className="labelInputinventory">Unit: </label> <br />
                    <InputText
                      id="unit"
                      value={unit}
                      aria-describedby="unit-help"
                      onChange={(e) => setUnit(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-column gap-2">
                  <div className="in-block-inventory">
                    <label className="labelInputinventory">Quantity: </label>{" "}
                    <br />
                    <InputNumber
                      required
                      value={quantity}
                      aria-describedby="inventoryCode-help"
                      onValueChange={(e) => onChangeQuantity(e)}
                    />
                  </div>
                  <div className="in-block-inventory">
                    <label className="labelInputinventory">PriceBuy: </label>{" "}
                    <br />
                    <InputNumber
                      type="inventoryName"
                      value={priceBuy}
                      required
                      aria-describedby="inventoryName-help"
                      onValueChange={(e) => onChangePrice(e)}
                    />
                  </div>

                  <div className="in-block-inventory">
                    <label className="labelInputinventory">PriceTotal: </label>{" "}
                    <br />
                    <InputNumber
                      id="priceTotal"
                      // value={priceBuy * quantity}
                      value={priceTotal}
                      aria-describedby="priceTotal-help"
                      onValueChange={(e) => onChangePriceTotal(e)}
                    />
                  </div>
                </div>

                {/* <div className="flex flex-column gap-2">
                  <div className="in-block-inventory">
                    <label className="labelInputinventory">Quantity: </label>{" "}
                    <br />
                    <InputText
                      required
                      value={date}
                      aria-describedby="inventoryCode-help"
                      onChange={(e) => setPriceTotal(e.target.value)}
                    />
                  </div>
                </div> */}
              </div>

              <div className="center">
                <Button
                  label="Yes"
                  icon="pi pi-check"
                  type="submit"
                  onClick={onClickSignUpInventory}
                />
                <Button
                  label="No"
                  icon="pi pi-times"
                  onClick={() => {
                    onHide();
                  }}
                  className="p-button-text"
                />
              </div>
            </div>
          </Dialog>
        </div>
      </header>
    </div>
  );
}

export default CreateInventory;

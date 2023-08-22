import axios from "axios";
import { CONFIG } from "../ultils/constants";

const ProductService = {
  async searchProductByName(name) {
    let data;
    await axios
      .get(`${CONFIG.SERVER}/product/search-by-name`, {
        params: { name: name },
      })
      .then((res) => (data = res.data))
      .catch((err) => console.log(err));
    return data;
  },
};

export default ProductService;

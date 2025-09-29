import { useDispatch } from "react-redux";
import { addItemToCart } from "../../slice/cartSlice";

const AddItemToCartButton = ({ itemId, itemType, size, qauntity }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItemToCart({ itemId, itemType, size, qauntity }));
  };

  return <button onClick={handleAddToCart}>Add to Cart</button>;
};

export default AddItemToCartButton;

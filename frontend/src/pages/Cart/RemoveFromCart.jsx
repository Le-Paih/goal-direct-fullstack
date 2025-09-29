import { useDispatch } from "react-redux";
import { removeItemFromCart } from "../../slice/cartSlice";

const RemoveFromCartButton = ({ itemId, itemType, size, quantity }) => {
  const dispatch = useDispatch();

  const handleRemoveFromCart = () => {
    dispatch(removeItemFromCart({ itemId, itemType, size, quantity }));
  };

  return <button onClick={handleRemoveFromCart}>Remove</button>;
};

export default RemoveFromCartButton;

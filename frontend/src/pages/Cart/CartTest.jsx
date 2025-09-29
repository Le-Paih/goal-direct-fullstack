import { useDispatch, useSelector } from "react-redux";
import { FiTrash } from "react-icons/fi";
import toast from "react-hot-toast";
import { fetchCart, updateCartItem } from "../../slice/cartSlice";
import { useContext, useEffect } from "react";
import {
  CartCard,
  CartLayout,
  CartLeft,
  CartRight,
  CRI,
  Img,
  KlarnaDiv,
  KlIcon,
  KlText,
  KlTextDiv,
  MainDiv,
  ProdLeft,
  ProdRight,
  ProductCard,
  Products,
  RmvBtn,
} from "./CartPageStyles";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import CheckoutButton from "./CheckoutButton";

function CartTest() {
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);

  const { items = [], bill } = useSelector((state) => state.cart);

  console.log("Cart state from Redux:", items);

  useEffect(() => {
    if (user) {
      dispatch(fetchCart());
    }
  }, [user, dispatch]);

  const handleRemoveItem = async (itemId, itemType, size) => {
    const item = items.find(
      (i) => i.itemId === itemId && i.size === size && i.itemType === itemType
    );

    if (!item) {
      console.error("❌ Error: Item not found in Redux state");
      return;
    }

    const quantity = item.quantity;

    if (!quantity) {
      console.error("❌ Error: Quantity is missing in remove item request");
      return;
    }

    try {
      await axios.delete("http://127.0.0.1:3000/api/v1/cart/remove", {
        data: { itemId, itemType, size, quantity },
        withCredentials: true,
      });

      dispatch(fetchCart());
      toast.success("Item removed from cart");
    } catch (error) {
      console.error("❌ Error removing item:", error.response?.data || error);
    }
  };

  const handleIncrease = (itemId, itemType, size, quantity) => {
    console.log("⬆️ Increasing:", { itemId, itemType, size, quantity });

    dispatch(
      updateCartItem({
        itemId,
        itemType,
        size,
        quantity: quantity + 1,
      })
    )
      .unwrap()
      .then(() => dispatch(fetchCart()))
      .catch((err) => {
        console.error("❌ Failed to increase quantity:", err);
        toast.error("Could not update quantity");
      });
  };

  const handleDecrease = (itemId, itemType, size, quantity) => {
    if (quantity <= 1) return;

    dispatch(
      updateCartItem({
        itemId,
        itemType,
        size,
        quantity: quantity - 1,
      })
    )
      .unwrap()
      .then(() => dispatch(fetchCart()))
      .catch((err) => {
        console.error("❌ Failed to decrease quantity:", err);
        toast.error("Could not update quantity");
      });
  };

  // const stripePromise = loadStripe(
  //   "pk_test_51OrHSACBOwIoKS9Zl5Q1cVPf1XAylCNPPut6rgKyxYwMmcs8YdbTFis9fkili5GvOcogcrYvR6bVeGFcvoBrk3Io00Trwnc9Dc"
  // );

  // const handleCheckout = async (cartItems) => {
  //   const stripe = await stripePromise;
  //   const response = await axios.post("http://127.0.0.1:5000/cart", {
  //     items: cartItems,
  //   });

  //   const { url } = response.data;
  //   window.location.href = url;
  // };

  return (
    <MainDiv>
      {user ? (
        <CartLayout>
          <CartLeft>
            <h1 className="text-3xl">Your Bag</h1>
            <Products>
              {items.length > 0 ? (
                items.map((item) => (
                  <ProductCard key={item._id}>
                    <ProdLeft>
                      <Img
                        src={`http://127.0.0.1:3000${item.image}`}
                        alt={item.name}
                        $type={item.itemType}
                      />
                    </ProdLeft>
                    <ProdRight>
                      <div>
                        <h4
                          style={{
                            marginTop: "1rem",
                          }}
                        >
                          {item.name}
                        </h4>
                        <p>Size: {item.size}</p>
                        <RmvBtn
                          onClick={() =>
                            handleRemoveItem(
                              item.itemId,
                              item.itemType,
                              item.size
                            )
                          }
                        >
                          <FiTrash />
                          Remove Item
                        </RmvBtn>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          margin: "0 auto",
                        }}
                      >
                        <p
                          style={{
                            marginTop: "1rem",
                            fontWeight: "bold",
                          }}
                        >
                          Quantity
                        </p>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "auto",
                            marginTop: "0",
                            gap: "12px",
                          }}
                        >
                          <button
                            onClick={() =>
                              handleDecrease(
                                item.itemId,
                                item.itemType,
                                item.size,
                                item.quantity
                              )
                            }
                            disabled={item.quantity === 1}
                            style={{
                              backgroundColor: "black",
                              color: "white",
                              border: "none",
                              borderRadius: "0.5rem",
                              padding: "3px 7px",
                              cursor:
                                item.quantity === 1 ? "default" : "pointer",
                              fontWeight: "bold",
                              opacity: item.quantity === 1 ? 0.5 : 1,
                            }}
                          >
                            -
                          </button>
                          <p>{item.quantity}</p>
                          <button
                            onClick={() =>
                              handleIncrease(
                                item.itemId,
                                item.itemType,
                                item.size,
                                item.quantity
                              )
                            }
                            style={{
                              backgroundColor: "black",
                              color: "white",
                              border: "none",
                              borderRadius: "0.5rem",
                              padding: "3px 7px",
                              cursor: "pointer",
                              fontWeight: "bold",
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          margin: "0 auto",
                        }}
                      >
                        <p
                          style={{
                            marginTop: "1rem",
                            fontWeight: "bold",
                          }}
                        >
                          Total
                        </p>
                        <p>£ {item.price * item.quantity}</p>
                      </div>
                    </ProdRight>
                  </ProductCard>
                ))
              ) : (
                <p>Your Cart is Empty.</p>
              )}
            </Products>
          </CartLeft>

          {items.length > 0 && (
            <CartRight>
              <CRI>
                <h3 className="text-xl font-bold mb-4">Subtotal: £{bill}</h3>
                <CheckoutButton />
              </CRI>
              <KlarnaDiv>
                <KlIcon src="/svg/klarna-svgrepo-com.svg" />
                <KlTextDiv>
                  <KlText>
                    Make 3 payments of £{(bill / 3).toFixed(2)}
                    <br></br>
                    18+, T&C apply, Credit subject to status
                  </KlText>
                  <KlText></KlText>
                </KlTextDiv>
              </KlarnaDiv>
            </CartRight>
          )}
        </CartLayout>
      ) : (
        <CartCard>
          <h1>You&apos;re not logged in, log in to add to cart</h1>
        </CartCard>
      )}
    </MainDiv>
  );
}

export default CartTest;

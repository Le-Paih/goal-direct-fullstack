const AppError = require('../utils/appError');
const Boot = require('../models/bootModel');
const Kit = require('../models/kitModel');
const Cart = require('../models/cartModel');
const catchAsync = require('../utils/catchAsync');

exports.viewCart = catchAsync(async (req, res, next) => {
  // Find the user's cart by the user ID
  let cart = await Cart.findOne({ owner: req.user._id }).populate({
    path: 'items.itemId',
    options: { strictPopulate: false },
    select: 'name price brand colorway image _id',
  });

  // If no cart is found, return an error
  if (!cart) {
    cart = await Cart.create({ owner: req.user._id, items: [], bill: 0 });
  }

  // const cartItems = cart.items.map((item) => {
  //   const itemData = item.itemId.toObject();
  //   return {
  //     itemId: item._id,
  //     itemType: item.itemType,
  //     name: itemData.name,
  //     brand: itemData.brand,
  //     colorway: itemData.colorway,
  //     // description: itemData.description,
  //     image: itemData.image,
  //     size: item.size,
  //     quantity: item.quantity,
  //     price: item.price,
  //   };
  // });

  const cartItems = {
    _id: cart._id,
    owner: cart.owner,
    items: cart.items.map((item) => ({
      itemType: item.itemType,
      itemId: item.itemId?._id.toString(),
      name: item.itemId?.name || item.name,
      price: item.itemId?.price || item.price,
      image: item.itemId?.image?.image1 || '',
      size: item.size,
      quantity: item.quantity,
    })),
    bill: cart.bill,
  };

  // Send the cart data as a response
  res.status(200).json({
    status: 'success',
    data: {
      cart: cartItems,
      bill: cart.bill,
    },
  });
});

exports.addItemToCart = catchAsync(async (req, res, next) => {
  const { itemId, itemType, size, quantity = 1 } = req.body;

  // Determine the correct model based on the itemType
  let itemModel;
  if (itemType === 'Boot') {
    itemModel = Boot;
  } else if (itemType === 'Kit') {
    itemModel = Kit;
  } else {
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid item type',
    });
  }

  // Find the item by ID
  const item = await itemModel.findById(itemId);
  if (!item) {
    return res.status(404).json({
      status: 'fail',
      message: `${itemType} not found`,
    });
  }

  // Find the specific size in the item
  const itemSize = item.sizes.find((s) => s.size === size);
  if (!itemSize || itemSize.quantity < quantity) {
    return res.status(400).json({
      status: 'fail',
      message: `Size ${size} is not available or not enough quantity`,
    });
  }

  // Find the user's cart
  let cart = await Cart.findOne({ owner: req.user._id });
  if (!cart) {
    cart = new Cart({
      owner: req.user._id,
      items: [],
    });
  }

  // Check if the item with the specific size already exists in the cart
  const existingItemIndex = cart.items.findIndex(
    (item) =>
      item.itemId.toString() === itemId &&
      item.size === size &&
      item.itemType === itemType,
  );

  if (existingItemIndex > -1) {
    const existingItem = cart.items[existingItemIndex];
    existingItem.quantity += quantity;
    existingItem.price = item.price * existingItem.quantity;

    // Ensure itemType and image are present even if it was a legacy item
    existingItem.itemType = itemType;
    existingItem.image = item.images?.image1 || '';
  } else {
    // If item with that size doesn't exist, add it to the cart
    cart.items.push({
      itemType,
      itemId: item._id,
      name: item.name,
      size,
      quantity,
      price: item.price * quantity,
      image: item.images?.image1 || '',
    });
  }

  // Update the quantity in the item model
  itemSize.quantity -= quantity;
  await item.save();

  // Recalculate the bill
  cart.bill = cart.items.reduce((total, item) => total + item.price, 0);

  // Save the cart
  await cart.save();

  res.status(200).json({
    status: 'success',
    data: {
      cart,
    },
  });
});

exports.updateCartItem = catchAsync(async (req, res) => {
  const { itemId, itemType, size, quantity } = req.body;

  if (!itemId || !itemType || !size || quantity === undefined) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing required fields (itemId, itemType, size, quantity)',
    });
  }

  let cart = await Cart.findOne({ owner: req.user._id });
  if (!cart) {
    return res.status(404).json({ status: 'fail', message: 'Cart not found' });
  }

  const itemIndex = cart.items.findIndex(
    (item) =>
      item.itemId.toString() === itemId &&
      item.size.toString().toLowerCase() === size.toString().toLowerCase() &&
      item.itemType.toLowerCase() === itemType.toLowerCase(),
  );

  if (itemIndex === -1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Item not found in cart',
    });
  }

  // Get the correct model based on itemType
  let itemModel;
  if (itemType === 'Boot') {
    itemModel = Boot;
  } else if (itemType === 'Kit') {
    itemModel = Kit;
  } else {
    return res
      .status(400)
      .json({ status: 'fail', message: 'Invalid item type' });
  }

  const product = await itemModel.findById(itemId);
  if (!product) {
    return res
      .status(404)
      .json({ status: 'fail', message: `${itemType} not found` });
  }

  const productSize = product.sizes.find((s) => s.size === size);
  if (!productSize) {
    return res
      .status(400)
      .json({ status: 'fail', message: `Size ${size} not found` });
  }

  const oldQuantity = cart.items[itemIndex].quantity;

  // If decreasing quantity, add back to stock
  if (quantity < oldQuantity) {
    productSize.quantity += oldQuantity - quantity;
  } else if (quantity > oldQuantity) {
    // If increasing quantity, check stock availability
    if (productSize.quantity < quantity - oldQuantity) {
      return res
        .status(400)
        .json({ status: 'fail', message: 'Not enough stock' });
    }
    productSize.quantity -= quantity - oldQuantity;
  }

  // Update cart item quantity and price
  cart.items[itemIndex].quantity = quantity;
  cart.items[itemIndex].price = product.price * quantity;

  // Recalculate the total bill
  cart.bill = cart.items.reduce((total, item) => total + item.price, 0);

  await product.save();
  await cart.save();

  res.status(200).json({
    status: 'success',
    data: { cart },
  });
});

exports.removeItemFromCart = catchAsync(async (req, res, next) => {
  if (!req.user) {
    return next(
      new AppError(
        'You are not logged in! Please log in to access this route.',
        401,
      ),
    );
  }

  const { itemId, itemType, size, quantity } = req.body;

  // Determine the correct model based on the itemType
  let itemModel;
  if (itemType === 'Boot') {
    itemModel = Boot;
  } else if (itemType === 'Kit') {
    itemModel = Kit;
  } else {
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid item type',
    });
  }

  // Find item by ID
  const item = await itemModel.findById(itemId);
  if (!item) {
    return res.status(404).json({
      status: 'fail',
      message: `${itemType} not found`,
    });
  }

  // Find the user's cart
  let cart = await Cart.findOne({ owner: req.user._id });
  if (!cart) {
    return res.status(404).json({
      status: 'fail',
      message: 'Cart not found',
    });
  }

  // Find the item in the cart
  const itemIndex = cart.items.findIndex(
    (item) =>
      item.itemId.toString() === itemId &&
      item.size === size &&
      item.itemType == itemType,
  );

  if (itemIndex === -1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Item not found in cart',
    });
  }

  // Update the quantity in cart
  if (cart.items[itemIndex].quantity <= quantity) {
    // Remove the item from the cart of quantity to remove is equal to or greater than existing quantity
    cart.items.splice(itemIndex, 1);
  } else {
    // Decrease the quantity if more than what is to be removed
    cart.items[itemIndex].quantity -= quantity;
    cart.items[itemIndex].price = item.price * cart.items[itemIndex].quantity;
  }

  // Update the quantity in the item model
  const itemSize = item.sizes.find((s) => s.size === size);
  if (itemSize) {
    itemSize.quantity += quantity;
    await item.save();
  }

  // Recalculate the bill
  cart.bill = cart.items.reduce((total, item) => total + item.price, 0);

  // Save the cart
  await cart.save();

  res.status(200).json({
    status: 'success',
    data: {
      cart,
    },
  });
});

exports.clearCart = catchAsync(async (req, res, next) => {
  // Find the user's cart
  let cart = await Cart.findOneAndDelete({ owner: req.user._id });

  if (!cart) {
    return next(new AppError('No cart found for this user', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

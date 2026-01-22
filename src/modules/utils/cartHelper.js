// const getFinalPrice = (product, variant) => {
//   let price = variant.price;
//   const now = new Date();

//   // 1️⃣ PRODUCT FESTIVAL DISCOUNT
//   if (
//     product.discount?.isActive &&
//     product.discount.mode === "festival" &&
//     product.discount.startDate &&
//     product.discount.endDate
//   ) {
//     const start = new Date(product.discount.startDate);
//     const end = new Date(product.discount.endDate);

//     if (now >= start && now <= end) {
//       return Math.round(price - (price * product.discount.value) / 100);
//     }
//   }

//   // 2️⃣ VARIANT DISCOUNT (PERCENTAGE)
//   if (variant.discount?.isActive) {
//     if (variant.discount.type === "percentage") {
//       return Math.round(
//         price - (price * variant.discount.value) / 100
//       );
//     }

//     if (variant.discount.type === "flat") {
//       return Math.max(0, price - variant.discount.value);
//     }
//   }

//   return price;
// };

// module.exports = getFinalPrice;


const applyDiscount = require("./applyDiscount");

module.exports = function getFinalPrice(product, variant) {
  let price = variant.price;

  // product discount first
  price = applyDiscount(price, product.discount);

  // variant discount overrides
  price = applyDiscount(price, variant.discount);

  return price;
};

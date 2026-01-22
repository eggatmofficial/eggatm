// module.exports = function applyDiscount(price, discount) {
//   if (!discount || !discount.isActive) return price;

//   const now = new Date();

//   // Festival discount date check
//   if (discount.mode === "festival") {
//     if (!discount.startDate || !discount.endDate) return price;

//     const start = new Date(discount.startDate);
//     const end = new Date(discount.endDate);

//     if (now < start || now > end) return price;
//   }

//   // Percentage discount
//   if (discount.type === "percentage") {
//     return Math.max(
//       0,
//       Math.round(price - (price * discount.value) / 100)
//     );
//   }

//   // Flat discount
//   if (discount.type === "flat") {
//     return Math.max(0, price - discount.value);
//   }

//   return price;
// };

module.exports = function applyDiscount(price, discount) {
  if (!discount || !discount.isActive) return price;

  const now = new Date();

  // Festival discount (DATE SAFE – TIMEZONE SAFE)
  if (discount.mode === "festival") {
    if (!discount.startDate || !discount.endDate) return price;

    const start = new Date(discount.startDate);
    const end = new Date(discount.endDate); // 🔥 NEXT DAY (exclusive)

    // VALID only if: start <= now < end
    if (now < start || now >= end) return price;
  }

  // Percentage discount
  if (discount.type === "percentage") {
    return Math.max(
      0,
      Math.round(price - (price * discount.value) / 100)
    );
  }

  // Flat discount
  if (discount.type === "flat") {
    return Math.max(0, price - discount.value);
  }

  return price;
};

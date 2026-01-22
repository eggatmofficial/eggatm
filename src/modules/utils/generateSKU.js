const generateSKU = () => {
  return `SKU-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
};


module.exports = generateSKU;
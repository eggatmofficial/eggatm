// const helmet = require("helmet");

// module.exports = helmet({
//   crossOriginEmbedderPolicy: false,
// });


const helmet = require("helmet");

module.exports = helmet({
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" }
});

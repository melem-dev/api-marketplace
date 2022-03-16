const router = require("express").Router();
const { _Auth, _Order, _Product } = require("../controllers");
const { LAuth } = require("../middlewares");

router.get("/login", _Auth.Login);
router.post("/register", _Auth.Register);

router.get("/product", LAuth, _Product.readAll);
router.get("/product/:id", LAuth, _Product.readDetails);
router.post("/product", LAuth, _Product.Create);
router.put("/product/:id", LAuth, _Product.Update);
router.delete("/product/:id", LAuth, _Product.Delete);

router.post("/order", LAuth, _Order.Purchase);
router.get("/order/:id", LAuth, _Order.CheckStatus);
router.get("/order", LAuth, _Order.allOrders);

module.exports = router;

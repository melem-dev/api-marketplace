const router = require("express").Router();
const { _Auth, _Order, _Product } = require("../controllers");
const { LAuth, LRoles } = require("../middlewares");

/* Public */
router.get("/login", _Auth.Login);
router.post("/register", _Auth.Register, _Auth.Login);

router.get("/product", LAuth, _Product.readAll);
router.get("/product/:id", LAuth, _Product.readDetails);

router.delete("/order", LAuth, _Order.deleteAllOrders);

/* Employee */
router.get("/order", LAuth, LRoles("employee"), _Order.allOrders);
router.post("/product", LAuth, LRoles("employee"), _Product.Create);
router.put("/product/:id", LAuth, LRoles("employee"), _Product.Update);
router.delete("/product/:id", LAuth, LRoles("employee"), _Product.Delete);

router.get("/order/:id", LAuth, LRoles("employee"), _Order.CheckStatus);

router.get("/users", LAuth, LRoles("employee"), _Auth.GetUser);
router.get("/clients", LAuth, LRoles("employee"), _Auth.GetClients);
router.get("/employees", LAuth, LRoles("employee"), _Auth.GetEmployees);

/* Client */
router.post("/order", LAuth, LRoles("client"), _Order.Purchase);

module.exports = router;

import RegisterForm from "./components/RegisterForm.js";

var root = null;
var useHash = true; // Defaults to: false
var hash = "#!"; // Defaults to: '#'
var router = new Navigo(root, useHash, hash);

router
  .on("/sign-up", function () {
    document.getElementById("app").innerHTML =
      "<register-form></register-form>";
    console.log("Bạn đang ở chức năng đăng kí");
  })
  .resolve();

router
  .on("/sign-in", function () {
    document.getElementById("app").innerHTML = "<login-form></login-form>";
    console.log("Bạn đang ở chức năng đăng nhập");
  })
  .resolve();

router
  .on("/chat", function () {
    document.getElementById("app").innerHTML =
      "<h1>Bạn đã vào màn hình chat</h1>";
  })
  .resolve();

window.router = router;

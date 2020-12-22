import InputWrapper from "./InputWrapper.js";
import { getDataFromDoc, saveCurrentUser, validateEmail } from "../utils.js";

const $template = document.createElement("template");
$template.innerHTML = /*html*/ `
  <link rel="stylesheet" href="./CSS/login-form.css"> 
  <form id="login-form">
    <h2>Log in</h2>
    <input-wrapper id="email" label="Email" type="email" error="" value=""></input-wrapper>
    <input-wrapper id="password" label="Password" type="password" error="" value=""></input-wrapper>
    <button id="login-btn">Log in</button>
    <div id="to-register">Bạn chưa có tài khoả? <b><a href="#!/sign-up">Sign up</a></b>
    </div>
  </form>
`;

export default class LoginForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild($template.content.cloneNode(true));
    this.$form = this.shadowRoot.getElementById("login-form");
    this.$email = this.shadowRoot.getElementById("email");
    this.$password = this.shadowRoot.getElementById("password");
  }

  connectedCallback() {
    this.$form.onsubmit = async (event) => {
      event.preventDefault();
      console.log("đăng kí");
      let email = this.$email.value();
      let password = this.$password.value();

      let isPassed =
        InputWrapper.validate(
          this.$email,
          (value) => value != "",
          "Email is required"
        ) &
        InputWrapper.validate(
          this.$password,
          (value) => value != "",
          "Password is required"
        );
      // console.log(isPassed); Kiểm tra thỏa mãn tất cả điều kiện
      if (isPassed) {
        let result = await firebase
          .firestore()
          .collection("users")
          .where("email", "==", email)
          .where("password", "==", CryptoJS.MD5(password).toString())
          .get();

        if (result.empty) {
          alert("Email or password is wrong!");
        } else {
          console.log(result);
          saveCurrentUser(getDataFromDoc(result.docs[0]));
          router.navigate("/chat");
        }
      }
    };
  }
}

window.customElements.define("login-form", LoginForm);

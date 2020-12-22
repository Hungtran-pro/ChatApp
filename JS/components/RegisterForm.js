import InputWrapper from "./InputWrapper.js";
import { validateEmail } from "../utils.js";

const $template = document.createElement("template");
$template.innerHTML = /*html*/ `
    <link rel="stylesheet" href="./CSS/register-form.css"> 
    <form id="register-form">
      <h2>Register here</h2>
      <input-wrapper id="email" label="Email" type="email" error="" value=""></input-wrapper>
      <input-wrapper id="name" label="Name" type="text" error="" value=""></input-wrapper>
      <input-wrapper id="password" label="Password" type="password" error="" value=""></input-wrapper>
      <input-wrapper id="password-confirmation" label="Confirm password" type="password" error="" value=""></input-wrapper>
      <button id="register-btn">Đăng kí</button>

      <div id="to-login">Bạn đã có tài khoản? <b><a href="#!/sign-in">Sign in</a></b>
      </div>

    </form>
`;

export default class RegisterForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild($template.content.cloneNode(true));

    this.$form = this.shadowRoot.getElementById("register-form");
    this.$email = this.shadowRoot.getElementById("email");
    this.$name = this.shadowRoot.getElementById("name");
    this.$password = this.shadowRoot.getElementById("password");
    this.$passwordConfirmation = this.shadowRoot.getElementById(
      "password-confirmation"
    );
  }

  connectedCallback() {
    this.$form.onsubmit = async (event) => {
      event.preventDefault();
      console.log("đăng kí");
      let email = this.$email.value();
      let name = this.$name.value();
      let password = this.$password.value();
      let passwordConfirmation = this.$passwordConfirmation.value();

      // if(email == ''){
      //   this.$email.error('Email is required')
      // }
      // else{
      //   this.$email.error('');
      // }
      let isPassed =
        (InputWrapper.validate(
          this.$email,
          (value) => {
            return value != "";
          },
          "Email is required"
        ) &&
          InputWrapper.validate(
            this.$email,
            (value) => validateEmail(value),
            "Email is wrong!"
          )) &
        InputWrapper.validate(
          this.$name,
          (value) => value != "",
          "Name is required"
        ) &
        InputWrapper.validate(
          this.$password,
          (value) => value != "",
          "Password is required"
        ) &
        (InputWrapper.validate(
          this.$passwordConfirmation,
          (value) => value != "",
          "Re-Password is required"
        ) &&
          InputWrapper.validate(
            this.$passwordConfirmation,
            (value) => value == password,
            "Re-Password is not correct!"
          ));
      // console.log(isPassed); Kiểm tra thỏa mãn tất cả điều kiện
      if (isPassed) {
        let result = await firebase
          .firestore()
          .collection("users")
          .where("email", "==", email)
          .get();
        console.log(result);

        if (result.empty) {
          firebase
            .firestore()
            .collection("users")
            .add({
              name: name,
              email: email,
              password: CryptoJS.MD5(password).toString(),
            });
        } else {
          alert("Email has been used!");
        }
      }
    };
  }
}

window.customElements.define("register-form", RegisterForm);

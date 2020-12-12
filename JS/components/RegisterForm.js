const $template = document.createElement("template");
$template.innerHTML = /*html*/`   
    <link rel="stylesheet" href="./CSS/register-form.css"> 
    <form id="register-form" action="">
        <h2>Register here</h2>
        <input-wrapper id="email" label="Email" type="email" error="" value=""></input-wrapper>
        <input-wrapper id="name" label="Name" type="text" error="" value=""></input-wrapper>
        <input-wrapper id="password" label="Password" type="email" error="" value=""></input-wrapper>
        <input-wrapper id="password-confirmation" label="Re-password" type="email" error="" value=""></input-wrapper>
        <button id="register-btn">Đăng kí</button>

        <div id="to-login">Bạn đã có tài khoản<b><a href="#">Sign in</a></b></div>

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
    this.$passwordConfirmation = this.shadowRoot.getElementById("password-confirmation");
  }

  connectedCallback(){
      this.$form.onsubmit = (event) => {
          event.preventDefault();
          console.log('đăng kí');
          console.log(this.$email.value());
      }
  }
}

window.customElements.define("register-form", RegisterForm);

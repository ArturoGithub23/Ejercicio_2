import { LitElement, css, html } from "lit";

export class LoginComponent extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        margin: 50px auto;
        width: 300px;
        padding: 20px;
        border: 1px solid blue;
        border-radius: 5px;
      }

      input,
      label {
        display: block;
        width: 97%;
        margin-bottom: 10px;
      }

      button {
        width: 100%;
        padding: 5px;
        background-color: cornflowerblue;
        border: 1px solid cornflowerblue;
        border-radius: 5px;
        color: white;
        font-size: larger;
        font-weight: 400;
      }
    `;
  }

  static get properties() {
    return {
      usuarios: { type: Array },
    };
  }

  constructor() {
    super();
    this.usuarios = [
      {
        email: "correo@correo.com",
        pass: "12345",
      },
      {
        email: "correo1@correo.com",
        pass: "123456789",
      },
    ];
  }

  render() {
    return html`
      <label>Email</label>
      <input type="email" id="email" />
      <label>Password</label>
      <input type="password" id="password" />

      <button @click="${this._procesarDatos}">Login</button>
    `;
  }

  _procesarDatos() {
    const emailValue = this.shadowRoot.querySelector("#email").value;
    const passValue = this.shadowRoot.querySelector("#password").value;

    if (!emailValue || !passValue) {
      alert("Campos vacíos");
    }
    var login = false;
    this.usuarios.forEach((usuario) => {
      if (usuario.email === emailValue && usuario.pass === passValue) {
        login = true;
      }
    });

    this.dispatchEvent(
      new CustomEvent("login", {
        detail: { login },
        bubbles: true,
        composed: true,
      })
    );
  }
}

customElements.define("login-component", LoginComponent);

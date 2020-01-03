import { LitElement, html, css } from "lit-element";
import "mv-container";

export default class ErrorPage extends LitElement {
  static get properties() {
    return {
      value: { type: String, attribute: true }
    };
  }

  static get styles() {
    return css`
      :host {
        font-family: var(--font-family, Arial);
        font-size: var(--font-size-m, 10pt);
      }
    `;
  }

  render() {
    return html`
      <h1>Error Page</h1>
      <mv-container>
        <p>
          This is the Error page. Click <a href="/">here</a> to return to home
          page.
        </p>
        <p>
          <h3>Error code: ${this.parameters.pathParameters.errorCode}</h3>
        </p>
      </mv-container>
    `;
  }
}

customElements.define("error-page", ErrorPage);

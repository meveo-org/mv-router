import { LitElement, html, css } from "lit-element";
import "mv-container";

export default class HelpPage extends LitElement {
  static get properties() {
    return {
      value: { type: String, attribute: true },
      parameters: { type: Object, attribute: true }
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
      <h1>Help Page</h1>
      <mv-container>
        <p>
          This is the Help page. Click <a href="/">here</a> to return to home
          page.
        </p>
        <p>
          ArticleId: ${this.parameters.queryParameters.articleId}
        </p>
      </mv-container>
    `;
  }
}

customElements.define("help-page", HelpPage);

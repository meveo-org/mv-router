import { LitElement, html, css } from "lit-element";
import "router-slot";
import "mv-main";
import "mv-menu-panel";
import "mv-header";
import "mv-footer";

import "./mv-router.js";

export class MvRouterDemo extends LitElement {
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
        --mv-header-height: 66px;
        --mv-footer-height: 40px;
        --mv-menu-panel-width: 300px;
        --mv-container-max-width: 100%;
        --mv-container-margin: 20px auto;
      }
      router-link {
        outline: none;
      }
    `;
  }

  render() {
    return html`
      <mv-main>
        <mv-header slot="header">
          <mv-header item>MvRouter Demo</mv-header>
        </mv-header>
        <mv-menu-panel menu showLabel slot="menu">
          <mv-menu-panel label>MvRouter</mv-menu-panel>
          <mv-menu-panel item><router-link path="./">Home</router-link></mv-menu-panel>
          <mv-menu-panel item><router-link path="./profile">Profile</router-link></mv-menu-panel>
          <mv-menu-panel item><router-link path="./help?articleId=123">Help</router-link></mv-menu-panel>
          <mv-menu-panel item><router-link path="./about">About</router-link></mv-menu-panel>
          <mv-menu-panel item><router-link path="./error/404">Error</router-link></mv-menu-panel>
        </mv-menu-panel>
        <mv-router>
          <mv-router
            default
            route
            path="home"
            component="./pages/home.js"
          ></mv-router>
          <mv-router route path="about" component="./pages/about.js"></mv-router>
          <mv-router
            route
            path="profile"
            component="./pages/profile.js"
          ></mv-router>
          <mv-router route path="help" component="./pages/help.js"></mv-router>
          <mv-router route path="error/:errorCode" component="./pages/error.js"></mv-router>
        </mv-router>
        <mv-footer slot="footer">
          <mv-footer item>MvRouter Demo</mv-footer>
        </mv-footer>
      </mv-main>
    `;
  }
}

customElements.define("mv-router-demo", MvRouterDemo);

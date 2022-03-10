import { LitElement, html, css } from "lit";
import "router-slot";
import "@meveo-org/mv-main";
import "@meveo-org/mv-menu-panel";
import "@meveo-org/mv-header";
import "@meveo-org/mv-footer";

import "./mv-router.js";

import AboutPage from "./pages/about.js";
import ErrorPage from "./pages/error.js";
import HelpPage from "./pages/help.js";
import HomePage from "./pages/home.js";
import ProfilePage from "./pages/profile.js";

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
        display: block;
        outline: none;
        height: 100%;
        width: 100%;
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
          <mv-router default route path="home" .componentClass="${HomePage}"></mv-router>
          <mv-router route path="about" .componentClass="${AboutPage}"></mv-router>
          <mv-router route path="profile" .componentClass="${ProfilePage}"></mv-router>
          <mv-router route path="help" .componentClass="${HelpPage}"></mv-router>
          <mv-router route path="error/:errorCode" .componentClass="${ErrorPage}"></mv-router>
        </mv-router>
        <mv-footer slot="footer">
          <mv-footer item>MvRouter Demo</mv-footer>
        </mv-footer>
      </mv-main>
    `;
  }
}

customElements.define("mv-router-demo", MvRouterDemo);

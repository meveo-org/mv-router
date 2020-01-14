# mv-router

 MvRouter is a Meveo menu component (based on lit-element) that allows browser routing for single page applications using [router-slot](https://github.com/andreasbm/router-slot)

## Features
* Uses a single tag for rendering the routes.
* Written in vanilla javascript


## Quick Start

Since we use **router-slot** for the routes, as indicated in their documentation, add a `<base href="/">` tag at `<head>` section of the applications root html.

**Note**: Make sure that the declared routes will have `path`s that are relative to the `base` path. For the `component` path, the path should always be relative to the path of `mv-router`.

To add routes, just use the following syntax:
```html
<mv-router>  
  // this is the default route
  <mv-router default route path="home" component="./pages/home.js"></mv-router>

  // this is a route that only declares the path and
  // the component that will be imported
  <mv-router route path="help" component="./pages/help.js"></mv-router>

  // this is a route that includes a path parameter "errorCode"
  <mv-router route path="error/:errorCode" component="./pages/error.js"></mv-router>
</mv-router>
```

To go to a route, use the following syntax:
```html
// route to root path
<a href=".">Home</a>

// route to a relative path
<a href="./profile">Profile</a>

// route with a query parameter "articleId"
<a href="./help?articleId=123">Help</a>

// route with path parameter "404"
<a href="./error/404">Error</a>
```

Path and query parameters can be retrieved in the components using the `parameters` property:

For example:
```html
// the route declaration
<mv-router route path="help" component="./pages/help.js"></mv-router>

// the link declaration
<a href="./help?articleId=123">Help</a>
```
```javascript
// in ./pages/help.js, the parameter can be retrieved using:
${this.parameters.queryParameters.articleId}
```

```html
// the route declaration
<mv-router route path="help/:articleId" component="./pages/help.js"></mv-router>

// the link declaration
<a href="./help/123">Help</a>
```
```javascript
// in ./pages/help.js, the parameter can be retrieved using:
${this.parameters.pathParameters.articleId}
```

For a demo: [router.meveo.org](https://router.meveo.org)


## Acknowledgements

* MvRouter uses [router-slot](https://github.com/andreasbm/router-slot).

# Routing

Routing in DevServer takes a lot of inspiration from Next.js.

The biggest difference is this: <strong>routes happen through `.html` files</strong>. This means you can use your DevServer with any framework – from React to Vue to no framework at all.

Here's an example of a route:

```html
<html>
  <head>
    <script src="src/index.ts"></script>
  </head>

  <body>
    <div id="root"></div>
  </body>
</html>
```

If you placed this html file in `public/index.html`, then opening the subdomain would open that route by default.

Unlike normal html files, your `<script>` tags and your `<link rel="stylesheet">` will be bundled and replaced at build-time. This means `<script src="./file.ts">` could point to a TypeScript file, JSX, TSX, or anything else you want bundled. The same is true for CSS.

At build time, your HTML file along with JavaScript/TypeScript/CSS you link to will be bundled through ESBuild and a new HTML file is created, replacing the assets. For processing the HTML, this uses [HTMLBuild](https://github.com/jarred-sumner/htmlbuild).

Your routing configuration is stored in your `package.json` file like this:

```json
{
  "run": {
    "router": "path-to.html-file-or-path-to-folder"
  }
}
```

### Single-page app routing

To route as a single-page app,

### 📁 folder routing

This works similarly to Next.js, using the file name &amp;
directory tree in your repo to route from `/request/url/123` to
`/request/url/:id`.

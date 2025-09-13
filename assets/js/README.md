# Javascript conventions

This site should be mostly static HTML, but where a JS widget will help users understand the data, we'll follow a consistent pattern. The markdown will look something like this:

```html
... and here's an interactive demonstration:

<script>
const whatWeNeed = {{ site.data.what_we_need | jsonify }};
</script>
<div id="new-demo"></div>
<script type="module" src="/assets/js/new-demo.js"></script>
```

- Explain what the widget is for in the markdown content.
- If necessary, use `jsonify` to make data available to javascript.
- HTML element will be identified by ID to fill in the generated content.
- Load a JS file with the same name.
- Use ES modules, so we don't inadvertantly pollute the global namespace.

Then in `new-demo.js`:

```javascript
import { helpful } from "https://cdn.jsdelivr.net/npm/.../helpful.esm.js";

function doSomething(){
    ...
}

function fillNewDemo(id, whatWeNeed) {
    ...
    document.getElementById(id)....;
}

window.addEventListener("load", () => {
    // eslint-disable-next-line no-undef
    fillNewDemo("new-demo", whatWeNeed);
});
```

- If you need an outside library, and it's available as ESM, great! This might not always be possible, but avoiding globals will make the code less fragile.
- Split the code into bite-sized functions.
- Have one main function that wraps everything else up.
- Call that function on load: We don't want to call it immediately because that will block page rendering, and will break if the javascript comes before the HTML element it populates.
- CI runs ESLint on the code. When it's necessary we'll allow globals, but other problems should be fixed.
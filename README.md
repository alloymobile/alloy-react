## AlloyIcon

- **Icon object class**: `new AlloyIconObject({ icon: "fa-solid fa-user" })`
  - Auto-assigns id: `icon1`, `icon2`, …
- **Component**: `<AlloyIcon iconObj={obj} />` or `<AlloyIcon id="myId" icon="fa-solid fa-user" />`

> Requires Bootstrap and Font Awesome (already included as dev + peer deps).  
> In your app, ensure you import their CSS once:
> ```js
> import "bootstrap/dist/css/bootstrap.min.css";
> import "@fortawesome/fontawesome-free/css/all.min.css";
> ```

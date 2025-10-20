import { jsx as t } from "react/jsx-runtime";
import "react";
let n = 0;
function c() {
  return n += 1, `icon${n}`;
}
class l {
  /**
   * @param {{ id?: string, iconClass: string }} params
   */
  constructor({ id: i, iconClass: o }) {
    if (!o) throw new Error("Icon requires iconClass");
    this.id = i ?? c(), this.iconClass = o;
  }
}
function u({ icon: r }) {
  if (!r) throw new Error("AlloyIcon requires `icon` prop (Icon instance).");
  return /* @__PURE__ */ t("i", { id: r.id, className: r.iconClass, "aria-hidden": "true" });
}
export {
  u as AlloyIcon,
  l as Icon
};
//# sourceMappingURL=alloy-react.es.js.map

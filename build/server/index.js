import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts, Link, useParams } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import * as React from "react";
import { useState } from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { X, Monitor, Moon, Sun, Menu, MapPin, Mail, Code, Briefcase, GraduationCap, ChevronRight, Calendar, Check, Linkedin, Github, ArrowLeft, Palette, GitCommit, ExternalLink } from "lucide-react";
import classNames from "classnames";
import { useColorScheme } from "@dazl/color-scheme/react";
import { Slot } from "@radix-ui/react-slot";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  if (request.method.toUpperCase() === "HEAD") {
    return new Response(null, {
      status: responseStatusCode,
      headers: responseHeaders
    });
  }
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1e6;
let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}
const toastTimeouts = /* @__PURE__ */ new Map();
const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId
    });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      };
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) => t.id === action.toast.id ? { ...t, ...action.toast } : t)
      };
    case "DISMISS_TOAST": {
      const { toastId } = action;
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast2) => {
          addToRemoveQueue(toast2.id);
        });
      }
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === toastId || toastId === void 0 ? {
            ...t,
            open: false
          } : t
        )
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === void 0) {
        return {
          ...state,
          toasts: []
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId)
      };
  }
};
const listeners = [];
let memoryState = { toasts: [] };
function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}
function toast$1({ ...props }) {
  const id = genId();
  const update = (props2) => dispatch({
    type: "UPDATE_TOAST",
    toast: { ...props2, id }
  });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      }
    }
  });
  return {
    id,
    dismiss,
    update
  };
}
function useToast() {
  const [state, setState] = React.useState(memoryState);
  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);
  return {
    ...state,
    toast: toast$1,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId })
  };
}
const viewport = "_viewport_15mn9_1";
const toast = "_toast_15mn9_16";
const destructive$1 = "_destructive_15mn9_53";
const close = "_close_15mn9_58";
const title$1 = "_title_15mn9_93";
const description = "_description_15mn9_98";
const icon = "_icon_15mn9_101";
const styles$4 = {
  viewport,
  toast,
  destructive: destructive$1,
  close,
  title: title$1,
  description,
  icon
};
const ToastProvider = ToastPrimitive.Provider;
const ToastViewport = ({ className, ...props }) => /* @__PURE__ */ jsx(ToastPrimitive.Viewport, { className: classNames(styles$4.viewport, className), ...props });
ToastViewport.displayName = ToastPrimitive.Viewport.displayName;
const Toast = ({ className, variant = "default", ...props }) => /* @__PURE__ */ jsx(
  ToastPrimitive.Root,
  {
    className: classNames(styles$4.toast, variant === "destructive" && styles$4.destructive, className),
    ...props
  }
);
Toast.displayName = ToastPrimitive.Root.displayName;
ToastPrimitive.Action.displayName;
const ToastClose = ({ className, ...props }) => /* @__PURE__ */ jsx(ToastPrimitive.Close, { className: classNames(styles$4.close, className), "toast-close": "", ...props, children: /* @__PURE__ */ jsx(X, { className: styles$4.icon }) });
ToastClose.displayName = ToastPrimitive.Close.displayName;
const ToastTitle = ({ className, ...props }) => /* @__PURE__ */ jsx(ToastPrimitive.Title, { className: classNames(styles$4.title, className), ...props });
ToastTitle.displayName = ToastPrimitive.Title.displayName;
const ToastDescription = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(ToastPrimitive.Description, { className: classNames(styles$4.description, className), ...props });
ToastDescription.displayName = ToastPrimitive.Description.displayName;
const container$1 = "_container_1pblw_1";
const styles$3 = {
  container: container$1
};
function Toaster() {
  const { toasts } = useToast();
  return /* @__PURE__ */ jsxs(ToastProvider, { children: [
    toasts.map(function({ id, title: title2, description: description2, action, ...props }) {
      return /* @__PURE__ */ jsxs(Toast, { ...props, children: [
        /* @__PURE__ */ jsxs("div", { className: styles$3.container, children: [
          title2 && /* @__PURE__ */ jsx(ToastTitle, { children: title2 }),
          description2 && /* @__PURE__ */ jsx(ToastDescription, { children: description2 })
        ] }),
        action,
        /* @__PURE__ */ jsx(ToastClose, {})
      ] }, id);
    }),
    /* @__PURE__ */ jsx(ToastViewport, {})
  ] });
}
function Footer() {
  return /* @__PURE__ */ jsx("footer", { className: "border-t border-gray-200 px-4 py-4 dark:border-gray-800 sm:px-6", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-7xl items-center justify-between gap-4", children: [
    /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "© 2026 Dohar Siregar. All rights reserved." }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-end gap-1", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 line-through", children: "v1.0.0" }),
        /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-gray-700 dark:text-gray-200", children: "v1.2.1" })
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 text-xs font-medium text-amber-600 dark:text-amber-400", children: [
        /* @__PURE__ */ jsxs(
          "svg",
          {
            "aria-hidden": "true",
            xmlns: "http://www.w3.org/2000/svg",
            width: "12",
            height: "12",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            className: "animate-spin",
            children: [
              /* @__PURE__ */ jsx("path", { d: "M20 7v5h-5" }),
              /* @__PURE__ */ jsx("path", { d: "M4 17v-5h5" }),
              /* @__PURE__ */ jsx("path", { d: "M5.6 9a7 7 0 0 1 11.5-2L20 12" }),
              /* @__PURE__ */ jsx("path", { d: "M4 12l2.9 5a7 7 0 0 0 11.5-2" })
            ]
          }
        ),
        /* @__PURE__ */ jsx("span", { children: "Upgrading" })
      ] })
    ] })
  ] }) });
}
const colorSchemeApi = "data:text/javascript;base64,ZnVuY3Rpb24gaW5pdGlhdGVDb2xvclNjaGVtZSh7IHNhdmVDb25maWcsIGxvYWRDb25maWcsIGNzc0NsYXNzIH0pIHsKICAgIGNvbnN0IHN0YXRlID0gewogICAgICAgIGxpc3RlbmVyczogbmV3IFNldCgpLAogICAgICAgIGNvbmZpZzogbG9hZENvbmZpZygpLAogICAgfTsKICAgIGNvbnN0IGlzRGFya1F1ZXJ5ID0gd2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyayknKTsKICAgIGNvbnN0IHJlc29sdmVTeXN0ZW0gPSAoKSA9PiAoaXNEYXJrUXVlcnkubWF0Y2hlcyA/ICdkYXJrJyA6ICdsaWdodCcpOwogICAgY29uc3Qgb25TeXN0ZW1DaGFuZ2UgPSAoKSA9PiB7CiAgICAgICAgaWYgKHN0YXRlLmNvbmZpZyAhPT0gJ3N5c3RlbScpCiAgICAgICAgICAgIHJldHVybjsKICAgICAgICB1cGRhdGVEb2N1bWVudCgpOwogICAgfTsKICAgIGNvbnN0IGN1cnJlbnRTdGF0ZSA9ICgpID0+IHsKICAgICAgICBjb25zdCBjb25maWcgPSBzdGF0ZS5jb25maWc7CiAgICAgICAgY29uc3QgcmVzb2x2ZWQgPSBjb25maWcgPT09ICdzeXN0ZW0nID8gcmVzb2x2ZVN5c3RlbSgpIDogY29uZmlnOwogICAgICAgIHJldHVybiB7IGNvbmZpZywgcmVzb2x2ZWQgfTsKICAgIH07CiAgICBjb25zdCB1cGRhdGVEb2N1bWVudCA9ICgpID0+IHsKICAgICAgICBjb25zdCBjdXJyZW50ID0gY3VycmVudFN0YXRlKCk7CiAgICAgICAgY29uc3Qgcm9vdCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDsKICAgICAgICByb290LmNsYXNzTGlzdC5yZW1vdmUoY3NzQ2xhc3MubGlnaHQsIGNzc0NsYXNzLmRhcmspOwogICAgICAgIHJvb3QuY2xhc3NMaXN0LmFkZChjc3NDbGFzc1tjdXJyZW50LnJlc29sdmVkXSk7CiAgICAgICAgcm9vdC5zdHlsZS5jb2xvclNjaGVtZSA9IGN1cnJlbnQucmVzb2x2ZWQgPT09ICdkYXJrJyA/ICdkYXJrJyA6ICdsaWdodCc7CiAgICAgICAgc3RhdGUubGlzdGVuZXJzLmZvckVhY2goKGxpc3RlbmVyKSA9PiBsaXN0ZW5lcihjdXJyZW50KSk7CiAgICB9OwogICAgLy8gc2V0IGluaXRpYWwgY29sb3Igc2NoZW1lIGFuZCBsaXN0ZW4gZm9yIHN5c3RlbSBjaGFuZ2VzCiAgICB1cGRhdGVEb2N1bWVudCgpOwogICAgaXNEYXJrUXVlcnkuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgb25TeXN0ZW1DaGFuZ2UpOwogICAgcmV0dXJuIHsKICAgICAgICBnZXQgY29uZmlnKCkgewogICAgICAgICAgICByZXR1cm4gc3RhdGUuY29uZmlnOwogICAgICAgIH0sCiAgICAgICAgc2V0IGNvbmZpZyhjb25maWcpIHsKICAgICAgICAgICAgaWYgKGNvbmZpZyA9PT0gc3RhdGUuY29uZmlnKQogICAgICAgICAgICAgICAgcmV0dXJuOwogICAgICAgICAgICBzdGF0ZS5jb25maWcgPSBjb25maWc7CiAgICAgICAgICAgIHVwZGF0ZURvY3VtZW50KCk7CiAgICAgICAgICAgIHNhdmVDb25maWcoY29uZmlnKTsKICAgICAgICB9LAogICAgICAgIGdldCBjdXJyZW50U3RhdGUoKSB7CiAgICAgICAgICAgIHJldHVybiBjdXJyZW50U3RhdGUoKTsKICAgICAgICB9LAogICAgICAgIGdldCByZXNvbHZlZFN5c3RlbSgpIHsKICAgICAgICAgICAgcmV0dXJuIHJlc29sdmVTeXN0ZW0oKTsKICAgICAgICB9LAogICAgICAgIGdldFJvb3RDc3NDbGFzcyhyZXNvbHZlZCA9IGN1cnJlbnRTdGF0ZSgpLnJlc29sdmVkKSB7CiAgICAgICAgICAgIHJldHVybiBjc3NDbGFzc1tyZXNvbHZlZF07CiAgICAgICAgfSwKICAgICAgICBzdWJzY3JpYmU6IChzdWIpID0+IHsKICAgICAgICAgICAgc3RhdGUubGlzdGVuZXJzLmFkZChzdWIpOwogICAgICAgICAgICByZXR1cm4gKCkgPT4gewogICAgICAgICAgICAgICAgc3RhdGUubGlzdGVuZXJzLmRlbGV0ZShzdWIpOwogICAgICAgICAgICB9OwogICAgICAgIH0sCiAgICAgICAgZGlzcG9zZTogKCkgPT4gewogICAgICAgICAgICBzdGF0ZS5saXN0ZW5lcnMuY2xlYXIoKTsKICAgICAgICAgICAgaXNEYXJrUXVlcnkucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgb25TeXN0ZW1DaGFuZ2UpOwogICAgICAgIH0sCiAgICB9Owp9CmNvbnN0IHN0b3JhZ2VLZXkgPSAnY29sb3Itc2NoZW1lJzsKY29uc3Qgc2NyaXB0RGF0YXNldCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQ/LmRhdGFzZXQ7CmNvbnN0IGRhcmtDc3NDbGFzcyA9IHNjcmlwdERhdGFzZXQ/LmRhcmtDbGFzcyB8fCAnZGFyay10aGVtZSc7CmNvbnN0IGxpZ2h0Q3NzQ2xhc3MgPSBzY3JpcHREYXRhc2V0Py5saWdodENsYXNzIHx8ICdsaWdodC10aGVtZSc7CndpbmRvdy5jb2xvclNjaGVtZUFwaSA/Pz0gaW5pdGlhdGVDb2xvclNjaGVtZSh7CiAgICBsb2FkQ29uZmlnKCkgewogICAgICAgIHRyeSB7CiAgICAgICAgICAgIGNvbnN0IGNvbmZpZyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHN0b3JhZ2VLZXkpOwogICAgICAgICAgICByZXR1cm4gY29uZmlnID09PSAnbGlnaHQnIHx8IGNvbmZpZyA9PT0gJ2RhcmsnID8gY29uZmlnIDogJ3N5c3RlbSc7CiAgICAgICAgfQogICAgICAgIGNhdGNoIHsKICAgICAgICAgICAgcmV0dXJuICdzeXN0ZW0nOwogICAgICAgIH0KICAgIH0sCiAgICBzYXZlQ29uZmlnKGNvbmZpZykgewogICAgICAgIHRyeSB7CiAgICAgICAgICAgIGlmIChjb25maWcgPT09ICdzeXN0ZW0nKSB7CiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShzdG9yYWdlS2V5KTsKICAgICAgICAgICAgfQogICAgICAgICAgICBlbHNlIHsKICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHN0b3JhZ2VLZXksIGNvbmZpZyk7CiAgICAgICAgICAgIH0KICAgICAgICB9CiAgICAgICAgY2F0Y2ggewogICAgICAgICAgICAvLyBGYWxsYmFjayB0byBuby1vcCBpZiBsb2NhbFN0b3JhZ2UgaXMgbm90IGF2YWlsYWJsZQogICAgICAgIH0KICAgIH0sCiAgICBjc3NDbGFzczogeyBsaWdodDogbGlnaHRDc3NDbGFzcywgZGFyazogZGFya0Nzc0NsYXNzIH0sCn0pOwo=";
const favicon = "/favicon.svg";
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "icon",
  href: favicon,
  type: "image/svg+xml"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  const {
    rootCssClass,
    resolvedScheme
  } = useColorScheme();
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    suppressHydrationWarning: true,
    className: rootCssClass,
    style: {
      colorScheme: resolvedScheme
    },
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx("script", {
        src: colorSchemeApi
      }), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(Toaster, {}), /* @__PURE__ */ jsx(Footer, {}), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const base = "_base_2d7se_1";
const destructive = "_destructive_2d7se_47";
const outline = "_outline_2d7se_56";
const secondary = "_secondary_2d7se_67";
const link = "_link_2d7se_76";
const sizeDefault = "_sizeDefault_2d7se_87";
const sizeSm = "_sizeSm_2d7se_91";
const sizeLg = "_sizeLg_2d7se_96";
const sizeIcon = "_sizeIcon_2d7se_101";
const styles$2 = {
  base,
  "default": "_default_2d7se_30",
  destructive,
  outline,
  secondary,
  link,
  sizeDefault,
  sizeSm,
  sizeLg,
  sizeIcon
};
const Button = ({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) => {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      className: classNames(
        styles$2.base,
        styles$2[variant],
        styles$2[`size${size.charAt(0).toUpperCase() + size.slice(1)}`],
        className
      ),
      ...props
    }
  );
};
Button.displayName = "Button";
const content = "_content_15r25_25";
const item = "_item_15r25_43";
const inset = "_inset_15r25_133";
const styles$1 = {
  content,
  item,
  inset
};
const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
DropdownMenuPrimitive.SubTrigger.displayName;
DropdownMenuPrimitive.SubContent.displayName;
const DropdownMenuContent = ({
  className,
  sideOffset = 4,
  ...props
}) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Content,
  {
    sideOffset,
    className: classNames(styles$1.content, className),
    ...props
  }
) });
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
const DropdownMenuItem = ({
  className,
  inset: inset2,
  ...props
}) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Item, { className: classNames(styles$1.item, inset2 && styles$1.inset, className), ...props });
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
DropdownMenuPrimitive.CheckboxItem.displayName;
DropdownMenuPrimitive.RadioItem.displayName;
DropdownMenuPrimitive.Label.displayName;
DropdownMenuPrimitive.Separator.displayName;
const option = "_option_1mj3p_1";
const style = {
  option
};
const ICON_LABEL = {
  light: { icon: /* @__PURE__ */ jsx(Sun, {}), label: "Light" },
  dark: { icon: /* @__PURE__ */ jsx(Moon, {}), label: "Dark" },
  system: { icon: /* @__PURE__ */ jsx(Monitor, {}), label: "System" }
};
function ColorSchemeToggle({ triggerText = false, optionText = true }) {
  const { configScheme, resolvedScheme, setColorScheme } = useColorScheme();
  const { icon: icon2, label } = ICON_LABEL[resolvedScheme];
  return /* @__PURE__ */ jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "icon", "aria-label": "Toggle color scheme", children: [
      icon2,
      triggerText && label
    ] }) }),
    /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "end", sideOffset: 8, children: [
      /* @__PURE__ */ jsxs(
        DropdownMenuItem,
        {
          onClick: () => setColorScheme("light"),
          className: style.option,
          "data-selected": configScheme === "light",
          children: [
            ICON_LABEL.light.icon,
            optionText && ICON_LABEL.light.label
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        DropdownMenuItem,
        {
          onClick: () => setColorScheme("dark"),
          className: style.option,
          "data-selected": configScheme === "dark",
          children: [
            ICON_LABEL.dark.icon,
            optionText && ICON_LABEL.dark.label
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        DropdownMenuItem,
        {
          onClick: () => setColorScheme("system"),
          className: style.option,
          "data-selected": configScheme === "system",
          children: [
            ICON_LABEL.system.icon,
            optionText && ICON_LABEL.system.label
          ]
        }
      )
    ] })
  ] });
}
function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return /* @__PURE__ */ jsxs("nav", { className: "sticky top-0 z-10 bg-neutral-1 border-b border-neutral-7", children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-360 mx-auto px-6 md:px-12.5 h-16 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("a", { href: "#", className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: "w-[22px] h-[22px] text-accent-9 flex items-center justify-center", children: "◆" }),
        /* @__PURE__ */ jsx("span", { className: "font-heading text-neutral-12 text-[20px] font-bold", children: "Dohar." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "hidden md:flex items-center gap-[36px]", children: [
        /* @__PURE__ */ jsx("a", { href: "#", className: "text-[14px] text-neutral-9 transition-colors 200ms ease relative focus-visible:text-accent-9 focus-visible:outline-none", children: "Home" }),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "#about",
            className: "text-[14px] text-accent-9 transition-colors 200ms ease relative focus-visible:outline-none",
            children: [
              "About",
              /* @__PURE__ */ jsx("span", { className: "absolute bottom-[-8px] left-0 w-[38px] h-0.5 bg-accent-9" })
            ]
          }
        ),
        /* @__PURE__ */ jsx("a", { href: "/projects", className: "text-[14px] text-neutral-9 transition-colors 200ms ease relative focus-visible:text-accent-9 focus-visible:outline-none", children: "Projects" }),
        /* @__PURE__ */ jsx("a", { href: "#contact", className: "text-[14px] text-neutral-9 transition-colors 200ms ease relative focus-visible:text-accent-9 focus-visible:outline-none", children: "Contact" })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          "aria-label": "Toggle navigation menu",
          "aria-expanded": isMobileMenuOpen,
          className: "md:hidden w-10 h-10 flex items-center justify-center rounded-[6px] text-neutral-11 hover:bg-neutral-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-9 transition-colors 200ms ease",
          onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen),
          children: /* @__PURE__ */ jsx(Menu, { className: "w-5 h-5" })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx(ColorSchemeToggle, {}) })
    ] }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `md:hidden transition-all duration-200 ease overflow-hidden border-t border-neutral-7 ${isMobileMenuOpen ? "max-h-[300px] py-4" : "max-h-0"}`,
        children: /* @__PURE__ */ jsxs("div", { className: "max-w-360 mx-auto px-6 md:px-12.5 flex flex-col gap-3", children: [
          /* @__PURE__ */ jsx("a", { href: "#", className: "text-[14px] text-neutral-11 hover:text-neutral-1 transition-colors 200ms ease py-2", children: "Home" }),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "#about",
              className: "text-[14px] text-accent-9 transition-colors 200ms ease py-2",
              onClick: () => setIsMobileMenuOpen(false),
              children: "About"
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "/projects",
              className: "text-[14px] text-neutral-11 hover:text-neutral-1 transition-colors 200ms ease py-2",
              onClick: () => setIsMobileMenuOpen(false),
              children: "Projects"
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "#contact",
              className: "text-[14px] text-neutral-11 hover:text-neutral-1 transition-colors 200ms ease py-2",
              onClick: () => setIsMobileMenuOpen(false),
              children: "Contact"
            }
          )
        ] })
      }
    )
  ] });
}
const historyEntries = [
  {
    id: "1",
    type: "work",
    dateRange: "Sep 2021 – Present",
    dateStart: "2021-09",
    title: "Frontend Developer at TechScale",
    metadata: "Full-time · Yogyakarta, Indonesia",
    category: "Work Experience",
    company: "TechScale",
    jobType: "Full-time",
    location: "Yogyakarta, Indonesia",
    dateLabel: "Sep 2021 – Present",
    description: "I work as a Frontend Developer at TechScale, a growing tech company focused on building digital solutions for businesses. In this role, I'm responsible for developing and maintaining modern web applications using React, Next.js, and Tailwind CSS.",
    responsibilities: [
      "Developing responsive and accessible web interfaces",
      "Collaborating with backend developers and designers",
      "Optimizing performance and user experience",
      "Maintaining and improving existing features"
    ],
    technologies: ["React", "Next.js", "Tailwind CSS", "TypeScript", "Git"],
    quote: "Great products are built by great teams, and I'm grateful to be part of this journey."
  },
  {
    id: "2",
    type: "work",
    dateRange: "Jun 2020 – Aug 2021",
    dateStart: "2020-06",
    title: "Web Developer at Kreativa Studio",
    metadata: "Full-time · Bandung, Indonesia",
    category: "Work Experience",
    company: "Kreativa Studio",
    jobType: "Full-time",
    location: "Bandung, Indonesia",
    dateLabel: "Jun 2020 – Aug 2021",
    description: "Built and maintained responsive websites for client projects, working with designers to translate visual concepts into reliable user interfaces.",
    responsibilities: [
      "Implementing responsive page layouts",
      "Integrating frontend components with APIs",
      "Improving page performance and accessibility",
      "Reviewing and fixing UI defects"
    ],
    technologies: ["HTML", "CSS", "JavaScript", "Bootstrap", "Git"]
  },
  {
    id: "3",
    type: "education",
    dateRange: "Jan 2019 – May 2020",
    dateStart: "2019-01",
    title: "Computer Science at Universitas Gadjah Mada",
    metadata: "Bachelor's Degree · Yogyakarta, Indonesia",
    category: "Education",
    company: "Universitas Gadjah Mada",
    jobType: "Bachelor's Degree",
    location: "Yogyakarta, Indonesia",
    dateLabel: "Jan 2019 – May 2020",
    description: "Studied core computer science concepts, software development practices, data structures, and the foundations of web technologies.",
    responsibilities: [
      "Studying programming fundamentals",
      "Practicing algorithms and data structures",
      "Building coursework projects",
      "Collaborating on group assignments"
    ],
    technologies: ["Programming", "Algorithms", "Databases", "Web Development"]
  },
  {
    id: "4",
    type: "internship",
    dateRange: "Aug 2018 – Dec 2018",
    dateStart: "2018-08",
    title: "Frontend Intern at Digitalux",
    metadata: "Internship · Jakarta, Indonesia",
    category: "Internship",
    company: "Digitalux",
    jobType: "Internship",
    location: "Jakarta, Indonesia",
    dateLabel: "Aug 2018 – Dec 2018",
    description: "Supported the frontend team in implementing website components and refining interfaces for internal and client-facing projects.",
    responsibilities: [
      "Building reusable UI components",
      "Fixing responsive layout issues",
      "Testing pages across screen sizes",
      "Learning team development workflows"
    ],
    technologies: ["HTML", "CSS", "JavaScript", "Git"]
  },
  {
    id: "5",
    type: "education",
    dateRange: "Jul 2016 – Jun 2018",
    dateStart: "2016-07",
    title: "Senior High School",
    metadata: "High School · Yogyakarta, Indonesia",
    category: "Education",
    company: "SMA Negeri 1 Yogyakarta",
    jobType: "High School",
    location: "Yogyakarta, Indonesia",
    dateLabel: "Jul 2016 – Jun 2018",
    description: "Completed senior high school while developing an early interest in computers, technology, and problem-solving.",
    responsibilities: [
      "Building foundational analytical skills",
      "Exploring computer-related interests",
      "Participating in school activities"
    ],
    technologies: ["Mathematics", "Science", "Computer Basics"]
  }
];
const Profil = "/assets/IMG_4745-B3x9FKCr.webp";
const IDENTITY = {
  name: "Dohar Siregar",
  role: "Full-Stack Web Developer",
  email: "doharsiregar10@gmail.com",
  location: "Yogyakarta, Indonesia"
};
function AboutSection() {
  const [selectedId, setSelectedId] = useState(historyEntries[0]?.id ?? "");
  const selectedEntry = historyEntries.find((entry2) => entry2.id === selectedId) ?? historyEntries[0];
  return /* @__PURE__ */ jsxs("main", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("section", { className: "bg-neutral-1 pt-12 pb-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-360 mx-auto px-6 md:px-12.5 min-h-[285px] grid grid-cols-1 md:grid-cols-[2fr_1fr_auto] lg:grid-cols-[2fr_1fr_auto] gap-4 items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start max-w-[520px]", children: [
        /* @__PURE__ */ jsx("span", { className: "inline-flex items-center gap-2 px-4 py-[3px] rounded-full bg-blue-900/20 text-blue-400 text-sm font-medium mb-6 align-start", children: "About Me" }),
        /* @__PURE__ */ jsxs("h1", { className: "font-display text-neutral-12 text-[28px] sm:text-[36px] md:text-[42px] lg:text-5xl font-800 leading-tight", children: [
          "Hi, I'm ",
          /* @__PURE__ */ jsx("span", { className: "text-accent-9", children: IDENTITY.name.split(" ")[0] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-neutral-11 text-[15px] leading-[26px] max-w-[480px]", children: "I'm a Frontend Developer with a passion for building beautiful, fast, and accessible web experiences. I love turning ideas into interactive products that make an impact." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: Profil,
          alt: `Portrait of ${IDENTITY.name}`,
          className: "w-[150px] h-[150px] sm:w-[170px] sm:h-[170px] md:w-[192px] md:h-[192px] rounded-full object-cover object-center"
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-[22px] items-start ml-[80px] md:ml-auto md:items-start lg:ml-0 lg:items-start", children: [
        /* @__PURE__ */ jsx(InfoItem, { icon: /* @__PURE__ */ jsx(UserIcon, {}), label: "Name", value: IDENTITY.name }),
        /* @__PURE__ */ jsx(InfoItem, { icon: /* @__PURE__ */ jsx(MapPin, {}), label: "Location", value: IDENTITY.location }),
        /* @__PURE__ */ jsx(InfoItem, { icon: /* @__PURE__ */ jsx(Mail, {}), label: "Email", value: IDENTITY.email }),
        /* @__PURE__ */ jsx(InfoItem, { icon: /* @__PURE__ */ jsx(Code, {}), label: "Role", value: IDENTITY.role })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "pt-16 pb-24 md:pb-0", children: /* @__PURE__ */ jsxs("div", { className: "max-w-360 mx-auto px-6 md:px-12.5 grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-8 md:gap-10 lg:gap-12 items-start", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-rows-[auto_1fr] gap-3 min-h-125 md:min-h-150 md:h-150", children: [
        /* @__PURE__ */ jsxs("header", { children: [
          /* @__PURE__ */ jsx("span", { className: "block text-[10px] sm:text-[11px] font-medium uppercase tracking-wider text-neutral-10 mb-2", children: "MY JOURNEY" }),
          /* @__PURE__ */ jsx("h2", { className: "font-heading text-neutral-12 text-[24px] sm:text-[28px] md:text-3xl font-bold mb-2", children: "Work & Education History" }),
          /* @__PURE__ */ jsx("p", { className: "text-neutral-10 text-[14px]", children: "A timeline of my journey, from learning to building real-world products." })
        ] }),
        /* @__PURE__ */ jsx("nav", { className: "flex flex-col gap-3.75", "aria-label": "History timeline", children: historyEntries.map((entry2) => /* @__PURE__ */ jsx(
          TimelineItem,
          {
            entry: entry2,
            isActive: entry2.id === selectedId,
            onClick: () => setSelectedId(entry2.id)
          },
          entry2.id
        )) })
      ] }),
      /* @__PURE__ */ jsx(
        "article",
        {
          className: "bg-neutral-2 border border-neutral-6 rounded-[10px] p-5 sm:p-6 md:p-6 shadow-1 h-full",
          "aria-live": "polite",
          "aria-label": "Selected history detail",
          children: /* @__PURE__ */ jsx(DetailCard, { entry: selectedEntry })
        }
      )
    ] }) })
  ] });
}
function UserIcon() {
  return /* @__PURE__ */ jsx("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx(
    "path",
    {
      d: "M12 12c2.67 0 8 1.34 8 4v2H4v-2c0-2.66 5.33-4 8-4zm0 0c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z",
      fill: "currentColor"
    }
  ) });
}
function InfoItem({ icon: icon2, label, value }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-[20px]", children: [
    /* @__PURE__ */ jsx("span", { className: "w-[24px] h-[24px] flex-shrink-0 text-accent-8 flex items-center justify-center", children: icon2 }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
      /* @__PURE__ */ jsx("span", { className: "text-[11px] text-neutral-10", children: label }),
      /* @__PURE__ */ jsx("span", { className: "text-[13px] text-neutral-12 mt-1", children: value })
    ] })
  ] });
}
function TimelineItem({ entry: entry2, isActive, onClick }) {
  const Icon = entry2.type === "work" ? Briefcase : entry2.type === "internship" ? Code : GraduationCap;
  return /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      className: `relative flex items-center gap-4 px-4 py-[14px] rounded-[8px] border border-transparent cursor-pointer transition-all 200ms ease text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-9 ${isActive ? "bg-accent-3 border-accent-4" : "hover:bg-slate-200/80"}`,
      "data-active": isActive,
      "aria-selected": isActive,
      "aria-pressed": isActive,
      onClick,
      children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            className: "absolute left-38.75 top-0 -bottom-4.5 w-0.5 bg-neutral-6 z-0 md:block hidden",
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: `absolute left-37 top-1.5 w-3.5 h-3.5 rounded-full z-1 transition-all duration-200 ease md:block hidden ${isActive ? "bg-accent-9" : "bg-neutral-8 border-2 border-neutral-6"}`,
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "w-[145px] flex-shrink-0 text-[11px] text-neutral-9 md:table-cell", children: entry2.dateRange }),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: `w-[42px] h-[42px] rounded-[10px] flex items-center justify-center flex-shrink-0 z-1 transition-all 200ms ease ${isActive ? "bg-blue-900/15" : "bg-neutral-3"}`,
            children: /* @__PURE__ */ jsx(Icon, { className: `w-[20px] h-[20px] transition-colors 200ms ease ${isActive ? "text-accent-9" : "text-neutral-8"}` })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col flex-1 min-w-0", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[14px] font-medium text-neutral-12 mb-1 line-clamp-2", children: entry2.title }),
          /* @__PURE__ */ jsx("span", { className: "text-[12px] text-neutral-10", children: entry2.metadata })
        ] }),
        /* @__PURE__ */ jsx("span", { className: `w-[16px] h-[16px] flex-shrink-0 transition-colors 200ms ease ${isActive ? "text-accent-9" : "text-neutral-7"}`, children: /* @__PURE__ */ jsx(ChevronRight, {}) })
      ]
    }
  );
}
function DetailCard({ entry: entry2 }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("header", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsx("span", { className: "inline-flex items-center px-[12px] py-1 rounded-full bg-accent-2 text-accent-11 text-[11px] font-medium", children: entry2.category }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: "w-[28px] h-[28px] text-accent-9 flex items-center justify-center", children: "◆" }),
        /* @__PURE__ */ jsx("span", { className: "font-subheading text-neutral-12 text-[16px] font-bold", children: entry2.company })
      ] })
    ] }),
    /* @__PURE__ */ jsx("h3", { className: "font-heading text-neutral-12 text-[20px] font-bold mb-4 leading-[1.25]", children: entry2.title }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-[20px] mb-7", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 text-[12px] text-neutral-10", children: [
        /* @__PURE__ */ jsx(Briefcase, { className: "w-[15px] h-[15px] text-accent-9" }),
        /* @__PURE__ */ jsx("span", { children: entry2.jobType })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 text-[12px] text-neutral-10", children: [
        /* @__PURE__ */ jsx(MapPin, { className: "w-[15px] h-[15px] text-accent-9" }),
        /* @__PURE__ */ jsx("span", { children: entry2.location })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 text-[12px] text-neutral-10", children: [
        /* @__PURE__ */ jsx(Calendar, { className: "w-[15px] h-[15px] text-accent-9" }),
        /* @__PURE__ */ jsx("span", { children: entry2.dateLabel })
      ] })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "text-[14px] leading-[23px] text-neutral-10 mb-7", children: entry2.description }),
    /* @__PURE__ */ jsxs("div", { className: "mb-7", children: [
      /* @__PURE__ */ jsx("h4", { className: "text-[14px] font-medium text-neutral-12 mb-3", children: entry2.type === "education" ? "Achievements" : "Key Responsibilities" }),
      /* @__PURE__ */ jsx("ul", { className: "flex flex-col gap-2", children: entry2.responsibilities.map((item2, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-[13px] text-neutral-10", children: [
        /* @__PURE__ */ jsx(Check, { className: "w-[15px] h-[15px] text-accent-9 mt-1 flex-shrink-0" }),
        /* @__PURE__ */ jsx("span", { children: item2 })
      ] }, i)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-7", children: [
      /* @__PURE__ */ jsx("h4", { className: "text-[14px] font-medium text-neutral-12 mb-3", children: entry2.type === "education" ? "Technologies or subjects" : "Technologies Used" }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-[6px]", children: entry2.technologies.map((tech) => /* @__PURE__ */ jsx(
        "span",
        {
          className: "inline-flex items-center h-[26px] px-[12px] rounded-full bg-accent-2 text-accent-11 text-[11px] font-medium",
          children: tech
        },
        tech
      )) })
    ] })
  ] });
}
function ContactSection() {
  return /* @__PURE__ */ jsxs("section", { className: "py-20 px-6 md:px-12.5 max-w-360 mx-auto", id: "contact", children: [
    /* @__PURE__ */ jsxs("header", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-heading text-neutral-12 text-4xl font-bold mb-3", children: "Get In Touch" }),
      /* @__PURE__ */ jsx("p", { className: "text-neutral-11 text-[15px] leading-[26px] text-center max-w-125 mx-auto", children: "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision." })
    ] }),
    /* @__PURE__ */ jsxs("nav", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsx(
        ContactLink,
        {
          icon: /* @__PURE__ */ jsx(Mail, { className: "w-6 h-6" }),
          text: "doharsiregar10@gmail.com",
          href: "mailto:doharsiregar10@gmail.com"
        }
      ),
      /* @__PURE__ */ jsx(
        ContactLink,
        {
          icon: /* @__PURE__ */ jsx(Linkedin, { className: "w-6 h-6" }),
          text: "linkedin.com/in/dohar-siregar",
          href: "https://www.linkedin.com/in/dohar-siregar/",
          external: true
        }
      ),
      /* @__PURE__ */ jsx(
        ContactLink,
        {
          icon: /* @__PURE__ */ jsx(Github, { className: "w-6 h-6" }),
          text: "github.com/DoharDNR",
          href: "https://github.com/DoharDNR",
          external: true
        }
      )
    ] })
  ] });
}
function ContactLink({
  icon: icon2,
  text,
  href,
  external = false
}) {
  return /* @__PURE__ */ jsxs(
    "a",
    {
      href,
      ...external ? { target: "_blank", rel: "noopener noreferrer" } : {},
      className: "flex items-center justify-center gap-3 py-5 px-6 bg-neutral-2 rounded-[8px] border border-neutral-6 hover:bg-neutral-3 transition-all duration-200",
      children: [
        /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 text-accent-9", children: icon2 }),
        /* @__PURE__ */ jsx("span", { className: "font-subheading text-accent-11 font-medium", children: text })
      ]
    }
  );
}
function meta$3({}) {
  return [{
    title: "Dohar Siregar - Full-Stack Web Developer & Designer"
  }, {
    name: "description",
    content: "Portfolio of Dohar Siregar, a passionate full-stack web developer and designer creating elegant digital experiences."
  }];
}
const home = UNSAFE_withComponentProps(function Home() {
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen",
    children: [/* @__PURE__ */ jsx(AboutSection, {}), /* @__PURE__ */ jsx(ContactSection, {})]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta: meta$3
}, Symbol.toStringTag, { value: "Module" }));
const projectHistoryYears = [
  {
    year: 2026,
    repositories: [
      {
        repository: {
          id: "repo-ai-chatbot",
          owner: "example-user",
          name: "ai-chatbot",
          url: "https://github.com/example-user/ai-chatbot",
          title: "AI Chatbot Assistant",
          description: "An intelligent conversational interface powered by large language models with context awareness and memory.",
          technologies: ["Python", "FastAPI", "OpenAI", "React", "WebSocket"],
          featured: true,
          iconType: "auth",
          displayOrder: 1
        },
        activity: {
          repositoryId: "repo-ai-chatbot",
          year: 2026,
          commitCount: 18,
          firstCommitDate: "2026-01-05",
          lastCommitDate: "2026-09-20"
        }
      }
    ]
  },
  {
    year: 2025,
    repositories: [
      {
        repository: {
          id: "repo-ecommerce-platform",
          owner: "example-user",
          name: "ecommerce-platform",
          url: "https://github.com/example-user/ecommerce-platform",
          title: "E-commerce Platform",
          description: "A full-stack storefront with product management, shopping cart, and checkout workflows.",
          technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
          featured: true,
          iconType: "e-commerce",
          displayOrder: 1
        },
        activity: {
          repositoryId: "repo-ecommerce-platform",
          year: 2025,
          commitCount: 12,
          firstCommitDate: "2025-03-15",
          lastCommitDate: "2025-04-28"
        }
      },
      {
        repository: {
          id: "repo-task-management-app",
          owner: "example-user",
          name: "task-management-app",
          url: "https://github.com/example-user/task-management-app",
          title: "Task Management App",
          description: "A collaborative workspace for organizing tasks, deadlines, and team progress.",
          technologies: ["React", "TypeScript", "Node.js", "MongoDB"],
          featured: false,
          iconType: "task-management",
          displayOrder: 2
        },
        activity: {
          repositoryId: "repo-task-management-app",
          year: 2025,
          commitCount: 8,
          firstCommitDate: "2025-01-10",
          lastCommitDate: "2025-04-20"
        }
      },
      {
        repository: {
          id: "repo-blog-platform",
          owner: "example-user",
          name: "blog-platform",
          url: "https://github.com/example-user/blog-platform",
          title: "Blog Platform",
          description: "A content management system for publishing articles with Markdown support and tagging.",
          technologies: ["Astro", "TypeScript", "Tailwind CSS", "SQLite"],
          featured: false,
          iconType: "blog",
          displayOrder: 3
        },
        activity: {
          repositoryId: "repo-blog-platform",
          year: 2025,
          commitCount: 1,
          firstCommitDate: "2025-05-02",
          lastCommitDate: "2025-05-02"
          // same date — spec §11.2: prefer displaying date once
        }
      }
    ]
  },
  {
    year: 2024,
    repositories: [
      {
        repository: {
          id: "repo-auth-service",
          owner: "example-user",
          name: "auth-service",
          url: "https://github.com/example-user/auth-service",
          title: "Authentication Service",
          description: "An OAuth 2.0-compatible identity provider with token rotation and session management.",
          technologies: ["Go", "PostgreSQL", "Redis", "Docker"],
          featured: true,
          iconType: "auth",
          displayOrder: 1
        },
        activity: {
          repositoryId: "repo-auth-service",
          year: 2024,
          commitCount: 24,
          firstCommitDate: "2024-02-14",
          lastCommitDate: "2024-11-30"
        }
      },
      {
        repository: {
          id: "repo-finance-mobile-app",
          owner: "example-user",
          name: "finance-mobile-app",
          url: "https://github.com/example-user/finance-mobile-app",
          title: "Personal Finance Mobile App",
          description: "A cross-platform React Native app for budgeting, expense tracking, and financial insights.",
          technologies: ["React Native", "TypeScript", "Expo", "Supabase"],
          featured: false,
          iconType: "mobile",
          displayOrder: 2
        },
        activity: {
          repositoryId: "repo-finance-mobile-app",
          year: 2024,
          commitCount: 5,
          firstCommitDate: "2024-06-01",
          lastCommitDate: "2024-06-15"
        }
      },
      {
        repository: {
          id: "repo-weather-dashboard",
          owner: "example-user",
          name: "weather-dashboard",
          url: "https://github.com/example-user/weather-dashboard",
          title: "Weather Dashboard",
          description: "A responsive weather forecasting application with real-time data visualization and location search.",
          technologies: ["Vue.js", "TypeScript", "Chart.js", "OpenWeather API"],
          featured: false,
          iconType: "task-management",
          displayOrder: 3
        },
        activity: {
          repositoryId: "repo-weather-dashboard",
          year: 2024,
          commitCount: 15,
          firstCommitDate: "2024-03-10",
          lastCommitDate: "2024-08-22"
        }
      }
    ]
  }
];
function meta$2({}) {
  return [{
    title: "Projects & Contributions - Dohar Siregar"
  }, {
    name: "description",
    content: "A year-by-year overview of repositories I've worked on, showing commit history and technologies."
  }];
}
function getTheme(useSpecTheme, isLight) {
  if (useSpecTheme) {
    if (isLight) {
      return {
        navbar: {
          bg: "bg-white/95 backdrop-blur-sm",
          border: "border-slate-200",
          text: "text-slate-900"
        },
        page: {
          bg: "bg-slate-50"
        },
        eyebrow: "text-indigo-600",
        heading: "text-slate-900",
        headingAccent: "text-indigo-600",
        body: "text-slate-600",
        card: {
          bg: "bg-white",
          border: "border-slate-200",
          borderHover: "hover:border-slate-300"
        },
        badge: {
          bg: "bg-indigo-50",
          border: "border-indigo-200",
          text: "text-indigo-700"
        },
        tech: {
          bg: "bg-slate-100",
          text: "text-slate-700"
        },
        meta: {
          text: "text-slate-600",
          border: "border-slate-200",
          mutedText: "text-slate-500"
        },
        link: {
          text: "text-indigo-600",
          textHover: "hover:text-indigo-700"
        },
        footer: {
          border: "border-slate-200",
          text: "text-slate-500"
        },
        timeline: {
          dot: "bg-indigo-500",
          dotRing: "ring-indigo-500/20",
          line: "bg-slate-200"
        }
      };
    } else {
      return {
        navbar: {
          bg: "bg-slate-900/95 backdrop-blur-sm",
          border: "border-slate-800",
          text: "text-white"
        },
        page: {
          bg: "bg-[#020617]"
        },
        eyebrow: "text-indigo-300",
        heading: "text-white",
        headingAccent: "text-indigo-400",
        body: "text-slate-400",
        card: {
          bg: "bg-slate-900/60",
          border: "border-slate-800",
          borderHover: "hover:border-slate-700"
        },
        badge: {
          bg: "bg-indigo-400/10",
          border: "border-indigo-400/20",
          text: "text-indigo-300"
        },
        tech: {
          bg: "bg-slate-800",
          text: "text-slate-300"
        },
        meta: {
          text: "text-slate-400",
          border: "border-slate-800",
          mutedText: "text-slate-500"
        },
        link: {
          text: "text-indigo-300",
          textHover: "hover:text-indigo-200"
        },
        footer: {
          border: "border-slate-800",
          text: "text-slate-500"
        },
        timeline: {
          dot: "bg-indigo-400",
          dotRing: "ring-indigo-400/15",
          line: "bg-slate-800"
        }
      };
    }
  } else {
    return {
      navbar: {
        bg: "bg-neutral-1",
        border: "border-neutral-7",
        text: "text-neutral-12"
      },
      page: {
        bg: "bg-page"
      },
      eyebrow: "text-accent-11",
      heading: "text-neutral-12",
      headingAccent: "text-accent-9",
      body: "text-neutral-11",
      card: {
        bg: "bg-neutral-2",
        border: "border-neutral-5",
        borderHover: "hover:border-neutral-6"
      },
      badge: {
        bg: "bg-accent-3",
        border: "border-accent-6",
        text: "text-accent-11"
      },
      tech: {
        bg: "bg-neutral-4",
        text: "text-neutral-11"
      },
      meta: {
        text: "text-neutral-10",
        border: "border-neutral-5",
        mutedText: "text-neutral-9"
      },
      link: {
        text: "text-accent-11",
        textHover: "hover:text-accent-9"
      },
      footer: {
        border: "border-neutral-6",
        text: "text-neutral-9"
      },
      timeline: {
        dot: "bg-accent-9",
        dotRing: "ring-accent-9/15",
        line: "bg-neutral-6"
      }
    };
  }
}
function ProjectIcon({
  type,
  isLight
}) {
  const icon2 = /* @__PURE__ */ jsx("svg", {
    className: "size-6 shrink-0",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    children: /* @__PURE__ */ jsx("path", {
      d: "M12 6v6l4 2"
    })
  });
  const baseClass = "flex size-12 shrink-0 items-center justify-center rounded-xl";
  const lightDark = (light, dark) => isLight ? light : dark;
  switch (type) {
    case "e-commerce":
      return /* @__PURE__ */ jsx("span", {
        className: `${baseClass} ${lightDark("bg-indigo-100 text-indigo-700", "bg-indigo-500/15 text-indigo-300")}`,
        children: icon2
      });
    case "task-management":
      return /* @__PURE__ */ jsx("span", {
        className: `${baseClass} ${lightDark("bg-emerald-100 text-emerald-700", "bg-emerald-500/15 text-emerald-300")}`,
        children: icon2
      });
    case "blog":
      return /* @__PURE__ */ jsx("span", {
        className: `${baseClass} ${lightDark("bg-fuchsia-100 text-fuchsia-700", "bg-fuchsia-500/15 text-fuchsia-300")}`,
        children: icon2
      });
    case "auth":
      return /* @__PURE__ */ jsx("span", {
        className: `${baseClass} ${lightDark("bg-sky-100 text-sky-700", "bg-sky-500/15 text-sky-300")}`,
        children: icon2
      });
    case "mobile":
      return /* @__PURE__ */ jsx("span", {
        className: `${baseClass} ${lightDark("bg-amber-100 text-amber-700", "bg-amber-500/15 text-amber-300")}`,
        children: icon2
      });
    default:
      return /* @__PURE__ */ jsx("span", {
        className: `${baseClass} ${lightDark("bg-slate-100 text-slate-700", "bg-slate-500/15 text-slate-300")}`,
        children: icon2
      });
  }
}
const projects$1 = UNSAFE_withComponentProps(function Projects() {
  const [useSpecTheme, setUseSpecTheme] = useState(true);
  const {
    isLight
  } = useColorScheme();
  const theme = getTheme(useSpecTheme, isLight);
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx("nav", {
      className: `sticky top-0 z-10 border-b ${theme.navbar.bg} ${theme.navbar.border}`,
      children: /* @__PURE__ */ jsxs("div", {
        className: "mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "flex items-center gap-3",
          children: [/* @__PURE__ */ jsxs(Link, {
            to: "/",
            className: `inline-flex items-center gap-1 text-xs font-medium transition ${useSpecTheme ? "text-slate-500 hover:text-slate-300" : "text-neutral-9 hover:text-neutral-12"}`,
            "aria-label": "Back to home",
            children: [/* @__PURE__ */ jsx(ArrowLeft, {
              size: 14,
              "aria-hidden": "true"
            }), "Home"]
          }), /* @__PURE__ */ jsx("h2", {
            className: `text-sm font-semibold ${theme.navbar.text}`,
            children: "GitHub History"
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex items-center gap-3",
          children: [/* @__PURE__ */ jsxs("button", {
            type: "button",
            onClick: () => setUseSpecTheme((v) => !v),
            className: `inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition ${isLight ? "border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200" : useSpecTheme ? "border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-800" : "border-neutral-5 bg-neutral-2 text-neutral-11 hover:bg-neutral-3"}`,
            "aria-label": "Toggle theme palette",
            children: [/* @__PURE__ */ jsx(Palette, {
              size: 14,
              "aria-hidden": "true"
            }), useSpecTheme ? "Spec" : "Project"]
          }), /* @__PURE__ */ jsx(ColorSchemeToggle, {})]
        })]
      })
    }), /* @__PURE__ */ jsxs("main", {
      className: `mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 lg:py-16 ${theme.page.bg}`,
      children: [/* @__PURE__ */ jsxs("div", {
        className: "mb-12 max-w-3xl",
        children: [/* @__PURE__ */ jsx("p", {
          className: `mb-3 text-xs font-semibold uppercase tracking-[0.22em] ${theme.eyebrow}`,
          children: "MY GITHUB JOURNEY"
        }), /* @__PURE__ */ jsxs("h1", {
          className: `text-3xl font-semibold tracking-tight sm:text-4xl ${theme.heading}`,
          children: ["Projects & ", /* @__PURE__ */ jsx("span", {
            className: theme.headingAccent,
            children: "Contributions"
          })]
        }), /* @__PURE__ */ jsx("p", {
          className: `mt-4 max-w-2xl text-sm leading-6 sm:text-base ${theme.body}`,
          children: "A year-by-year overview of repositories I've worked on, showing the first and last commit dates within each year."
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "space-y-12",
        children: projectHistoryYears.map((yearGroup, yearIndex) => {
          const repoCount = yearGroup.repositories.length;
          const isNewestYear = yearIndex === 0;
          return /* @__PURE__ */ jsx("section", {
            className: "relative",
            children: /* @__PURE__ */ jsxs("div", {
              className: "grid grid-cols-1 gap-5 md:grid-cols-[130px_minmax(0,1fr)] md:gap-8",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "relative h-full",
                children: [/* @__PURE__ */ jsxs("div", {
                  className: "relative hidden h-full md:block",
                  children: [/* @__PURE__ */ jsxs("div", {
                    className: "relative flex items-center",
                    children: [/* @__PURE__ */ jsx("span", {
                      className: `flex size-3 shrink-0 rounded-full ring-4 ${isNewestYear ? `${theme.timeline.dot} ${theme.timeline.dotRing}` : `${isLight ? "bg-slate-400" : "bg-slate-500"} ring-slate-500/15`}`
                    }), /* @__PURE__ */ jsxs("div", {
                      className: "ml-5",
                      children: [/* @__PURE__ */ jsx("h2", {
                        className: `text-2xl font-semibold tracking-tight ${theme.heading}`,
                        children: yearGroup.year
                      }), /* @__PURE__ */ jsx("p", {
                        className: `mt-1 text-sm ${theme.body}`,
                        children: repoCount === 1 ? "1 repository" : `${repoCount} repositories`
                      })]
                    })]
                  }), /* @__PURE__ */ jsx("div", {
                    className: `absolute left-[5px] top-7 bottom-0 w-px ${theme.timeline.line}`,
                    style: {
                      height: "calc(100% + 1rem)"
                    }
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  className: "md:hidden",
                  children: [/* @__PURE__ */ jsx("h2", {
                    className: `text-2xl font-semibold tracking-tight ${theme.heading}`,
                    children: yearGroup.year
                  }), /* @__PURE__ */ jsx("p", {
                    className: `mt-1 text-sm ${theme.body}`,
                    children: repoCount === 1 ? "1 repository" : `${repoCount} repositories`
                  })]
                })]
              }), /* @__PURE__ */ jsx("div", {
                className: "space-y-4",
                children: yearGroup.repositories.sort((a, b) => (a.repository.displayOrder ?? 99) - (b.repository.displayOrder ?? 99)).map((entry2) => /* @__PURE__ */ jsx("article", {
                  className: `rounded-2xl border p-5 transition sm:p-6 ${theme.card.bg} ${theme.card.border} ${theme.card.borderHover}`,
                  children: /* @__PURE__ */ jsxs("div", {
                    className: "flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between",
                    children: [/* @__PURE__ */ jsxs("div", {
                      className: "flex min-w-0 gap-4",
                      children: [/* @__PURE__ */ jsx(ProjectIcon, {
                        type: entry2.repository.iconType,
                        isLight
                      }), /* @__PURE__ */ jsxs("div", {
                        className: "flex flex-col",
                        children: [/* @__PURE__ */ jsxs("div", {
                          className: "flex items-center gap-2",
                          children: [/* @__PURE__ */ jsx("h3", {
                            className: `text-base font-semibold ${theme.heading}`,
                            children: entry2.repository.title
                          }), entry2.repository.featured && /* @__PURE__ */ jsx("span", {
                            className: `rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${theme.badge.bg} ${theme.badge.border} ${theme.badge.text}`,
                            "aria-label": "Featured project",
                            children: "Featured"
                          })]
                        }), /* @__PURE__ */ jsx("p", {
                          className: `mt-1 max-w-2xl text-sm leading-6 ${theme.body}`,
                          children: entry2.repository.description
                        }), /* @__PURE__ */ jsx("div", {
                          className: "mt-3 flex flex-wrap gap-2",
                          children: entry2.repository.technologies.map((tech) => /* @__PURE__ */ jsx("span", {
                            className: `rounded-full px-2.5 py-1 text-xs ${theme.tech.bg} ${theme.tech.text}`,
                            children: tech
                          }, tech))
                        })]
                      })]
                    }), /* @__PURE__ */ jsxs("div", {
                      className: `flex shrink-0 flex-col gap-3 border-t pt-4 text-sm lg:min-w-56 lg:border-0 lg:pt-1 ${theme.meta.border} ${theme.meta.text}`,
                      children: [/* @__PURE__ */ jsxs("div", {
                        className: "flex items-center gap-2",
                        children: [/* @__PURE__ */ jsx(GitCommit, {
                          size: 14,
                          "aria-hidden": "true"
                        }), /* @__PURE__ */ jsx("span", {
                          children: entry2.activity.commitCount === 1 ? `1 commit in ${entry2.activity.year}` : `${entry2.activity.commitCount} commits in ${entry2.activity.year}`
                        })]
                      }), /* @__PURE__ */ jsxs("div", {
                        className: "flex items-center gap-2",
                        children: [/* @__PURE__ */ jsx(Calendar, {
                          size: 14,
                          "aria-hidden": "true"
                        }), /* @__PURE__ */ jsxs("span", {
                          children: [new Date(entry2.activity.firstCommitDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric"
                          }), entry2.activity.firstCommitDate !== entry2.activity.lastCommitDate && /* @__PURE__ */ jsxs(Fragment, {
                            children: [" → ", /* @__PURE__ */ jsx("span", {
                              className: theme.meta.mutedText,
                              children: new Date(entry2.activity.lastCommitDate).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric"
                              })
                            })]
                          })]
                        })]
                      }), /* @__PURE__ */ jsxs("a", {
                        href: entry2.repository.url,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: `inline-flex w-fit items-center gap-1 text-xs font-medium transition ${theme.link.text} ${theme.link.textHover}`,
                        children: ["View repository ", /* @__PURE__ */ jsx(ExternalLink, {
                          size: 12,
                          "aria-hidden": "true"
                        })]
                      })]
                    })]
                  })
                }, entry2.repository.id))
              })]
            })
          }, yearGroup.year);
        })
      }), /* @__PURE__ */ jsx("footer", {
        className: `mt-16 border-t pt-6 ${theme.footer.border}`,
        children: /* @__PURE__ */ jsx("p", {
          className: `text-xs ${theme.footer.text}`,
          children: "Sample content only. Replace project details, commit dates, counts, technologies, and links with verified GitHub data."
        })
      })]
    })]
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: projects$1,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
const videobelajar1 = "/assets/videobelajar1-CL3ImK_e.webp";
const videobelajar2 = "/assets/videobelajar2-Bd6_iCjG.webp";
const videobelajar3 = "/assets/videobelajar3-GgxRbnxP.webp";
const videobelajar4 = "/assets/videobelajar4-mBXrUtd9.webp";
const videobelajar5 = "/assets/videobelajar5-D0JM61zy.webp";
const videobelajar6 = "/assets/videobelajar6-DDAtQ8UH.webp";
const videobelajar7 = "/assets/videobelajar7-jv0xqLaO.webp";
const projects = [
  {
    id: "1",
    slug: "video-belajar-platform",
    title: "Video Belajar Platform",
    summary: "A full-stack e-commerce solution with real-time inventory management and seamless checkout experience.",
    description: "Developed a comprehensive online course platform designed to deliver an engaging and seamless learning experience. The platform features intuitive navigation, advanced course search and filtering capabilities, and a streamlined enrollment process. It efficiently manages thousands of learning materials across multiple categories, including video lessons, modules, and resources, while maintaining exceptional performance, scalability, and user experience.",
    category: "Web Development",
    year: "2025",
    role: "Full-Stack Developer",
    technologies: ["React", "Node.js", "Express", "Mysql", "Firebase", "Tailwind CSS"],
    images: {
      thumbnail: videobelajar1,
      gallery: [videobelajar2, videobelajar3, videobelajar4, videobelajar5, videobelajar6, videobelajar7]
    },
    challenges: "The main challenge was optimizing database queries to support real-time access control, course progress tracking, and content delivery for a large number of concurrent users while ensuring data consistency. Additionally, implementing a scalable architecture capable of handling traffic spikes during course launches, live sessions, and promotional campaigns required careful system design, performance optimization, and load testing.",
    outcomes: "Successfully launched the platform with 99.9% uptime, processing over 100 transactions in the first month. The intuitive interface resulted in a 40% reduction in cart abandonment rates compared to the previous system.",
    liveDemo: "https://reactjs-videobelajar.vercel.app/"
  }
];
function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug);
}
const container = "_container_9njrw_1";
const header = "_header_9njrw_7";
const headerContent = "_headerContent_9njrw_13";
const backLink = "_backLink_9njrw_18";
const backIcon = "_backIcon_9njrw_34";
const category = "_category_9njrw_39";
const title = "_title_9njrw_49";
const summary = "_summary_9njrw_56";
const meta$1 = "_meta_9njrw_64";
const metaItem = "_metaItem_9njrw_70";
const metaLabel = "_metaLabel_9njrw_76";
const metaValue = "_metaValue_9njrw_84";
const technologies = "_technologies_9njrw_90";
const techBadge = "_techBadge_9njrw_96";
const main = "_main_9njrw_106";
const gallery = "_gallery_9njrw_113";
const galleryGrid = "_galleryGrid_9njrw_117";
const galleryImage = "_galleryImage_9njrw_123";
const section = "_section_9njrw_146";
const sectionTitle = "_sectionTitle_9njrw_150";
const sectionContent = "_sectionContent_9njrw_156";
const navigation = "_navigation_9njrw_172";
const styles = {
  container,
  header,
  headerContent,
  backLink,
  backIcon,
  category,
  title,
  summary,
  meta: meta$1,
  metaItem,
  metaLabel,
  metaValue,
  technologies,
  techBadge,
  main,
  gallery,
  galleryGrid,
  galleryImage,
  section,
  sectionTitle,
  sectionContent,
  navigation
};
function meta({
  params
}) {
  const project = getProjectBySlug(params.slug);
  if (!project) {
    return [{
      title: "Project Not Found"
    }];
  }
  return [{
    title: `${project.title} - Alex Morgan Portfolio`
  }, {
    name: "description",
    content: project.summary
  }];
}
const projects_$slug = UNSAFE_withComponentProps(function ProjectDetail() {
  const params = useParams();
  const project = getProjectBySlug(params.slug);
  if (!project) {
    return /* @__PURE__ */ jsx("div", {
      className: styles.container,
      children: /* @__PURE__ */ jsx("div", {
        className: styles.header,
        children: /* @__PURE__ */ jsxs("div", {
          className: styles.headerContent,
          children: [/* @__PURE__ */ jsxs(Link, {
            to: "/projects",
            className: styles.backLink,
            children: [/* @__PURE__ */ jsx(ArrowLeft, {
              className: styles.backIcon
            }), "Back to Projects"]
          }), /* @__PURE__ */ jsx("h1", {
            className: styles.title,
            children: "Project Not Found"
          }), /* @__PURE__ */ jsx("p", {
            className: styles.summary,
            children: "The project you're looking for doesn't exist or has been removed."
          })]
        })
      })
    });
  }
  return /* @__PURE__ */ jsxs("div", {
    className: styles.container,
    children: [/* @__PURE__ */ jsx("header", {
      className: styles.header,
      children: /* @__PURE__ */ jsxs("div", {
        className: styles.headerContent,
        children: [/* @__PURE__ */ jsxs(Link, {
          to: "/projects",
          className: styles.backLink,
          children: [/* @__PURE__ */ jsx(ArrowLeft, {
            className: styles.backIcon
          }), "Back to Projects"]
        }), /* @__PURE__ */ jsx("span", {
          className: styles.category,
          children: project.category
        }), /* @__PURE__ */ jsx("h1", {
          className: styles.title,
          children: project.title
        }), /* @__PURE__ */ jsx("p", {
          className: styles.summary,
          children: project.summary
        }), /* @__PURE__ */ jsxs("div", {
          className: styles.meta,
          children: [/* @__PURE__ */ jsxs("div", {
            className: styles.metaItem,
            children: [/* @__PURE__ */ jsx("span", {
              className: styles.metaLabel,
              children: "Year"
            }), /* @__PURE__ */ jsx("span", {
              className: styles.metaValue,
              children: project.year
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: styles.metaItem,
            children: [/* @__PURE__ */ jsx("span", {
              className: styles.metaLabel,
              children: "Role"
            }), /* @__PURE__ */ jsx("span", {
              className: styles.metaValue,
              children: project.role
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: styles.metaItem,
            children: [/* @__PURE__ */ jsx("span", {
              className: styles.metaLabel,
              children: "Technologies"
            }), /* @__PURE__ */ jsx("div", {
              className: styles.technologies,
              children: project.technologies.map((tech) => /* @__PURE__ */ jsx("span", {
                className: styles.techBadge,
                children: tech
              }, tech))
            })]
          })]
        })]
      })
    }), /* @__PURE__ */ jsxs("main", {
      className: styles.main,
      children: [/* @__PURE__ */ jsx("section", {
        className: styles.gallery,
        children: /* @__PURE__ */ jsx("div", {
          className: styles.galleryGrid,
          children: project.images.gallery.map((image, index) => /* @__PURE__ */ jsx("img", {
            src: image,
            alt: `${project.title} screenshot ${index + 1}`,
            className: styles.galleryImage
          }, index))
        })
      }), /* @__PURE__ */ jsxs("section", {
        className: styles.section,
        children: [/* @__PURE__ */ jsx("h2", {
          className: styles.sectionTitle,
          children: "Project Overview"
        }), /* @__PURE__ */ jsx("div", {
          className: styles.sectionContent,
          children: /* @__PURE__ */ jsx("p", {
            children: project.description
          })
        })]
      }), /* @__PURE__ */ jsxs("section", {
        className: styles.section,
        children: [/* @__PURE__ */ jsx("h2", {
          className: styles.sectionTitle,
          children: "Challenges & Solutions"
        }), /* @__PURE__ */ jsx("div", {
          className: styles.sectionContent,
          children: /* @__PURE__ */ jsx("p", {
            children: project.challenges
          })
        })]
      }), /* @__PURE__ */ jsxs("section", {
        className: styles.section,
        children: [/* @__PURE__ */ jsx("h2", {
          className: styles.sectionTitle,
          children: "Live Demo"
        }), /* @__PURE__ */ jsx("div", {
          className: styles.sectionContent,
          children: project.liveDemo ? /* @__PURE__ */ jsx(Button, {
            asChild: true,
            size: "lg",
            children: /* @__PURE__ */ jsx("a", {
              href: project.liveDemo,
              target: "_blank",
              rel: "noopener noreferrer",
              children: "Live Demo"
            })
          }) : /* @__PURE__ */ jsx(Button, {
            size: "lg",
            variant: "secondary",
            disabled: true,
            children: "Live Demo"
          })
        })]
      }), /* @__PURE__ */ jsx("nav", {
        className: styles.navigation,
        children: /* @__PURE__ */ jsx(Button, {
          asChild: true,
          size: "lg",
          children: /* @__PURE__ */ jsxs(Link, {
            to: "/projects",
            children: [/* @__PURE__ */ jsx(ArrowLeft, {
              className: styles.backIcon
            }), "View All Projects"]
          })
        })
      })]
    })]
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: projects_$slug,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-DhR9Yz6Z.js", "imports": ["/assets/chunk-EPOLDU6W-CTaaABDn.js", "/assets/index-BZ5Eud5I.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-D0Yv-aq5.js", "imports": ["/assets/chunk-EPOLDU6W-CTaaABDn.js", "/assets/index-BZ5Eud5I.js", "/assets/react-B7d0Lpy4.js", "/assets/index-CAvnJMg2.js"], "css": ["/assets/root-CqXzutpL.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-CkmD8FUn.js", "imports": ["/assets/chunk-EPOLDU6W-CTaaABDn.js", "/assets/color-scheme-toggle-Dst7Bi8U.js", "/assets/index-CAvnJMg2.js", "/assets/react-B7d0Lpy4.js", "/assets/index-BZ5Eud5I.js", "/assets/button-B2dumKwo.js"], "css": ["/assets/color-scheme-toggle-Cd_sofT0.css", "/assets/button-C4QZbAR-.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/projects": { "id": "routes/projects", "parentId": "root", "path": "projects", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/projects--au76khs.js", "imports": ["/assets/chunk-EPOLDU6W-CTaaABDn.js", "/assets/color-scheme-toggle-Dst7Bi8U.js", "/assets/react-B7d0Lpy4.js", "/assets/arrow-left-kGEn6w6s.js", "/assets/index-CAvnJMg2.js", "/assets/button-B2dumKwo.js", "/assets/index-BZ5Eud5I.js"], "css": ["/assets/color-scheme-toggle-Cd_sofT0.css", "/assets/button-C4QZbAR-.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/projects.$slug": { "id": "routes/projects.$slug", "parentId": "root", "path": "projects/:slug", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/projects._slug-CAINQnVz.js", "imports": ["/assets/chunk-EPOLDU6W-CTaaABDn.js", "/assets/button-B2dumKwo.js", "/assets/arrow-left-kGEn6w6s.js", "/assets/index-CAvnJMg2.js"], "css": ["/assets/projects-BN5DdS2-.css", "/assets/button-C4QZbAR-.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-fef9f229.js", "version": "fef9f229", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_optimizeDeps": true, "unstable_subResourceIntegrity": false, "unstable_trailingSlashAwareDataRequests": false, "v8_middleware": false, "v8_splitRouteModules": false, "v8_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/projects": {
    id: "routes/projects",
    parentId: "root",
    path: "projects",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/projects.$slug": {
    id: "routes/projects.$slug",
    parentId: "root",
    path: "projects/:slug",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  }
};
const allowedActionOrigins = false;
export {
  allowedActionOrigins,
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};

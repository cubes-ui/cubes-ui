# Cubes UI

Modern, reusable, and **developer-friendly UI components** powered by **Tailwind CSS** — perfect for building scalable design systems and accelerating development.

<a href="https://github.com/cubes-ui/cubes-ui">read documentation</a>

<p align="center">
  <img src="https://s6.uupload.ir/files/04fa27e6-9ace-471e-942b-04cf8d93db3d-photoroom(1)_31tw.png" 
       alt="Cubes UI Logo" 
       style="width: 40%; max-width: 600px; display: block; margin: 0 auto;" />
</p>

[![npm downloads](https://img.shields.io/npm/dm/cubes-ui?style=flat&color=blue)](https://www.npmjs.com/package/cubes-ui)
[![npm version](https://img.shields.io/npm/v/cubes-ui?style=flat&color=green)](https://www.npmjs.com/package/cubes-ui)
[![bundle size](https://img.shields.io/bundlephobia/minzip/cubes-ui?style=flat&color=orange)](https://bundlephobia.com/package/cubes-ui)
[![license](https://img.shields.io/github/license/cubes-ui/cubes-ui?style=flat&color=yellow)](https://github.com/cubes-ui/cubes-ui/blob/master/LICENSE)

---

## 🚀 Installation

```bash
npm install cubes-ui
```

---

## ⚙️ Setup

```bash
npx cubes-ui-init
```

This command will:

- Install required Tailwind packages
- Configure Vite with Tailwind plugin
- Update your CSS with:

```css
@import "tailwindcss";
@import "cubes-ui/index.css";
@source "../node_modules/cubes-ui/dist/index.css";
```

---

## 🧪 Usage

```tsx
import { Button } from "cubes-ui";

export default function Example() {
  return <Button variant="default" size="lg">Click me</Button>;
}
```

---

## 🔔 Toast System (powered by Sonner)

Cubes UI uses [Sonner](https://sonner.emilkowal.dev) for elegant toast notifications:

```tsx
import { toast } from "cubes-ui";

toast.success("Saved!");
toast.error("Oops...");
toast.custom(<div>Custom JSX</div>);
```

- Multiple positions (`top-left`, `bottom-center`, etc.)
- Pause on hover
- Light/Dark theme support
- Dynamic content
- Full control via options:

```tsx
toast.success("Updated!", { position: "top-center" });
```

---

## 🔌 Integrations

### TanStack Query

```tsx
import { Spinner, useQuery } from "cubes-ui";
const { data, isLoading } = useQuery({ endpoint: "users" });
```

### React Hook Form

```tsx
import { Input, Button, useForm } from "cubes-ui";
```

### Zod Validation

```tsx
import { Validator, Input, FormError, useForm } from "cubes-ui";
```

---

## 🧱 Built-in Hooks

Cubes UI provides fully-typed and scalable hooks:

### 🔩 Core Utilities

| Hook               | Description                                                |
|--------------------|------------------------------------------------------------|
| `useDebounce`      | Debounces value or function                                |
| `useThrottle`      | Throttles updates                                          |
| `useClickOutside`  | Detects outside clicks                                     |
| `useMediaQuery`    | Tracks screen breakpoints                                  |
| `useLocalStorage`  | LocalStorage abstraction                                   |
| `useSessionStorage`| SessionStorage abstraction                                 |
| `useIndexedDB`     | Async IndexedDB state                                      |
| `useCacheStorage`  | Caches API responses locally                               |

### 🌐 API & Request Hooks

| Hook          | Description                                                              |
|---------------|--------------------------------------------------------------------------|
| `useRequest`  | Unified fetch via TanStack Query                                         |
| `useMutation` | Typed mutations with endpoint/token                                      |
| `useQuery`    | Enhanced query with loader and endpoint                                  |

### ⚡️ Realtime & WebSocket Hooks

| Hook         | Description                                                              |
|--------------|--------------------------------------------------------------------------|
| `useSocket`   | WebSocket integration with token and reconnect support                  |

### 🎭 UI/UX Hooks

| Hook               | Description                                             |
|--------------------|---------------------------------------------------------|
| `useLazyTransition`| Improved transitions via `useTransition` wrapper        |
| `useIsFirstRender` | Detect initial render                                   |
| `useHoverIntent`   | Intent-based hover detection                            |
| `useMountEffect`   | Run effect only once on mount                           |

### 🧪 Developer Experience

| Hook              | Description                                                  |
|-------------------|--------------------------------------------------------------|
| `useTraceRender`  | Logs re-renders for performance insights                     |

---

## ⚙️ Context with CubesProvider

```tsx
<CubesProvider
  apiUrl="https://api.example.com"
  getToken={() => localStorage.getItem("token")}
  onUnauthorized={() => redirectTo("/login")}
>
  <App />
</CubesProvider>
```

Hooks like `useRequest` and `useSocket` automatically access this context.

---

## 🧠 Tips & Tricks

- **Tailwind-safe imports** using `@source`
- **Custom themes** via `@layer`
- **Dark mode** support out-of-the-box

---

## 🔗 Resources

- 📖 [Docs](https://github.com/cubes-ui/cubes-ui)
- 📦 [npm](https://www.npmjs.com/package/cubes-ui)
- 🧪 [Demo](https://codesandbox.io/s/cubes-ui-demo)
- 📊 [Bundle](https://bundlephobia.com/package/cubes-ui)

---

## ❤️ Built for developers who love clean UI

> Cubes UI helps you move faster with consistent design, powerful hooks, and blazing-fast integration.  
Built with love and Tailwind.

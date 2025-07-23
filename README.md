<p align="center">
  <img src="https://s6.uupload.ir/files/04fa27e6-9ace-471e-942b-04cf8d93db3d-photoroom(1)_31tw.png" 
       alt="Cubes UI Logo" 
       style="width: 40%; max-width: 600px; display: block; margin: 0 auto;" />
</p>

# Cubes UI

Modern, reusable, and **developer-friendly UI components** powered by **Tailwind CSS** — perfect for building scalable design systems and accelerating development.

<a href="https://github.com/cubes-ui/cubes-ui">read documentation</a>

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

After installing, run the built-in initializer:

```bash
npx cubes-ui-init
```

This command will:

- Install required Tailwind packages (`tailwindcss`, `@tailwindcss/vite`)
- Configure **Vite** to use the Tailwind plugin
- Generate or update your `src/index.css` with the following:

```css
@import "tailwindcss";
@import "cubes-ui/index.css";
@source "../node_modules/cubes-ui/dist/index.css";
```

This ensures that **Tailwind doesn't purge class names** used in `cubes-ui` and enables full styling support.

---

## 🧪 Usage

Start using components right away:

```tsx
import { Button } from "cubes-ui";

export default function Example() {
  return (
    <Button variant="default" size="lg">
      Click me
    </Button>
  );
}
```

Each component supports:

- `variant`: `"default" | "outline" | "ghost"`
- `size`: `"sm" | "md" | "lg"`
- `className`: for custom utility overrides

---

## 🔌 Integrations

Cubes UI seamlessly integrates with modern React libraries:

### **1. TanStack Query**

Use Cubes UI components with `@tanstack/react-query` for data fetching:

```tsx
import { Spinner, useQuery } from "cubes-ui";

function Users() {
  const { data, isLoading } = useQuery({ endpoint: "users" });

  if (isLoading) return <Spinner />;
  return <div>{data.map((user) => user.name)}</div>;
}
```

---

### **2. React Hook Form**

Easily build forms with `react-hook-form`:

```tsx
import { Input, Button, useForm } from "cubes-ui";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input label="Email" {...register("email")} />
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

---

### **3. Validation**

Cubes UI works with **Zod** and other validation libraries:

```tsx
import { Validator, Input, Button, FormError, useForm } from "cubes-ui";

const schema = {
  email: Validator.email("Invalid email address"),
};
export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<typeof schema>();

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <Input label="Email" {...register("email")} />
      {errors.email && <FormError>{errors.email.message}</FormError>}
      <Button type="submit">Sign up</Button>
    </form>
  );
}
```

---

## 💡 Tips

- **Purge safety**: `@source` ensures Tailwind doesn’t purge class names from `cubes-ui`.
- **Custom themes**: Combine `@theme` and `@layer` to create custom themes.
- **Dark mode ready**: Works out-of-the-box with Tailwind's `dark` mode.

---

## 📚 Components

Cubes UI offers **utility-first, accessible, and customizable components**.  
**More components and hooks are coming soon!**

---

## 🛠 CLI Tool

```bash
cubes-ui-init
```

Use this tool to refresh Tailwind integration, safely append missing imports, or regenerate configuration.

---

## 📝 License

**MIT** — free to use, modify, and share.

---

## ❤️ Created for developers who love clean, efficient UI

Built with love and Tailwind.

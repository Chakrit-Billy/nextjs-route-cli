# 🛠️ next-route-cli

> CLI to generate nested routes with pages and layouts for Next.js App Router

**next-route-cli** is a developer-friendly CLI tool that automates route creation in Next.js App Router projects. It supports nested routes, generates appropriate function names (e.g., `BlogPostPage`), and creates optional files like `layout.tsx`, `loading.tsx`, `error.tsx`, and `not-found.tsx`.

---

## ✨ Features

- ✅ Creates `page.tsx` at each level of a nested route
- ✅ Auto-generates function names like `BlogPage`, `BlogPostPage`, `DashboardUserPage`
- ✅ Optionally adds:
  - `layout.tsx`
  - `loading.tsx`
  - `error.tsx`
  - `not-found.tsx`
- ✅ Works with both `app/` and `src/app/` structures
- ✅ Prevents overwriting existing files

---

## 📦 Setup

1. Copy `createRoute.js` to the **root of your Next.js project**:

```
your-project/
├── app/ or src/app/
├── createRoute.js  ← place here
├── package.json
└── ...
```

2. Make sure you have **Node.js installed**.

---

## 🚀 Usage

Run the script:

```bash
node createRoute.js
```

You’ll be prompted to enter:
- The route path (e.g., `blog/post/comment`)
- Whether to include optional files

---

## 🧪 Example

```bash
📍 Enter route path: blog/post
🧱 Add layout.tsx to last route? (y/n): y
⏳ Add loading.tsx to last route? (y/n): n
❌ Add error.tsx to last route? (y/n): n
🔍 Add not-found.tsx to last route? (y/n): y
```

Output:

```
app/
└── blog/
    ├── page.tsx               // BlogPage
    └── post/
        ├── page.tsx           // BlogPostPage
        ├── layout.tsx
        └── not-found.tsx
```

---

## 🧠 Function Naming

Function names are auto-generated in PascalCase + `Page` based on the full route path:

| Route              | Function Name          |
|-------------------|------------------------|
| `/blog`           | `BlogPage`             |
| `/blog/post`      | `BlogPostPage`         |
| `/dashboard/user` | `DashboardUserPage`    |
| `/blog/post/edit` | `BlogPostEditPage`     |

---

## 💡 Tips

- If `src/app/` exists, it uses that. Otherwise it falls back to `app/`
- If neither exists, it creates `app/` for you
- Layout and error files are only added to the **last route level**

---

## 🔧 Optional: Add NPM Script

Add this to your `package.json` for convenience:

```json
"scripts": {
  "route": "node createRoute.js"
}
```

Now you can run:

```bash
npm run route
```

---



## ❤️ Credits

Made with ☕️ by [Your Name or GitHub Username]

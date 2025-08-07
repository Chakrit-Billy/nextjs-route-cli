const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const ask = (q) =>
  new Promise((resolve) =>
    rl.question(q, (ans) => resolve(ans.trim().toLowerCase()))
  );

// 1. Resolve /app or /src/app
function resolveAppBase() {
  const srcApp = path.join("src", "app");
  const rootApp = "app";
  if (fs.existsSync(srcApp)) return srcApp;
  if (fs.existsSync(rootApp)) return rootApp;
  fs.mkdirSync(rootApp, { recursive: true });
  return rootApp;
}

// 2. Format route into PascalCase (e.g., blog/post → BlogPostPage)
function toPascalCaseFullRoute(routeParts) {
  return (
    routeParts
      .map((part) =>
        part
          .split(/[^a-zA-Z0-9]/)
          .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
          .join("")
      )
      .join("") + "Page"
  );
}

// 3. Create file if it doesn't already exist
function createFile(folder, filename, content) {
  const filePath = path.join(folder, filename);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Created ${path.relative(".", filePath)}`);
  } else {
    console.log(
      `⚠️  Skipped (already exists): ${path.relative(".", filePath)}`
    );
  }
}

// 4. Main logic
(async () => {
  const routeInput = await ask(
    "📍 Enter route path (e.g., blog/post/comment): "
  );
  if (!routeInput) {
    console.error("❌ Route path is required.");
    rl.close();
    return;
  }

  const appBase = resolveAppBase();
  const parts = routeInput.split("/").filter(Boolean);

  // Recursively create page.tsx at every level
  let currentPath = appBase;
  for (let i = 0; i < parts.length; i++) {
    currentPath = path.join(currentPath, parts[i]);
    fs.mkdirSync(currentPath, { recursive: true });

    const functionName = toPascalCaseFullRoute(parts.slice(0, i + 1));
    createFile(
      currentPath,
      "page.tsx",
      `export default function ${functionName}() {\n  return <div>/${parts
        .slice(0, i + 1)
        .join("/")} page</div>;\n}`
    );
  }

  // Ask for optional extras only for the last route
  const layout =
    (await ask("🧱 Add layout.tsx to last route? (y/n): ")) === "y";
  const loading =
    (await ask("⏳ Add loading.tsx to last route? (y/n): ")) === "y";
  const error = (await ask("❌ Add error.tsx to last route? (y/n): ")) === "y";
  const notFound =
    (await ask("🔍 Add not-found.tsx to last route? (y/n): ")) === "y";

  const lastPath = currentPath;

  if (layout) {
    createFile(
      lastPath,
      "layout.tsx",
      `export default function Layout({ children }: { children: React.ReactNode }) {\n  return <>{children}</>;\n}`
    );
  }

  if (loading) {
    createFile(
      lastPath,
      "loading.tsx",
      `export default function Loading() {\n  return <p>Loading...</p>;\n}`
    );
  }

  if (error) {
    createFile(
      lastPath,
      "error.tsx",
      `export default function Error({ error }: { error: Error }) {\n  return <p>Error: {error.message}</p>;\n}`
    );
  }

  if (notFound) {
    createFile(
      lastPath,
      "not-found.tsx",
      `export default function NotFound() {\n  return <p>Not found</p>;\n}`
    );
  }

  console.log("🚀 Nested route created successfully.");
  rl.close();
})();

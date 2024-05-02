# eslint-plugin-css-modules-case

this plugin not allow camelCase in css-modules, inspired by [eslint-plugin-css-modules](https://github.com/atfzl/eslint-plugin-css-modules/)

# Rules

- css-modules-case/no-camel-case
  - --fix ✅

# Usage

.eslintrc.js

```json
 "plugins":["css-modules-case"],
 "rules": {
      "css-modules-case/no-camel-case":[ "error" , {
        "case" :"snake" // 'snake' | 'kebab'
      }
    ]
}

```

# Demo

```tsx
<main className={styles.mainContainer}> foo </main>
```

---

```sh
error  mainContainer case incompatible with snake-case, should be main_container

eslint --fix
 # -> <main className={styles["main_contanier"]}> foo </main>
```

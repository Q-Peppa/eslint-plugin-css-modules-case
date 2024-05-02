# eslint-plugin-css-modules-case

this plugin not allow camelCase in css-modules , inspired by [eslint-plugin-css-modules](https://github.com/atfzl/eslint-plugin-css-modules/)

# Rules

- css-modules-case/no-camel-case
- --fix Yes
  > if you want use kebab or snake

# Usage

.eslintrc.js

```tsx
 "rules": {
      "css-modules-case/no-camel-case":[ "error" , {
        "case" :"snake"
      }
    ]
}

type case = 'snake' | 'kebab'
```

# Demo

```tsx
<main className={styles.mainContainer}> foo </main>
```

---

```sh
 8:22  error  mainContainer case incompatible with snake-case, should be main_container

 eslint --fix
 # -> <main className={styles["main_contanier"]}> foo </main>
```

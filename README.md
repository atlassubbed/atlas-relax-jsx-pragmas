# atlas-relax-jsx-pragma

JSX pragmas (hyperscript and Fragment) for Relax.

[![Travis](https://img.shields.io/travis/atlassubbed/atlas-relax-jsx-pragmas.svg)](https://travis-ci.org/atlassubbed/atlas-relax-jsx-pragmas)

---

## you will need this if:

  * You want to write JSX
  * You want to use a hyperscript function manually

## install

```
npm install --save atlas-relax-jsx-pragma
```

Make sure you have the babel plugin `babel-plugin-transform-react-jsx` installed (e.g. add it to your `.babelrc`) if you are using this as a pragma.

## usage

### with jsx

This is like any other JSX pragma. Include the following in your JSX files:

```javascript
// t stands for "template hyperscript", A stands for Array group (i.e. Fragment)
const { t, A } = require("atlas-relax-jsx-pragma");
/** @jsx t */
/** @jsxFrag A */

const template = (
  <div class="green">
    <span key={1} class="red">hello</span>
    <span key={2} class="red">world</span>
  </div>
)
```

Babel also lets you specify the pragmas in your `.babelrc` so that you don't have to put the comments at the top of every file.

### without jsx

You could use this as a hyperscript function without JSX, but it's not strictly necessary, since Relax templates are plain old object literals.

```javascript
const { t } = require("atlas-relax-jsx-pragma");

// using t as a more concise way to create templates
const template = t(
  "div",
  {class: "green"}, 
  [
    t("span", {class: "red", key: 1}, "hello"),
    t("span", {class: "red", key: 2}, "world")
  ]
)

// shorthand if you don't have any data or keys (second arg to t must be an array)
const template = t(
  "div", 
  [
    t("span", ["hello"]),
    t("span", ["world"])
  ]
)

// not using t at all (literals are valid templates)
// if you don't have data, simply omit the field
const template = {
  name: "div", 
  data: {class: "green"}, 
  next: [
    {name: "span", key: 1, data: {class: "red"}, next: "hello"},
    {name: "span", key: 2, data: {class: "red"}, next: "world"}
  ]
}
```

Using the `t` function tends to be more terse than using literals, but as you can see, it's not required at all. It may just come down to personal preference!

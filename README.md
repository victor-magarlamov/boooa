# boooa

| Statements                  | Branches                | Functions                 | Lines             |
| --------------------------- | ----------------------- | ------------------------- | ----------------- |
| ![Statements](https://img.shields.io/badge/statements-100%25-brightgreen.svg?style=flat) | ![Branches](https://img.shields.io/badge/branches-96.96%25-brightgreen.svg?style=flat) | ![Functions](https://img.shields.io/badge/functions-100%25-brightgreen.svg?style=flat) | ![Lines](https://img.shields.io/badge/lines-100%25-brightgreen.svg?style=flat) |

## Goal

The goal of this [small](https://bundlephobia.com/package/boooa@0.1.0) library is to convert an array of objects (having a similar schema) to JSON string, and downsizing by converting to an array of values only.

## Install

npm i boooa

## Usage

Suppose we have an array of 1000 elements that looks like...

```js
const data = [
  {"id":0,"title":"Title 0","status":"public"},
  {"id":1,"title":"Title 1","status":"public"},
  {"id":2,"title":"Title 2","status":"public"},
  ...
]
```

JSON size will be ~42kb. But we can downsizing it by deleting the keys. Let's do it!

```js
import { stringify } from "boooa";

const str = stringify(data);
// "{"data":[0,"Title 0","public",1,"Title 1","public",2,"Title 2","public"],"schema":["id","title","status"]}"
```

Now JSON size is ~21kb.

Also we can replace duplicate values.

```js
import { stringify } from "boooa";

const str = stringify(data, { replace: {
  status: {
    searchValue: "public",
    newValue: "%p",
  },
}});
// "{"data":[0,"Title 0","%p",1,"Title 1","%p",2,"Title 2","%p"]...
```

Now JSON size is ~17kb.

Using the `parse` method, we can parse the string back into an array.

```js
import { parse } from "boooa";
const array = parse(str);
```

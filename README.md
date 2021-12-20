# boooa

## Install

npm i boooa

## Usage

```js
import { swallow, spitOut } from "boooa";

// Let's we have an array of similar objects...

const data = [{
  id: 1, title: "Item 1", status: 0,
}, {
  id: 2, title: "Item 2", status: 1,
}];

// Using the `swallow` method, we can stringify an array...

const str = swallow(data);

// Now it looks like {"data":[1,"Title 1",0,2,"Title 2",1],"schema":["id","title","status"]}
// It allows us to reduce the size of array twice

// Using the `spitOut` method, we can parse the string back into an array.

const array = spitOut(str);
```

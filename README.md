# boooa

## Goal

The goal of this simple library is to convert an array of objects (having a similar schema) to JSON, and downsizing by converting to an array of values only. Yes, i know about protobuf 8-) But sometimes it can be so exciting to reinvent the wheel! :biking_man:

In my case, this naive approach helps me to reduce the size of KV storage in Cloudflare and reduce the time for requests to API when network is slow.

## Install

npm i boooa

## Usage

```js
import { swallow, spitOut } from "boooa";

// Let's we have an array of similar objects...

const data = [{
  id: 1, title: "Title 1", status: 0,
}, {
  id: 2, title: null, status: 1,
}];

// Using the `swallow` method, we can stringify an array...

const str = swallow(data);

// Now it looks like this
// {"data":[1,"Title 1",0,2,null,1],"schema":["id","title","status"]}
// The data field contains all values, the schema field contains... the schema. 
// It allows us to reduce the size of array twice.

// Using the `spitOut` method, we can parse the string back into an array.

const array = spitOut(str);
```

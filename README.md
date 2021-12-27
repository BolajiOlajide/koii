# KOII

[![star this repo](http://githubbadges.com/star.svg?user=BolajiOlajide&repo=koii&style=flat)](https://github.com/BolajiOlajide/koii)
[![fork this repo](http://githubbadges.com/fork.svg?user=BolajiOlajide&repo=koii&style=flat)](https://github.com/BolajiOlajide/koii/fork)
[![npm](https://img.shields.io/npm/v/koii.svg)](https://www.npmjs.com/package/koii)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=102)](https://github.com/ellerbrock/open-source-badge/)
[![Open Source Love](https://badges.frapsoft.com/os/mit/mit.svg?v=102)](https://github.com/ellerbrock/open-source-badge/)

Koii is a simple ExpressJS middleware used to print all routes accessible in an application to the console on start.

![Koii is inspired by Jackie and the fish](images/koi.jpg)

## Install

```console
npm install koii
```

## Usage

To use **Koii** simply add it as a middleware in your express application. To do that, you need to first import **Koii**.

This can be done with requireJS or the ES6 import statements as shown below:

```js
// we require this way because koii is currently exported as an esModule
const koii = require('koii');
```

OR

```js
import koii from 'koii';
```

Once this is done, you can add the middleware with the statement

```js
app.use(koii)
```

An example can be found in [this github gist](https://gist.github.com/BolajiOlajide/7649c1f7205fe9b95bb011fe5ef89721).
Ensure you do this after all your route definitions, if not the middleware won't have access to the routes defined.

Read more about Koii [here](https://medium.com/backticks-tildes/introducing-koii-d556657723c)

Inspired by [@danielb2](https://github.com/danielb2)'s [Blipp plugin](https://www.npmjs.com/package/blipp) for HapiJS

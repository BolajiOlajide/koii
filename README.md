# KOII

[![star this repo](http://githubbadges.com/star.svg?user=BolajiOlajide&repo=koi&style=flat)](https://github.com/BolajiOlajide/koi)
[![fork this repo](http://githubbadges.com/fork.svg?user=BolajiOlajide&repo=koi&style=flat)](https://github.com/BolajiOlajide/koi/fork)
[![NPM version](https://badge.fury.io/js/badge-list.svg)](http://badge.fury.io/js/badge-list)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=102)](https://github.com/ellerbrock/open-source-badge/)
[![Open Source Love](https://badges.frapsoft.com/os/mit/mit.svg?v=102)](https://github.com/ellerbrock/open-source-badge/)

![Koi is inspired by Jackie and the fish](images/koi.jpg)

## Install

```console
npm install koii
```

## Usage

To use **Koii** simply add it as a middleware in your express application. To do that, you need to first import **Koii**.

This can be done with requireJS or the ES6 import statements as shown below:

```js
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

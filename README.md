#jZoom2 – Widget for pinching and zooming of any DOM element.

## Installation
`jZoom2` needs <a href="https://github.com/hammerjs/hammer.js">Hammer.JS</a> and <a href="https://github.com/jquery/jquery">jQuery</a>.
But you don't need to install it manually if you're using bower.

**Via Bower**
```
bower install pri.jzoom --save
```

**Via NPM**
```
npm install pri.jzoom --save
```

**After download library place this in html.**
```html
<script src="bower_components/jquery/dist/jquery.js"></script>
<script src="bower_components/hammerjs/hammer.js"></script>
```
> Replace `bower_components` to `node_modules` if you're using *bower* instead of *npm*.

## Base arguments
`jZoom2(element, options)`

## How to use

```js
let zoomEl = new jZoom2('#el', {});
```

## Options

### <small>options.</small>maxScale

Maximum scale factor of manipulated element.

Default: `3`

### <small>options.</small>iscrollObj

Push iScroll object through if you are using it. Basically it needs for right detection visible element or not right now. 

Default: `null`.

## Events

Usage: `zoomEl.on(event, callback)`

* **beforeOpen**, calls before `open` process starts
* **open**, calls when method `open` done its work
* **beforeClose**, calls before `close` process starts
* **close**, calls when method `close` done its work


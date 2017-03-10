#jZoom2

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


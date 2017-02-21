'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Pinch-to-zoom Class for PRI Alerts
 * @author Yuriy Petrov at Haymarket Media
 */

var jZoom2 = function () {
	function jZoom2(el) {
		var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		_classCallCheck(this, jZoom2);

		this.$el = $(el);
		this.options = options;
		this.options.maxZoom = 2.5;
		this.options.speedZoom = 0.5;

		this.$container = null;
		this.$content = null;
		this.$originalEl = null;

		this.isActive = false;
		this.touchSession = {};
		this.touchState = { scale: 1, x: 0, y: 0, width: 0, height: 0, lastTouchTime: 0 };
		this.init();
	}

	_createClass(jZoom2, [{
		key: 'init',
		value: function init() {
			console.log("init");
			this.makeStyles();
			this.wrapEl();
			this.bindEvents();
		}
	}, {
		key: 'bindEvents',
		value: function bindEvents() {
			this.$container.on('touchstart', this.touchStart.bind(this));
			this.$container.on('touchmove', this.touchMove.bind(this));
			this.$container.on('touchend', this.touchEnd.bind(this));
		}
	}, {
		key: 'wrapEl',
		value: function wrapEl() {
			this.touchState.width = this.$el.width();
			this.touchState.height = this.$el.height();
			// save the original element
			this.$originalEl = this.$el.clone();
			var template = '\n\t\t\t<div class="jzoom-container jzoom-closed">\n\t\t\t\t<div class="jzoom-wrapper">\n\t\t\t\t\t<div class="jzoom-content"></div>\n\t\t\t\t</div>\n\t\t\t\t<div class="jzoom-layout"></div>\n\t\t\t</div>\n\t\t';
			this.$container = this.$el.wrap(template).parents('.jzoom-container');
			this.$content = $('.jzoom-content', this.$container);
			this.$wrapper = $('.jzoom-wrapper', this.$container);
			this.$layout = $('.jzoom-layout', this.$container);

			this.$container.css('height', this.touchState.height);
		}
	}, {
		key: 'makeStyles',
		value: function makeStyles() {
			var styles = '\n\t\t\t.jzoom-container {\n\t\t\t\twidth: 100%;\n\t\t\t}\n\t\t\t.jzoom-wrapper {\n\t\t\t\twidth: 100%;\n\t\t\t\toverflow: hidden;\n\t\t\t\ttouch-action: pan-x pan-y;\n\t\t\t\ttransform-origin: 0 0;\n\t\t\t}\n\t\t\t.jzoom-content {\n\t\t\t\ttransform-origin: 0 0;\n\t\t\t}\n\t\t';
			$('body').append('<style>' + styles + '</style>');
		}
	}, {
		key: 'open',
		value: function open() {
			alert('open');
		}
	}, {
		key: 'close',
		value: function close() {}
	}, {
		key: 'touchStart',
		value: function touchStart(e) {
			var touches = this._getTouches(e);
			if (touches.length == 2) {
				this.touchSession.type = 'pinch';
				this.touchSession.distance = this._getTouchDist(touches);
				this.touchSession.center = this._getTouchCenter(touches);
				e.preventDefault();
			} else if (touches.length == 1) {
				this.touchSession.type = 'tap';
				if (Date.now() - this.touchState.lastTouchTime < 300) {
					this.touchSession.type = 'dbtap';
					this.open();
				}
			}
			this.touchState.lastTouchTime = Date.now();
		}
	}, {
		key: 'touchMove',
		value: function touchMove(e) {
			var touches = this._getTouches(e);
			if (this.touchSession.type == 'pinch') {
				console.log(this.touchSession, touches);
				this.touchSession.scale = this.touchState.scale + this._getTouchDist(touches) / this.touchSession.distance;
				this.zoom();
			}

			this.touchState.x = 0;
			this.touchState.y = 0;
		}
	}, {
		key: 'touchEnd',
		value: function touchEnd(e) {
			var touches = this._getTouches(e);
			this.touchState.scale = this.touchSession.scale;
			this.touchSession = {};
		}
	}, {
		key: 'zoom',
		value: function zoom() {
			var x = this.touchState.x + this.touchSession.center.x / this.touchSession.scale;
			var y = this.touchState.y + this.touchSession.center.y / this.touchSession.scale;
			this.touchState.scale = this.touchSession.scale;

			this.touchState.x = x + this.touchSession.center.x / this.touchSession.scale;
			this.touchState.y = y + this.touchSession.center.y / this.touchSession.scale;

			console.log(this.touchSession.scale);
			// zoom
			this.$content.css({
				transform: 'scale(' + this.touchSession.scale + ')'
			});

			// this.$wrapper.css('transformOrigin', `-${(this.touchSession.center.x)}px,-${(this.touchSession.center.y)}px`)
		}
	}, {
		key: '_getTouches',
		value: function _getTouches(e) {
			if (e.originalEvent) {
				if (e.originalEvent.touches && e.originalEvent.touches.length) {
					return e.originalEvent.touches;
				} else if (e.originalEvent.changedTouches && e.originalEvent.changedTouches.length) {
					return e.originalEvent.changedTouches;
				}
			} else {
				if (e.touches.length) {
					return e.touches;
				} else if (e.changedTouches.length) {
					return e.changedTouches;
				}
			}
			return null;
		}
	}, {
		key: '_getTouchCenter',
		value: function _getTouchCenter(touches) {
			var touch1 = touches[0];
			var touch2 = touches[1];
			return {
				x: (touch2.clientX - touch1.clientX) / 2 + touch1.clientX,
				y: (touch2.clientY - touch1.clientY) / 2 + touch1.clientY
			};
		}
	}, {
		key: '_getTouchDist',
		value: function _getTouchDist(touches) {
			var touch1 = touches[0];
			var touch2 = touches[1];
			return Math.sqrt(Math.pow(Math.abs(touch2.clientX - touch1.clientX), 2) + Math.pow(Math.abs(touch2.clientY - touch1.clientY), 2));
		}
	}]);

	return jZoom2;
}();

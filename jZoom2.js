/**
 * Pinch-to-zoom Class for PRI Alerts
 * @author Yuriy Petrov at Haymarket Media
 */

class jZoom2 {
	constructor(el, options = {}) {
		this.$el = $(el);
		this.options = options;
		this.options.maxZoom = 2.5;
		this.options.speedZoom = 0.5;

		this.$container = null;
		this.$content = null;
		this.$originalEl = null;

		this.isActive = false;
		this.touchSession = {};
		this.touchState = {scale: 1, x: 0, y: 0, width: 0, height: 0, lastTouchTime: 0};
		this.init();
	}

	init() {
		console.log("init");
		this.makeStyles();
		this.wrapEl();
		this.bindEvents();
	}

	bindEvents() {
		this.$container.on('touchstart', this.touchStart.bind(this));
		this.$container.on('touchmove', this.touchMove.bind(this));
		this.$container.on('touchend', this.touchEnd.bind(this));
	}

	wrapEl() {
		this.touchState.width = this.$el.width();
		this.touchState.height = this.$el.height();
		// save the original element
		this.$originalEl = this.$el.clone();
		let template = `
			<div class="jzoom-container jzoom-closed">
				<div class="jzoom-wrapper">
					<div class="jzoom-content"></div>
				</div>
				<div class="jzoom-layout"></div>
			</div>
		`;
		this.$container = this.$el.wrap(template).parents('.jzoom-container');
		this.$content = $('.jzoom-content', this.$container);
		this.$wrapper = $('.jzoom-wrapper', this.$container);
		this.$layout = $('.jzoom-layout', this.$container);

		this.$container.css('height', this.touchState.height);
	}

	makeStyles() {
		let styles = `
			.jzoom-container {
				width: 100%;
			}
			.jzoom-wrapper {
				width: 100%;
				overflow: hidden;
				touch-action: pan-x pan-y;
				transform-origin: 0 0;
			}
			.jzoom-content {
				transform-origin: 0 0;
			}
		`;
		$('body').append(`<style>${styles}</style>`);
	}

	open() {
		alert('open')
	}

	close() {

	}

	touchStart(e) {
		let touches = this._getTouches(e);
		if(touches.length == 2) {
			this.touchSession.type = 'pinch';
			this.touchSession.distance = this._getTouchDist(touches);
			this.touchSession.center = this._getTouchCenter(touches);
			e.preventDefault();
		}else if(touches.length == 1) {
			this.touchSession.type = 'tap';
			if(Date.now() - this.touchState.lastTouchTime < 300) {
				this.touchSession.type = 'dbtap';
				this.open();
			}
		}
		this.touchState.lastTouchTime = Date.now();
	}
	touchMove(e) {
		let touches = this._getTouches(e);
		if(this.touchSession.type == 'pinch') {
			console.log(this.touchSession, touches)
			this.touchSession.scale = this.touchState.scale + this._getTouchDist(touches) / this.touchSession.distance;
			this.zoom();
		}

		this.touchState.x = 0;
		this.touchState.y = 0;
	}
	touchEnd(e) {
		let touches = this._getTouches(e);
		this.touchState.scale = this.touchSession.scale;
		this.touchSession = {};
	}


	zoom() {
		let x = this.touchState.x + this.touchSession.center.x / this.touchSession.scale;
		let y = this.touchState.y + this.touchSession.center.y / this.touchSession.scale;
		this.touchState.scale = this.touchSession.scale;

		this.touchState.x = x + this.touchSession.center.x / this.touchSession.scale;
		this.touchState.y = y + this.touchSession.center.y / this.touchSession.scale;

		console.log(this.touchSession.scale);
		// zoom
		this.$content.css({
			transform: `scale(${this.touchSession.scale})`,
			// transformOrigin: `top left`,
			// transformOrigin: `${(this.touchState.x)}px ${(this.touchState.y)}px`,
			// width: this.touchSession.scale * this.touchState.width,
			// height: this.touchSession.scale * this.touchState.height
		});


		// this.$wrapper.css('transformOrigin', `-${(this.touchSession.center.x)}px,-${(this.touchSession.center.y)}px`)
	}

	_getTouches(e) {
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

	_getTouchCenter(touches) {
		let touch1 = touches[0];
		let touch2 = touches[1];
		return {
			x: ((touch2.clientX - touch1.clientX) / 2) + touch1.clientX,
			y: ((touch2.clientY - touch1.clientY) / 2) + touch1.clientY
		};
	}

	_getTouchDist(touches) {
		let touch1 = touches[0];
		let touch2 = touches[1];
		return Math.sqrt(Math.pow(Math.abs(touch2.clientX - touch1.clientX), 2) + Math.pow(Math.abs(touch2.clientY - touch1.clientY), 2));
	}
}
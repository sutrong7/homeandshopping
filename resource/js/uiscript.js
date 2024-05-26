var GNB = {};
GNB = {
	options : {
		scrollTop : 0
	},
	init : function() {

		this.addEvent();
		this.onScroll();
		this.options.scrollTop = $(window).scrollTop();
		//this.onMove();
	},
	addEvent : function() {
		var holder = $('.nav-menu');
		$('.item-secondly:first-child').addClass('is-hover');
		holder.find('li').on('mouseenter',function() {
			$(this).addClass('is-hover').siblings('.item-secondly').removeClass('is-hover');
		}).on('mouseleave',function() {
			$(this).removeClass('is-hover');
		});
		$('.item-secondly').on('mouseleave', function() {
			$('.item-secondly:first-child').addClass('is-hover');
		});
	},
	onScroll : function() {
		var that = this;
		$(window).scroll(function() {
			that.options.scrollTop = $(window).scrollTop();
			//that.onMove();
		});
	},
	onMove : function() {
		var that = this;
		var gnb = $('.page-header');
		var wing = $('.page-multi-banner, .page-banner-myinfo');
		var start = $('.page-top-banner').outerHeight()
					+ $('.page-nav-top').outerHeight();

		if (start <= that.options.scrollTop) {
			gnb.addClass('fixed');
			wing.addClass('fixed');
		}
		else {
			gnb.removeClass('fixed');
			wing.removeClass('fixed');
		}
	}
};

var ui = {};
ui = {
	init : function() {
		this.path.init();
		this.forms.init();
		this.widgetsScroll.init();
		this.modal.init();
		//this.accordion.init();
	},
	path : {
		init : function() {
			var holder = $('.page-path');

			holder.find('.item-path').each(function() {
				var seleted = $(this).find('.path-category-selected');
				var list = $(this).find('.path-category-list');

				if (seleted.outerWidth() <= list.outerWidth()) {
					seleted.outerWidth(list.outerWidth() - 2);
				}
				else {
					list.outerWidth(seleted.outerWidth() + 2);
				}

			});

			holder.find('.path-category-selected').parent()
				.on('mouseenter', function() {
					$(this).find('.path-category-list').addClass('is-active');
				})
				.on('mouseleave', function() {
					$(this).find('.path-category-list').removeClass('is-active');
				});
		}
	},
	forms : {
		init : function () {
			this.selectbox();
		},
		selectbox : function() {
			var holder = $('.ui-selectbox');
			
			holder.each(function() {
				var that = $(this);

				that.prepend('<span class="drop-bg"><span class="sprite-i drop-down"></span></span>');
				that.find('.selected').on('click', function() {
					toggle(that);
				});
				that.find('.item').on('click', function() {
					that.find('input[type="hidden"]').val($(this).attr('value'));
					that.find('.selected').text($(this).text());
					toggle(that);
					that.find('input[type="hidden"]').trigger('change');
				});
			});

			function toggle(o) {
				if (o.hasClass('is-active')) {
					o.removeClass('is-active');
				}
				else {
					holder.removeClass('is-active');
					o.addClass('is-active');
				}
			}			

		}
	},
	widgetsScroll : {
		options : {
			scrollTop : 0
		},
		init : function() {
			this.scrollTo();
			this.onScroll();
		},
		scrollTo : function(){
			$.fn.extend({
				scrollTo : function() {
					return this.each(function() {
						var targetOffset = $(this).offset().top;
						$('html,body').animate({scrollTop: targetOffset}, 500 );
					});
				}
			});
		},
		onScroll : function() { 
			var that = this;
			$(window).scroll(function() {
				that.options.scrollTop = $(window).scrollTop();
				//that.onMove();
				//that.menu.selected();
			});
		},
		onMove : function() {
			var that = this;
			var wing = $('.page-multi-banner, .page-banner-myinfo');
			var start = $('.page-container').offset().top;

			//2015.9.25 배너가 길경우 , 푸터 아래로 넘어가는 현상 방지로 인한 코드 추가
			var endL = $('.page-container').outerHeight() -  $('.page-multi-banner').outerHeight();
			var endR = $('.page-container').outerHeight() - $('.page-banner-myinfo').outerHeight();
			var main_endL = endL + $('.main-section').height() - 80;
			var main_endR = endR + $('.main-section').height() - 80;
			if( endL <= that.options.scrollTop){
				$( '.page-multi-banner').stop().animate({
					top: endL - start + 200
				},500);
				$('.main-section .page-multi-banner').stop().animate({
					top: main_endL - start +200
				},500);
			}else if (start <= that.options.scrollTop) {
				wing.stop().animate({
					top: that.options.scrollTop - start + 10
				},500);
			}else {
				wing.stop().animate({
					top: 0
				},500);
			}

			if(endR <= that.options.scrollTop){
				$( '.page-banner-myinfo').stop().animate({
					top: endR - start + 200
				},500);
				$('.main-section .page-banner-myinfo').stop().animate({
					top: main_endR - start +200
				},500);
			}
			else if (start <= that.options.scrollTop) {
				wing.stop().animate({
					top: that.options.scrollTop - start + 10
				},500);
			}else {
				wing.stop().animate({
					top: 0
				},500);
			}
		}
	},
	modal : {
		init : function() {
			$('.modal-open').on('click', function(e) {
				e.preventDefault();
				$(this.getAttribute('data-modal')).modal('open');
			});
		}
	},
	tabmenu : {
		init : function(opts) {
			var that = this;
			this.options = {
				holder: null, nav: '.tab-menu', el: '.tab-contents',
				index : 0
			};

			for (var prop in opts) {
				opts.hasOwnProperty(prop) && (this.options[prop] = opts[prop]); 
			}

			this.holder = $(this.options.holder);
			this.nav = this.holder.find(this.options.nav);
			this.el = this.holder.find(this.options.el);

			this.reset();

			this.nav.find('a').on('click', function(e) {
				e.preventDefault();
				that.open(this);
			});
			
		},
		open : function(o) {
			var that = $(o);
			this.close();
			that.addClass('is-active');
			$(that.attr('href')).show();
		},
		close : function() {
			this.nav.find('.is-active').removeClass('is-active');
			this.el.hide();
		},
		reset : function () {
			this.close();

			this.nav.find('li').eq(this.options.index).find('a').addClass('is-active');
			this.el.eq(this.options.index).show();
		},
		onMove : function(){
			var f = $(".tab-menu");
			var fHeight = f.height();
			var fa = f.find('a');
			var hHeight = $('.page-header').height();

			fa.click(function(e){
				e.preventDefault();
				var target = $(this);
				var id = target.attr("href");
				$("html,body").animate({"scrollTop" : $(id).offset().top  - hHeight});
			});
		}
	},
	/*
	datePicker : {
		setting : function() {
			$.datepicker.regional['en'] = {
				dateFormat: 'yy-mm-dd',
				showMonthAfterYear: true,
				showOn: "button",
				buttonImage: "resource/img/datepicker.gif",
				buttonImageOnly: true,
			};
			$.datepicker.setDefaults($.datepicker.regional['en']);
		},
		init : function() {
			this.setting();
			var holder = $('.datepicker'),
				start = holder.find('.start'),
				finish = holder.find('.finish');
			start.datepicker({
				onClose: function( selectedDate ) {
					finish.datepicker( "option", "minDate", selectedDate );
				}
			});
			finish.datepicker({
				onClose: function( selectedDate ) {
					start.datepicker( "option", "maxDate", selectedDate );
				}
			});
		}
	},
	accordion : {
		init : function(){
			$('.accordion-tit').click(function(e) {
				e.preventDefault();
				if( $(this).parent().parent().next('tr').is(':visible') ){
					$('.answer-view').hide();
				}else{
					$('.answer-view').hide();
					$(this).closest('tr').next('.answer-view').show();
				}
			});
			$('.btn-fold').click(function(e) {
				e.preventDefault();
				$('.answer-view').hide();
			});
		}
	},
	*/
	btnAction : {
		init : function(){
			$('.btn-control > button').click(function(e) {
				e.preventDefault();
				$(this).addClass('btn-active').siblings().removeClass('btn-active');
			});
		}
	}

	/*
	quantity : {
		init : function(opts) {
			var that = this;

			this.options = {
				holder: '.quantity-input', input: 'input', increase: '.increase', decrease: '.decrease',
				max: 5, min: 1
			};

			for (var prop in opts) {
				opts.hasOwnProperty(prop) && (this.options[prop] = opts[prop]); 
			}

			this.holder = $(this.options.holder);

			this.holder.each(function() {
				var _this = $(this);
				this.input = _this.find(that.options.input);

				this.increaseButton = _this.find(that.options.increase);
				this.decreaseButton = _this.find(that.options.decrease);

				this.increaseButton.on('click', function() {that.result(this)} );
				this.decreaseButton.on('click', function() {that.result(this)} );

				this.value = Number(this.input.val());

			});

		},
		increase : function() {
			if (this.value >= this.options.max) {
				alert('no');
				return;
			}
			return this.value++;
		},
		decrease : function() {
			if (this.value <= this.options.min) {
				alert('no');
				return;
			}
			return this.value--;
		},
		result : function(o) {
			var that = this;
			var _this = $(o);
			if (_this.hasClass('increase')) that.increase();
			if (_this.hasClass('decrease')) that.decrease();
			
			that.input.val(that.value);
		}
	}
	*/

};

var slider = {};
slider = {
	init : function(opts) {
		this.options = {
			holder: null, el: '.bx-slider',
			mode: 'horizontal', pager: false, controls: false, loop: true,
			auto: false, time: 1000
		};
		
		for (var prop in opts) {
			opts.hasOwnProperty(prop) && (this.options[prop] = opts[prop]); 
		}

		var that = $(this.options.holder);
		var el = that.find(this.options.el);

		that.find('.slider-counter').prepend('<strong class="current-index"></strong> / ');
		var s = el.bxSlider({
			mode : this.options.mode,
			pager : this.options.pager,
			controls : this.options.controls,
			infiniteLoop : this.options.loop,
			auto : this.options.auto,
			pause : this.options.time,
			onSliderLoad: function (currentIndex){
				that.find('.slider-counter .current-index').text(currentIndex + 1);
			},
			onSlideBefore: function ($slideElement, oldIndex, newIndex){
				that.find('.slider-counter .current-index').text(newIndex + 1);
			}
		});
		that.find('.slider-counter').append(s.getSlideCount());
	}
};

(function($) {
	$.fn.modal = function(state,opt) {
		var settings = {
			button : {
				open : '.modal-open',
				close : '.modal-close'
			},
			effect : {
				fade : 'effect-fade',
				toggle : 'effect-toggle'
			}
		};
		var options = $.extend(settings,opt);

		function open(self) {
			var that = self;
			if ($(that).hasClass('flexible')) {
				$(that).find('.modal-dialog').css({
					'marginTop' : $(window).scrollTop() + 20
				});
			}
			$(that).addClass('is-active');
			setTimeout(function() {
				$(that)
					.find('.'+options.effect.fade)
					.add('.'+options.effect.toggle)
					.addClass('effect-in');
				$(that).trigger('shown');
			},100);
		}
		function close(self) {
			var that = self;
			$(that)
				.find('.'+options.effect.fade)
				.add('.'+options.effect.toggle)
				.removeClass('effect-in');
			setTimeout(function() {
				$(that).removeClass('is-active');
			},100);
		}
		return this.each(function() {
			var that = this;
			if (state == 'open' || state == 'show') open(this); 
			else if (state == 'close' || state == 'hide') close(this); 
			
			this.close = $(this).find(options.button.close);
			this.close.on('click', function() {close(that);});
		});
	};
})(jQuery);

$(function() {
	GNB.init();
	ui.init();
});

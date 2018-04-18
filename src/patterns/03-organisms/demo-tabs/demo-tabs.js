// tabs
(function ( $ ) {

	$.fn.demotabs = function( options ) {

		var settings = $.extend( {}, $.fn.demotabs.defaults, options );

		var tabModul = this;

		$.fn.demotabs.initTabs(tabModul, settings);

		return this;
	};


	// Plugin defaults – added as a property on our plugin function
	$.fn.demotabs.defaults = {
		trigger: 'hover',
		toggle: false,
		history: false,  // ToDo: implement history functionality for back links etc.
		deeplink: false, // ToDo: implement deeplinking for urls with tab ids
		ajax: false,     // ToDo: implement tab content loading via AJAX
	};

	$.fn.demotabs.initTabs = function(tabModule, settings) {

		function getRandomArbitrary(min, max) {
			return Math.floor(Math.random() * (max - min) + min);
		}

		showTab = function(tab, module, ref) {

			module.find('.demo-tabs--tab').not(tab).removeClass('active');
			if (settings.toggle) {
				tab.toggleClass('active');
			} else {
				tab.addClass('active');
			}

			module.find('.demo-tabs--panel').not(ref).hide().removeClass('active');
			if (settings.toggle) {
				module.find(ref).toggle().toggleClass('active');
			} else {
				module.find(ref).show().addClass('active');
			}

			addCounter(ref);
		};

		countUp = function() {
			// taken from https://codepen.io/hi-im-si/pen/uhxFn and adjusted
			$('.counter').each(function() {
				var $this = $(this).find('i'),
					countTo = $(this).attr('data-max'),
				 duration = countTo / 4 * 200 ;

				$({ countNum: $this.text()}).animate({
						countNum: countTo
					},
					{
						duration: duration,
						easing:'linear',
						step: function() {
							$this.text(Math.floor(this.countNum));
						},
						complete: function() {
							$this.text(this.countNum);
							//alert('finished');
						}
					});
			});
		};

		addCounter = function (ref) {
			if ( !ref.attr('data-counter') ) {
				var links = ref.find('.linklist li');
				links.each( function () {
					var _rand = getRandomArbitrary(1, 23);
					var _label = (_rand > 1) ? "Posts" : "Post" ;
					var counter = $('<span class="counter" data-max="' + _rand + '"><i>0</i><span> ' + _label + '</span></span>');
					counter.appendTo($(this).find('a'));

					countUp();
				});

				$(ref).attr('data-counter', 'true');

			}
		};



		if (settings.toggle) {
			tabModule.addClass('toggleTabs');
		}

		var preOpenedTab = tabModule.find('.demo-tabs--tab.active');

		if (preOpenedTab.length > 0) {
			var ref = $('#' + preOpenedTab.attr('data-tab-target'));
			addCounter(ref);
		}

		tabModule.on(settings.trigger, '.demo-tabs--tab', function(e) {
			var tab = $(e.target);
			var module = tab.parents('.demo-tabs');
			var ref = $('#' + tab.attr('data-tab-target'));

			showTab(tab, module, ref);
		});

	};

}( jQuery ));


// this would normally be part of a separate file to decouple "plugin" code and init code
$(document).ready(function($) {
	$('.demo-tabs').each(function () {
		$(this).demotabs({
			trigger: 'click',
			toggle: false,
		});
	});
});

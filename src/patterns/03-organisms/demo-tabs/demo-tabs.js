// tabs
(function ( $ ) {

	$.fn.demotabs = function( options ) {

		var settings = $.extend( {}, $.fn.demotabs.defaults, options );

		var tabModul = this;

		//$.fn.demotabs.initTabs(demotabs_data, settings);
		$.fn.demotabs.initTabs(tabModul, settings);

		return this;
	};


	// Plugin defaults – added as a property on our plugin function
	$.fn.demotabs.defaults = {
		trigger: 'hover',
		history: false,  // ToDo: implement history functionality for back links etc.
		deeplink: false, // ToDo: implement deeplinking for urls with tab ids
		ajax: false,     // ToDo: implement tab content loading via AJAX
	};

	$.fn.demotabs.initTabs = function(tabModule, settings) {

		console.log("tabModule", tabModule);
		console.log("settings", settings);

		tabModule.on(settings.trigger, '.demo-tabs--tab', function(e) {
			var tab = $(e.target);
			var module = tab.parents('.demo-tabs');
			var ref = tab.attr('data-tab-target');

			showTab(tab, module, ref);
		});

		showTab = function(tab, module, ref) {
			console.log("tab", tab);
			console.log("module", module);
			console.log("ref", ref);

			module.find('.demo-tabs--tab').not(tab).removeClass('active');
			tab.toggleClass('active');
			//tab.addClass('active');

			module.find('.demo-tabs--panel').not('#' + ref).hide().removeClass('active');
			module.find('#' + ref).toggle().toggleClass('active');
			//module.find('#' + ref).show().addClass('active');
		};



		$(tabModule).find('.demo-tabs--tab').each(function() {
			var _tab = this;
			//var module = _tabModule[0].source;

			//console.log(module);

		});

	};

}( jQuery ));


// this would normally be part of a separate file to decouple "plugin" code and init code
$(document).ready(function($) {
	$('.demo-tabs').each(function () {
		$(this).demotabs({
			trigger: 'click'
		});
	});
});

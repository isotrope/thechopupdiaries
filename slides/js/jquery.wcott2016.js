ISO = {
	init        : function () {
		var _this = ISO;


		//	_this.injectSvgs();

		_this.startReveal();

	},
	startReveal : function () {
		var _this = ISO;


		var currLocation = window.location,
			rootUrl = currLocation.host,
			backgroundUrl = rootUrl == 'localhost' ? 'http://localhost/wcmtl2015/img/crumpled_white_paper_texture_by_melemel2.jpg' : 'http://isotrope.net/talks/wcmtl2015/img/crumpled_white_paper_texture_by_melemel2.jpg';


		Reveal.initialize( {

			// The "normal" size of the presentation, aspect ratio will be preserved
			// when the presentation is scaled to fit different resolutions. Can be
			// specified using percentage units.
			width  : 1920,
			height : 1080,

			// Factor of the display size that should remain empty around the content
			margin : 0.1,

			// Bounds for smallest/largest possible scale to apply to content
			minScale : 0.2,
			maxScale : 1.0,


			// Display controls in the bottom right corner
			controls : true,

			// Display a presentation progress bar
			progress : true,

			// Display the page number of the current slide
			slideNumber : false,

			// Push each slide change to the browser history
			history : true,

			// Enable keyboard shortcuts for navigation
			keyboard : true,

			// Enable the slide overview mode
			overview : true,

			// Vertical centering of slides
			center : true,

			// Enables touch navigation on devices with touch input
			touch : true,

			// Loop the presentation
			loop : false,

			// Change the presentation direction to be RTL
			rtl : false,

			// Turns fragments on and off globally
			fragments : true,

			// Flags if the presentation is running in an embedded mode,
			// i.e. contained within a limited portion of the screen
			embedded : false,

			// Number of milliseconds between automatically proceeding to the
			// next slide, disabled when set to 0, this value can be overwritten
			// by using a data-autoslide attribute on your slides
			autoSlide : 0,

			// Stop auto-sliding after user input
			autoSlideStoppable : true,

			// Enable slide navigation via mouse wheel
			mouseWheel : false,

			// Hides the address bar on mobile devices
			hideAddressBar : true,

			// Opens links in an iframe preview overlay
			previewLinks : false,

			// Transition style
			transition : 'linear', // default/cube/page/concave/zoom/linear/fade/none

			// Transition speed
			transitionSpeed : 'default', // default/fast/slow

			// Transition style for full page slide backgrounds
			backgroundTransition : 'default', // default/none/slide/concave/convex/zoom

			// Number of slides away from the current that are visible
			viewDistance : 3,

			//// Parallax background image
			//parallaxBackgroundImage: backgroundUrl, // e.g. "'https://s3.amazonaws.com/hakim-static/reveal-js/reveal-parallax-1.jpg'"
			//
			//// Parallax background size
			//parallaxBackgroundSize : '2048px 1536px' // CSS syntax, e.g. "2100px 900px"


			dependencies : [
				// Cross-browser shim that fully implements classList - https://github.com/eligrey/classList.js/
				{
					src : 'js/reveal.js/lib/js/classList.js', condition : function () {
					return !document.body.classList;
				}
				},

				// Syntax highlight for <code> elements
				{
					src : 'js/reveal.js/plugin/highlight/highlight.js', async : true, callback : function () {
					hljs.initHighlightingOnLoad();
				}
				},

				// Zoom in and out with Alt+click
				{ src : 'js/reveal.js/plugin/zoom-js/zoom.js', async : true },

				// Speaker notes
				{ src : 'js/reveal.js/plugin/notes/notes.js', async : true },

			]

		} );


		Reveal.addEventListener( 'slidechanged', function ( event ) {
			// event.previousSlide, event.currentSlide, event.indexh, event.indexv
			$( 'body' ).removeClass().addClass( 'current-col-' + event.indexh + ' current-row-' + event.indexv );

			console.log( event.currentSlide );

			if ( $( event.currentSlide ).attr( 'data-run' ) == 'ISO.full-video-the-loop' ) {
				ISO.fullVideo.init();
			} else {
				ISO.fullVideo.destroy();
			}
		} );


		Reveal.addEventListener( 'fragmentshown', function ( event ) {
			// event.fragment = the fragment DOM element
			var dataRun = $( event.fragment ).attr( 'data-run' );
			console.log( event, dataRun );
		} );

		Reveal.addEventListener( 'fragmenthidden', function ( event ) {
			// event.fragment = the fragment DOM element
			var dataRun = $( event.fragment ).attr( 'data-run' );
			console.log( event, dataRun );

		} );
	},

	injectSvgs : function () {
		var _this = ISO;

		var allSvgs = $( 'img[data-svg-src]' );
		console.log( allSvgs );

		allSvgs.each( function ( i, el ) {
			var $this = $( this ),
				svgSrc = $this.data( 'svg-src' );

			$.ajax( {
				url      : svgSrc,
				dataType : 'text'
			} )
				.done( function ( svgCode ) {
					$( svgCode ).insertAfter( $this );
					$this.remove();
				} );
		} );
	}


};


ISO.init();


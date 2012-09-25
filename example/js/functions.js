// If JavaScript is enabled remove 'no-js' class and give 'js' class
jQuery('html').removeClass('no-js').addClass('js');

// Add .osx class to html if on Os/x
if ( navigator.appVersion.indexOf("Mac")!=-1 ) 
	jQuery('html').addClass('osx');

/* Opera fix: */
if ($.browser.opera) {
	$('.fade').removeClass('fade');
	$('.slide').removeClass('slide');
}


// When DOM is fully loaded
jQuery(document).ready(function($) {

	(function() {

	/* --------------------------------------------------------	
		Twitter bootstrap - carousel, tooltip, popover 
	   --------------------------------------------------------	*/	

		// initialize carousel
		$('[rel=carousel]').carousel()
		// initialize tooltip
		$('[rel=tooltip]').tooltip();
		// initialize popover
		$('[rel=popover]').popover();

	    $('.accordion').on('show', function (e) {
	         $(e.target).prev('.accordion-heading').find('.accordion-toggle').addClass('active');
	    });

	    $('.accordion').on('hide', function (e) {
	        $(this).find('.accordion-toggle').not($(e.target)).removeClass('active');
	    });


	/* --------------------------------------------------------	
		External links
	   --------------------------------------------------------	*/	

	    $(window).load(function() {

			$('a[rel=external]').attr('target','_blank');
			
		});

	})();

/* --------------------------------------------------------	
	Zoom and link overlays (e.g. for thumbnails)
   --------------------------------------------------------	*/	

	(function() {

		$(window).load(function() {

			$('.link').each(function(){
				var $this = $(this);
				var $height = $this.find('img').height();
				var span = $('<span>').addClass('link-overlay').html('&nbsp;').css('top',$height/2).click(function(){
					if (href = $this.find('a:first').attr('href')) {
						top.location.href=href;
					}
				});
				$this.append(span);
			})
			$('.zoom').each(function(){
				var $this = $(this);
				var $height = $this.find('img').height();
				var span = $('<span>').addClass('zoom-overlay').html('&nbsp;').css('top',$height/2);
				$this.append(span);
			})

		});

	})();


/* --------------------------------------------------------	
	Portfolio 
   --------------------------------------------------------	*/	

   (function() {

		$(window).load(function(){

			// container
			var $container = $('#portfolio-items');

			function filter_projects(tag)
			{
			  // filter projects
			  $container.isotope({ filter: tag });
			  // clear active class
			  $('li.active').removeClass('active');
			  // add active class to filter selector
			  $('#portfolio-filter').find("[data-filter='" + tag + "']").parent().addClass('active');
			  // update location hash
			  if (tag!='*')
				window.location.hash=tag.replace('.','');
			  if (tag=='*')
			  	window.location.hash='';
			}

			if ($container.length) {

				// conver data-tags to classes
				$('.project').each(function(){
					$this = $(this);
					var tags = $this.data('tags');
					if (tags) {
						var classes = tags.split(',');
						for (var i = classes.length - 1; i >= 0; i--) {
							$this.addClass(classes[i]);
						};
					}
				})

				// initialize isotope
				$container.isotope({
				  // options...
				  itemSelector : '.project',
				  layoutMode   : 'fitRows'
				});

				// filter items
				$('#portfolio-filter li a').click(function(){
					var selector = $(this).attr('data-filter');
					filter_projects(selector);
					return false;
				});

				// filter tags if location.has is available. e.g. http://example.com/work.html#design will filter projects within this category
				if (window.location.hash!='')
				{
					filter_projects( '.' + window.location.hash.replace('#','') );
				}
			}
		})

	})();


/* --------------------------------------------------------	
	Back to top button
   --------------------------------------------------------	*/	

	(function() {

   			$('<i id="back-to-top" class="icon-chevron-up"></i>').appendTo($('body'));

			$(window).scroll(function() {

				if($(this).scrollTop() != 0) {
					$('#back-to-top').fadeIn();	
				} else {
					$('#back-to-top').fadeOut();
				}

			});
			
			$('#back-to-top').click(function() {
				$('body,html').animate({scrollTop:0},600);
			});	

	})();

/* --------------------------------------------------------	
	FAQ
   --------------------------------------------------------	*/	

	(function() {

		$('.faq input[type=text]').keyup(function(){

			// text to search
			var search = $(this).val().toLowerCase();

			// search if there are at least 3 characters
			if (search.length > 2) {

				// for each question+answer in list
				$('.faq li').each(function(){

					var question = $(this).find('h3').text();
					var answer = $(this).find('p').text();

					var search_in = (question+answer).toLowerCase();

					if (search_in.indexOf(search) == -1) {
						// no match
						$(this).hide();
					} else {
						// match
						$(this).show();
					}
				})

				if ( ! $('.faq li:visible').length ) {
					$('.no-results').show();
				} else {
					$('.no-results').hide();
				}

			} else {

				// show all if search box doesn't contains enough characters
				$('.faq li').show();
			}
		})

	})();


/* --------------------------------------------------------	
	Swipe support for slider
   --------------------------------------------------------	*/	

   (function() {

   		var is_touch_device = !!('ontouchstart' in window);

		function swipe( e, direction ) {

			var $carousel = $(e.currentTarget);
			
			if( direction === 'left' )
				$carousel.find('.carousel-control.right').trigger('click');
			
			if( direction === 'right' )
				$carousel.find('.carousel-control.left').trigger('click');
		}
		
		if (is_touch_device === true) {

			$('.carousel').swipe({
				allowPageScroll : 'auto',
				swipeLeft       : swipe,
				swipeRight      : swipe
			});

		}

	})();

})
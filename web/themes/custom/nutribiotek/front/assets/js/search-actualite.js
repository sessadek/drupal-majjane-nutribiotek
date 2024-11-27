(function ($, Drupal) {
	Drupal.behaviors.customToggleContent = {
		attach: function (context, settings) {
      window.location
      $('.search_btn', context).on('click', function(e) {
        e.preventDefault();
        const input = $('.input_seach_blog').val();
        if(input !== '') {
          const languagePath = window.location.pathname.split('/')[1];
          window.location.href = window.location.origin + '/'+languagePath+'/listing-actualite?title='+input;
        }
      });


      $('.reset_link', context).on('click', function(e) {
        e.preventDefault();
        $('.input_seach_blog').val('');
      });
		}
	};
})(jQuery, Drupal);
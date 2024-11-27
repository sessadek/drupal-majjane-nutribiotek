(function ($, Drupal) {
  Drupal.behaviors.accordion = {
    attach: function (context, settings) {
      // Open the first info_content by default
      const $firstContent = $('.info_content', context).first().slideDown(); // Show the first content
      const $firstCloseButton = $('.close_button', context).first().addClass('active_close'); // Add active class to the first close button

      // Function to handle the toggle logic
      function toggleContent(content, closeButton) {
        // Close all other content sections and remove active class from their close buttons
        $('.info_content', context).not(content).slideUp(); // Close other contents
        $('.close_button', context).not(closeButton).removeClass('active_close'); // Remove active class

        // Toggle the clicked content
        const isVisible = content.is(':visible');
        content.slideToggle(); // Toggle the clicked content

        // Manage the active class for the close button
        if (!isVisible) {
          closeButton.addClass('active_close'); // Add class if content is now visible
        } else {
          closeButton.removeClass('active_close'); // Remove class if content is hidden
        }
      }

            // Click event for info_title
            $('.info_title', context).each(
                function () {
                    if (!$(this).attr('data-processed')) {
                        $(this).attr('data-processed', TRUE);
                        $(this).on(
                            'click', function () {
                                const $content = $(this).next('.info_content');
                                const $closeButton = $(this).find('.close_button');
                                toggleContent($content, $closeButton); // Toggle the content
                            }
                        );
                    }
                }
            );

            // Click event for close_button
            $('.close_button', context).each(
                function () {
                    if (!$(this).attr('data-processed')) {
                           $(this).attr('data-processed', TRUE);
                        $(this).on(
                            'click', function (e) {
                                e.stopPropagation(); // Prevent parent event from triggering
                                const $content = $(this).closest('.info_item').find('.info_content');
                                toggleContent($content, $(this)); // Use the same function
                            }
                        );
                    }
                }
            );
        }
    };
})(jQuery, Drupal);

//prevent bootstrap modal from shifting content
(function($) {

$(document)
    .on( 'hidden.bs.modal', '.modal', function() {
        $(document.body).removeClass( 'modal-scrollbar' );
    })
    .on( 'show.bs.modal', '.modal', function() {
        // Bootstrap's .modal-open class hides any scrollbar on the body, so if there
        // IS a scrollbar on the body at modal open time, then add a right margin to
        // take its place.
        if ( $(window).height() < $(document).height() ) {
            $(document.body).addClass( 'modal-scrollbar' );
        }
    });

})(window.jQuery);
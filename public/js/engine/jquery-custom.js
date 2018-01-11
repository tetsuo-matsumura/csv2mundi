jQuery(document).ready(function(){
jQuery("a").on('click', function(event) {

if (this.hash !== "") {
  event.preventDefault();
  var hash = this.hash;
  jQuery('html, body').animate({
    scrollTop: jQuery(hash).offset().top
  }, 500, function(){

    window.location.hash = hash;
  });
}
});
});
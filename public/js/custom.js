// Preloading
let img, imagesLoaded = 0
images = document.querySelectorAll('img.wait')
images.forEach((item, id) => {
  let image = new Image()
  image.src = item.src
  image.onload = function(e) {
    imagesLoaded++
    if (imagesLoaded === images.length) {
      $(".preloader").delay(400).fadeOut(800);
    }
  }
})

$(document).ready(async function() {
  const pswpElement = document.querySelector('.pswp')
  const options = {
    showHideOpacity: true
  }

  // Smooth Scroll Effect
  $(".scrollTo").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function() {
        window.location.hash = hash;
      });
    };
    $('#navbarSupportedContent').collapse('hide');
  });

  // Wow effects
  new WOW().init();
  $(".wow-in").addClass("wow fadeIn");

  // Image correction
  objectFitImages();

  // Parallax Effect
  jarallax(document.querySelectorAll('.jarallax'));
  jarallax(document.querySelectorAll('.jarallax-keep-img'), {
    keepImg: true,
  });

  // Carousel Gallery
  $(".carousel-item>img").click(function() {
    const items = [{
      src: this.src,
      w: 1620,
      h: 1080
    }]
    let gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
  })

  // Google Map
  $('#map-container-google').html('<iframe src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDNLVEUc-pMs2303wH9hOyzuc8qzccwnZg&q=Jwala%20Diamonds%20and%20Jewellery,Thrissur&region=IN" frameborder="0" style="border:0" allowfullscreen></iframe>')
})

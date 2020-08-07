if ('loading' in HTMLImageElement.prototype) {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]')
  lazyImages.forEach(img => {
    img.src = img.dataset.src
    if (img.hasAttribute('data-srcset')) {
      img.srcset = img.dataset.srcset
    }
  })
} else {
  const script = document.createElement('script')
  script.src = 'public/js/lazysizes.min.js'
  document.body.appendChild(script)
}

let imagesLoaded = 0, thumbsLoaded = 0

class ImageLoader {
  constructor() {
    this.list = {}
    this.waitList = document.querySelectorAll('img.wait')
  }

  loadImages(key, nodeList) {
    this.list[key] = nodeList
  }

  waitToLoad(callback) {
    const count = this.waitList.length
    this.waitList.forEach((node, id) => {
      let image = new Image()
      if ("src" in node.dataset) image.src = node.dataset.src
      else image.src = node.src
      image.onload = function(e) {
        callback(node, count)
      }
    })
  }

  onLoad(key, callback) {
    const count = this.list[key].length
    this.list[key].forEach((node, id) => {
      node.onload = function(e) {
        callback(node, count)
      }
    })
  }
}


imageLoader = new ImageLoader()
imageLoader.loadImages('fadeIn', document.querySelectorAll('img.fadeIn'))
imageLoader.loadImages('thumbs', document.querySelectorAll('.carousel-indicators img'))

// Preloading
imageLoader.waitToLoad((image, count) => {
  imagesLoaded++
  if (imagesLoaded === count) {
    $(".preloader").delay(400).fadeOut(800);
  }
})

// FadeIn images
imageLoader.onLoad('fadeIn',(image, count) => {
  image.classList.remove('fadeIn')
})

// FadeIn Carousel
imageLoader.onLoad('thumbs',(image, count) => {
  thumbsLoaded++
  if (thumbsLoaded === count) {
    document.querySelector('.carousel.fadeIn').classList.remove('fadeIn')
  }
})


//*
$(document).ready(function() {

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

  // Image correction
  objectFitImages();

  // Parallax Effect
  jarallax(document.querySelectorAll('.jarallax'));
  jarallax(document.querySelectorAll('.jarallax-keep-img'), {
    keepImg: true
  });

  // Google Map
  const mapKey = 'AIzaSyDNLVEUc-pMs2303wH9hOyzuc8qzccwnZg'
  const mapTag = '<iframe title="Google Map of Jwala Diamonds" src="https://www.google.com/maps/embed/v1/place?key=' + mapKey + '&q=Jwala%20Diamonds%20and%20Jewellery,Thrissur&region=IN" frameborder="0" style="border:0" allowfullscreen></iframe>'
  $('#map-container-google').html(mapTag)
})

document.onreadystatechange = function() {
  if (document.readyState === "complete") {
    const pswpElement = document.querySelector('.pswp')
    const options = {
      preload: [1, 3],
      showHideOpacity: true
    }

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
  }
}

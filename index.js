(function(){
  var animating = false;
  var selectedCard = null;
  var mouse_x = 0;
  var mouse_y = 0;
  var screen_x = 0;
  var screen_y = 0;
  var ele_x = 0;
  var ele_y = 0;
  var cardOffsetLeft = 0;
  var data = [
      {
        "id": 1,
        "name": "Dodge Charger V6",
        "price": "$27,995",
        "desc": "We dig the Charger's duds. It's evolved, it's distinctive ,and it has serious presence. The Pentastar V6 makes 292 horsepower, and that's good enough to haul the admittedly husky sedan to 60 in 6.5 seconds—just a second off what the 2005 Dodge Charger R/T did 10 years ago with a 350-hp Hemi underhood. That car didn't have a miraculous 8-speed auto; this one does. Instead of a bargain-basement penalty box, it's a quick, comfortable, handsome, and unabashedly American sedan for less than $30k.",
        "src": "http://roa.h-cdn.co/assets/15/04/980x490/gallery_nrm_1422074423-dodgechargersxt.jpg"
      },
      {
        "id": 2,
        "name": "Ford Focus ST",
        "price": "$24,425",
        "desc": "Where Ford's Fiesta is a precision tool, the 252-horsepower Ford Focus ST is a brute. A healthy heap of old-school torque steer and a startlingly low price of $24,425 are a reminder of why we love the whole hot hatch idea in the first place. The muscle and economic arguments don't tell the whole story though: Ford also packed some civility into the Focus ST, making it a surprisingly comfortable and well-rounded hoon-tool.",
        "src": "http://roa.h-cdn.co/assets/15/04/768x384/gallery_nrm_1422073825-fordfocusst-na_hr.jpg"
      },
      {
        "id": 3,
        "name": "Nissan Juke Nismo",
        "price": "$28,020",
        "desc": "We never expected to like the Nissan Juke when it first came out. Who would like a tiny CUV with weird styling? But the Juke's spunky character won us over, and the Nismo versions just adds another dose of fun. If you get the Nismo RS with the manual transmission, you sacrifice all-wheel drive, but who wants the CVT? Starting at $28,020, you'll get scarily close to that $30,000 price limit, but if you're looking for something both funky and fun, the Juke is what you want.",
        "src": "http://roa.h-cdn.co/assets/15/50/768x384/gallery-1449864106-nissan-juke-nismo.jpg"
      },
      {
        "id": 4,
        "name": "Ram 1500 Tradesman",
        "price": "$26,145",
        "desc": "If we were to tell you that you could have a 395-horsepower V8, an 8-speed transmission and limited-slip equipped, rear-wheel drive, all for under $30k, would you be surprised? More important, would you mind that it was a truck? We don't. The Ram 1500 Tradesman starts at $26,145, and with the optional 5.7-liter Hemi V8, it makes for an unbeatable dollar to horsepower ratio.",
        "src": "http://roa.h-cdn.co/assets/15/04/768x384/ram1500-trade.jpg"
      },
      {
        "id": 5,
        "name": "Honda Fit",
        "price": "$15,890",
        "desc": "If you're only interested in horsepower figures, the Honda Fit isn't all that impressive. After all, it only makes 130 horsepower. But where the Fit really impresses is in the handling department. It's a surprisingly tossable little car with a wonderful six-speed manual transmission. And even if you go crazy with the options, you'll still be in the low-$20,000 range.",
        "src": "http://roa.h-cdn.co/assets/16/02/768x384/gallery-1452952971-honda-fit-2015-1600x1200-wallpaper-1c-1.jpg"
      },
      {
        "id": 6,
        "name": "Chevrolet Colorado Z71",
        "price": "$29,250",
        "desc": "For years, your options in the midsize truck segment were pretty much the Toyota Tacoma or the Toyota Tacoma. No longer. It's fresh blood in an ancient segment. The 6.2 foot bed will swallow your toys or tools, and it has enough towing capacity—7000 lbs—to haul a race car on a flat-bed trailer. There's no single cab, but the extended and crew cabs are more practical—and handsome. If you're after both maximum torque and maximum fuel economy, the diesel Colorado is also a great truck.",
        "src": "http://roa.h-cdn.co/assets/15/04/768x384/gallery_nrm_1422075395-2015-chevrolet-coloradoz71-bl.jpg"
      },
      {
        "id": 7,
        "name": "Jeep Wrangler Willys Wheeler",
        "price": "$28,195",
        "desc": "Yeah, you can buy a Wrangler Sport, but if you spend any time off road, you're going to immediately throw wheels, tires, and a limited slip rear differential at the truck. Jeep offers all that in a convenient package with the Willys Wheeler. BF Goodrich mud terrain tires, blacked-out Rubicon wheels, a limited slip 3.73 rear axle, and standard air conditioning. It's a great starting point for building the rig of your dreams, and it's $28,195.",
        "src": "http://roa.h-cdn.co/assets/15/04/768x384/gallery_nrm_1422075589-wranglerwillys.jpg"
      },
      {
        "id": 8,
        "name": "Chevrolet Sonic",
        "price": "$20,095",
        "desc": "When you think about Chevy performance, you probably go straight to obvious nameplates like Corvette and Camaro. Duh. But as Yoda said, \"There is another.\" At the opposite end of the price spectrum is a nugget of fun that raises the question: Why would you buy a Mini Cooper or Fiat 500 instead? Don't dismiss the RS as just an appearance package for the Turbo. Yes, engine output's the same, but stiffer suspension, shorter gearing, and disc brakes all around add up to a relentlessly entertaining, efficient, and practical daily driver. Just be sure to pick the six-speed stick to ensure maximum fun.",
        "src": "http://roa.h-cdn.co/assets/16/11/768x428/gallery-1458317829-2017-chevrolet-sonic-005.jpg"
      },
      {
        "id": 9,
        "name": "Mini Cooper",
        "price": "$20,700",
        "desc": "Listen, it's super-easy to option a Mini Cooper S well past $30K, but exercise restraint, and you shall be rewarded—with more power, the tossable nature you're accustomed to, and at long last, an interior that puts usability ahead of retro-cuteness. Oh, the retro lives on, to be sure, but the new Cooper S is a bit more serious in its mission to deliver a viable GTI alternative. It's fast and fun, but take note—the real secret handshake may not be the S at all. The base 3-cylinder turbo Cooper is a snorty, joyful thing, and it's cheaper still.",
        "src": "http://roa.h-cdn.co/assets/15/04/768x384/minicoopers.jpg"
      },
      {
        "id": 10,
        "name": "Chevrolet Camaro V6",
        "price": "$28,190",
        "desc": "Is it as powerful as the V8? Nope. Should you care? Nope! The days of the V6 Camaro being the weaksauce edition are long over. It's smooth, amply powerful at 335 horsepower, sounds good, and looks great thanks to the recent redesign. If you go for the V6, you'll also have enough money leftover to spring for the performance exhaust while still staying under $30,000. In the end, the V6 Camaro is proof that you don't need eight cylinders to feel bitchin'.",
        "src": "http://roa.h-cdn.co/assets/16/06/768x384/gallery-1455314978-chevrolet-camaro.jpg"
      }
  ];

  function init_data () {
    var card = document.body.querySelector('.current');
    var parent = card.parentNode;
    parent.querySelector('.current').remove();
    card.classList.remove('current');
    for(var i = 0; i < data.length; i++) {
      var clone = card.cloneNode(true);
      clone.id = "card" + data[i].id;
      clone.querySelector('img').src = data[i].src;
      clone.querySelector('.name').innerHTML = data[i].name;
      if(i == 0) {
        clone.classList.add('current');
      }
      parent.appendChild(clone);
    }
  }

  function animatecard(ev) {
    if (animating === false) {
      var t = ev.currentTarget;
      if (t.id === 'btnNope') {
        t.parentNode.parentNode.querySelector('.current').classList.add('nopeSelected');
        t.parentNode.parentNode.querySelector('.current').classList.add('addNopeTag');
        animating = true;
      }
      if (t.id === 'btnLike') {
        t.parentNode.parentNode.querySelector('.current').classList.add('likeSelected');
        t.parentNode.parentNode.querySelector('.current').classList.add('addLikeTag');
        animating = true;
      }
    }
  }

  function dragStarted(ele) {
    selectedCard = ele;
    cardOffsetLeft = selectedCard.offsetLeft;
    ele_x = mouse_x - selectedCard.offsetLeft;
    ele_y = mouse_y - selectedCard.offsetTop;
  }

  function moveCard(ele) {
    mouse_x = document.all ? window.event.clientX : ele.pageX;
    mouse_y = document.all ? window.event.clientY : ele.pageY;
    if (selectedCard !== null) {
        selectedCard.style.left = (mouse_x - ele_x - cardOffsetLeft) + 'px';
        selectedCard.style.top = (mouse_y - ele_y) + 'px';
        if(mouse_x > window.innerWidth/2) {
          selectedCard.style.transform = "rotate(10deg)";
          selectedCard.classList.remove('addNopeTag');
          selectedCard.classList.add('addLikeTag');
        }
        else {
          selectedCard.style.transform = "rotate(-10deg)";
          selectedCard.classList.remove('addLikeTag');
          selectedCard.classList.add('addNopeTag');
        }
    }
  }

  function stopCard() {
    if (selectedCard !== null) {
      if(mouse_x > window.innerWidth/2) {
        selectedCard.classList.add('likeSelected');
      }
      else {
        selectedCard.classList.add('nopeSelected');
      }    
      selectedCard = null;
    }
  }

  function animationdone(ev) {
    animating = false;
    var parent = ev.target.parentNode;
    var target = ev.target;
    if (ev.animationName === 'likeAnimate') {
      target.classList.remove('likeSelected');
      target.classList.remove('addLikeTag');
    }
    if (ev.animationName === 'nopeAnimate') {
      target.classList.remove('nopeSelected');
      target.classList.remove('addNopeTag');
    }
    parent.querySelector('.current').remove();
    parent.querySelector('.card').classList.add('current');
    target.classList.remove('current');
    target.style.top = 0;
    target.style.left = 0;
    target.style.transform = "rotate(0deg)";
    var clone = target.cloneNode(true);
    parent.appendChild(clone);
    updateMouseDown();
    window.location.pathname = "profile.html"
  }

  function getContainer(ele) {
    var origin = ele;
    while (!origin.classList.contains('card')){
      origin = origin.parentNode;
    }
    return origin;
  }

  function dragStartedByTouch (ev) {
    screen_x = ev.touches[0].pageX;
    screen_y = ev.touches[0].pageY;
    selectedCard = getContainer(ev.target);
    cardOffsetLeft = selectedCard.offsetLeft;
    ele_x = screen_x - selectedCard.offsetLeft;
    ele_y = screen_y - selectedCard.offsetTop;    
  }

  function stopCardByTouch() {
    if (selectedCard !== null) {
      if(screen_x > window.innerWidth/2) {
        selectedCard.classList.add('likeSelected');
      }
      else {
        selectedCard.classList.add('nopeSelected');
      }    
      selectedCard = null;
    }
  }

  function moveCardByTouch(ev) {
    screen_x = ev.touches[0].pageX;
    screen_y = ev.touches[0].pageY;
    if (selectedCard !== null) {
        selectedCard.style.left = (screen_x - ele_x - cardOffsetLeft) + 'px';
        selectedCard.style.top = (screen_y - ele_y) + 'px';
        if(screen_x > window.innerWidth/2) {
          selectedCard.style.transform = "rotate(10deg)";
          selectedCard.classList.remove('addNopeTag');
          selectedCard.classList.add('addLikeTag');
        }
        else {
          selectedCard.style.transform = "rotate(-10deg)";
          selectedCard.classList.remove('addLikeTag');
          selectedCard.classList.add('addNopeTag');
        }
    }
  }

  function updateMouseDown() {
    document.getElementsByClassName('current')[0].onmousedown = function () {
      dragStarted(this);
      return false;
    };
    document.getElementsByClassName('current')[0].addEventListener('touchstart', dragStartedByTouch);
  }

  document.body.addEventListener('animationend', animationdone);
  document.body.addEventListener('webkitAnimationEnd', animationdone);
  document.getElementById('btnNope').addEventListener('click', animatecard);
  document.getElementById('btnLike').addEventListener('click', animatecard);
  document.onmousemove = moveCard;
  document.onmouseup = stopCard;
  document.addEventListener('touchmove', moveCardByTouch);
  document.addEventListener('touchend', stopCardByTouch);
  init_data();
  updateMouseDown();
})();

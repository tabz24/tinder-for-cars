(function(){
  var animating = false;
  var selectedCard = null;
  var mouse_x = 0;
  var mouse_y = 0;
  var ele_x = 0;
  var ele_y = 0;
  var cardOffsetLeft = 0;

  function init_data () {
    var card = document.body.querySelector('.current');
    var parent = card.parentNode;
    parent.querySelector('.current').remove();
    card.classList.remove('current');
    for(var i = 0; i < data.length; i++) {
      var clone = card.cloneNode(true);
      clone.id = "card_" + data[i].id;
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

  function mouseMoved(ele) {
    mouse_x = document.all ? window.event.clientX : ele.pageX;
    mouse_y = document.all ? window.event.clientY : ele.pageY;
    moveCard();
  }

  function moveCard() {
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
    var id = target.id.split('_')[1];
    if (ev.animationName === 'likeAnimate') {
      window.location.href = "/tinder-for-cars/profile.html?id=" + id;
    }
  }

  function getContainer(ele) {
    var origin = ele;
    while (!origin.classList.contains('card')){
      origin = origin.parentNode;
    }
    return origin;
  }

  function dragStartedByTouch (ev) {
    mouse_x = ev.touches[0].pageX;
    mouse_y = ev.touches[0].pageY;
    selectedCard = getContainer(ev.target);
    cardOffsetLeft = selectedCard.offsetLeft;
    ele_x = mouse_x - selectedCard.offsetLeft;
    ele_y = mouse_y - selectedCard.offsetTop;    
  }

  function touchMoved(ev) {
    mouse_x = ev.touches[0].pageX;
    mouse_y = ev.touches[0].pageY;
    moveCard();
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
  document.onmousemove = mouseMoved;
  document.onmouseup = stopCard;
  document.addEventListener('touchmove', touchMoved);
  document.addEventListener('touchend', stopCard);
  init_data();
  updateMouseDown();
})();

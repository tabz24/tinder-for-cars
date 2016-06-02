(function(){
  var animating = false;
  var selectedCard = null;
  var mouse_x = 0;
  var mouse_y = 0;
  var ele_x = 0;
  var ele_y = 0;
  var cardOffsetLeft = 0;
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
      if (t.classList.contains('current')) {
        fireCustomEvent('cardchosen',
          {
            container: getContainer(t),
            card: t
          }
        );
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
    if(mouse_x > window.innerWidth/2) {
      selectedCard.classList.add('likeSelected');
    }
    else {
      selectedCard.classList.add('nopeSelected');
    }    
    selectedCard = null;
  }

  function getContainer(elm) {
    var origin = elm.parentNode;
    if (!origin.classList.contains('cardcontainer')){
      origin = origin.parentNode;
    }
    return origin;
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
  }

  function updateMouseDown() {
    document.getElementsByClassName('current')[0].onmousedown = function () {
      dragStarted(this);
      return false;
    };
  }

  document.body.addEventListener('animationend', animationdone);
  document.body.addEventListener('webkitAnimationEnd', animationdone);
  document.getElementById('btnNope').addEventListener('click', animatecard);
  document.getElementById('btnLike').addEventListener('click', animatecard);
  document.body.querySelector('.current').addEventListener('onmousedown', dragStarted);
  updateMouseDown();
  document.onmousemove = moveCard;
  document.onmouseup = stopCard;
})();
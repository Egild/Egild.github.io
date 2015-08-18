window.Slider = function(items, config){
  var config = config || {};
  var navNext = config.navNext;
  var navPrev = config.navPrev;
  var currentIndex = config.startIndex || 0;
  var previousIndex;
  var delay = config.delay || 3000;

  var timer;

  function init(){
    items = $(items);
    $(navNext).click(slideNext);
    $(navPrev).click(function(){
      slide(currentIndex - 1);
    });

    $(items[currentIndex]).addClass('__selected');
    timer = setTimeout(slideNext, delay);
  }

  function slideNext(){
    slide(currentIndex + 1);
  }

  function slide(index){
    clearTimeout(timer);

    if (index >= $(items).length)
      index = 0;

    if (index < 0)
      index = $(items).length - 1;

    $(items).removeClass('__unselected');
    $(items).removeClass('__selected');
    $(items[currentIndex]).addClass('__unselected');
    $(items[index]).addClass('__selected');
    
    previousIndex = currentIndex;
    currentIndex = index;

    timer = setTimeout(slideNext, delay);
  }

  $(document).ready(init);
}
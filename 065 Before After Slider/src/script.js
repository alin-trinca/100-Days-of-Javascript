function handleScroller() {
  let active = false;

  function scrollIt(x) {
    let transform = Math.max(
      0,
      Math.min(x, document.querySelector(".wrapper").offsetWidth)
    );
    document.querySelector(".after").style.width = transform + "px";
    document.querySelector(".scroller").style.left = transform - 25 + "px";
  }

  function setOpeningState() {
    scrollIt(150);
  }

  function handleMouseDown() {
    active = true;
    document.querySelector(".scroller").classList.add("scrolling");
  }

  function handleMouseUp() {
    active = false;
    document.querySelector(".scroller").classList.remove("scrolling");
  }

  function handleMouseLeave() {
    active = false;
    document.querySelector(".scroller").classList.remove("scrolling");
  }

  function handleMouseMove(e) {
    if (!active) return;
    let x = e.pageX;
    x -= document.querySelector(".wrapper").getBoundingClientRect().left;
    scrollIt(x);
  }

  function handleTouchStart() {
    active = true;
    document.querySelector(".scroller").classList.add("scrolling");
  }

  function handleTouchEnd() {
    active = false;
    document.querySelector(".scroller").classList.remove("scrolling");
  }

  function handleTouchCancel() {
    active = false;
    document.querySelector(".scroller").classList.remove("scrolling");
  }

  document
    .querySelector(".scroller")
    .addEventListener("mousedown", handleMouseDown);
  document.body.addEventListener("mouseup", handleMouseUp);
  document.body.addEventListener("mouseleave", handleMouseLeave);
  document.body.addEventListener("mousemove", handleMouseMove);

  setOpeningState();

  document
    .querySelector(".scroller")
    .addEventListener("touchstart", handleTouchStart);
  document.body.addEventListener("touchend", handleTouchEnd);
  document.body.addEventListener("touchcancel", handleTouchCancel);
}

handleScroller();

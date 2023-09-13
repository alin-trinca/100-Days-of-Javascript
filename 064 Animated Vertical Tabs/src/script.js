function _class(name) {
  return document.getElementsByClassName(name);
}

let tabPanes = _class("tabs__header")[0].getElementsByTagName("div");

for (let i = 0; i < tabPanes.length; i++) {
  tabPanes[i].addEventListener("click", function () {
    _class("tabs__header")[0]
      .getElementsByClassName("active")[0]
      .classList.remove("active");
    tabPanes[i].classList.add("active");

    _class("tabs__indicator")[0].style.top = `calc(80px + ${i * 50}px)`;

    _class("tabs__content")[0]
      .getElementsByClassName("active")[0]
      .classList.remove("active");
    _class("tabs__content")[0]
      .getElementsByTagName("div")
      [i].classList.add("active");
  });
}

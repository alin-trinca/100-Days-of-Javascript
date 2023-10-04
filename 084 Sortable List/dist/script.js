const sortableList = document.querySelector(".sortable-list");

sortableList.addEventListener("dragstart", (e) => {
  const item = e.target.closest(".item");
  if (item) {
    setTimeout(() => item.classList.add("dragging"), 0);
  }
});

sortableList.addEventListener("dragend", (e) => {
  const item = e.target.closest(".item");
  if (item) {
    item.classList.remove("dragging");
  }
});

sortableList.addEventListener("dragover", (e) => {
  e.preventDefault();
  const draggingItem = sortableList.querySelector(".dragging");
  const siblings = Array.from(
    sortableList.querySelectorAll(".item:not(.dragging)")
  );
  const nextSibling = siblings.find(
    (sibling) => e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2
  );
  sortableList.insertBefore(draggingItem, nextSibling);
});

sortableList.addEventListener("dragenter", (e) => {
  e.preventDefault();
});
const list = document.querySelector('.sortable-list');
let draggingItem = null;
let array_list_items = [];

list.addEventListener('dragstart', (e) => {
  draggingItem = e.target;
  e.target.classList.add('dragging');
});

list.addEventListener('dragend', (e) => {
  e.target.classList.remove('dragging');
  document
    .querySelectorAll('.sortable-item')
    .forEach((item) => item.classList.remove('over'));
  draggingItem = null;
  do_array_stuff();
});

function do_array_stuff() {
  let list = document.getElementById('list');
  let dataarray = [];
  for (let i = 0; i < list.children.length; i++) {
    dataarray.push(list.children[i].getAttribute('data-list'));
    console.log(list.children[i].getAttribute('data-list'));
  }
  console.log(dataarray);
}

list.addEventListener('dragover', (e) => {
  e.preventDefault();
  const draggingOverItem = getDragAfterElement(list, e.clientY);

  // Remove .over from all items
  document
    .querySelectorAll('.sortable-item')
    .forEach((item) => item.classList.remove('over'));

  if (draggingOverItem) {
    draggingOverItem.classList.add('over'); // Add .over to the hovered item
    list.insertBefore(draggingItem, draggingOverItem);
  } else {
    list.appendChild(draggingItem); // Append to the end if no item below
  }
});

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll('.sortable-item:not(.dragging)'),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

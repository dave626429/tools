const hero = document.querySelector("#hero");

const tasks = [];

const generateID = () =>
  Date.now() + "-" + Math.random().toString(36).substr(2, 10);

function createItem() {
  const item = document.createElement("div");
  item.classList.add("task-item");

  const itemOptions = document.createElement("div");
  const addNewTask = document.createElement("div");
  const addChildTask = document.createElement("div");
  const checkBox = document.createElement("div");

  const childItemContainer = document.createElement("div");
  const textBox = document.createElement("div");

  const deleteTaskWrapper = document.createElement("div");
  const deleteTask = document.createElement("div");
  deleteTask.classList.add("delete-btn");

  itemOptions.classList.add("item-options");
  addNewTask.classList.add("new-task-btn");
  addChildTask.classList.add("child-task-btn");
  checkBox.classList.add("checkBox");

  textBox.contentEditable = true;
  textBox.spellcheck = false;
  textBox.classList.add("empty");

  item.appendChild(itemOptions);
  itemOptions.appendChild(addNewTask);
  itemOptions.appendChild(addChildTask);
  itemOptions.appendChild(checkBox);
  item.appendChild(textBox);
  item.appendChild(deleteTaskWrapper);
  deleteTaskWrapper.appendChild(deleteTask);

  item.addEventListener("mouseenter", (e) => {
    addNewTask.style.opacity = 1;
    addChildTask.style.opacity = 1;
  });
  item.addEventListener("mouseleave", (e) => {
    addNewTask.style.opacity = 0;
    addChildTask.style.opacity = 0;
  });

  addNewTask.addEventListener("click", () => {
    // add new task [completed]
    if (item.textContent) item.insertAdjacentElement("afterend", createItem());
  });
  addChildTask.addEventListener("click", () => {
    console.log("add-child-task=clicked");
    // textBox.appendChild(createItem());
  });

  checkBox.addEventListener("click", (e) => {
    if (textBox.textContent) {
      checkBox.classList.toggle("checked");
      textBox.classList.toggle("strike");
    }
  });

  textBox.addEventListener("input", (e) => {
    // adding placeholder to div[contentEditable].
    {
      let content = e.target.textContent;
      if (!content.trim()) {
        textBox.classList.add("empty");
      }

      if (content.trim() && textBox.classList.contains("empty"))
        textBox.classList.remove("empty");
    }
  });

  textBox.addEventListener("paste", function (e) {
    e.preventDefault();

    // Get plain text ONLY (no HTML, no inline styles)
    const text = (e.clipboardData || window.getSelection()).getData(
      "text/plain"
    );

    // Insert plain text at cursor
    document.execCommand("insertText", false, text);
  });

  deleteTask.addEventListener("click", (e) => {
    let itemParent = deleteTask.parentNode.parentNode.parentNode;
    console.log(itemParent.childNodes.length > 1);

    if (itemParent.childNodes.length > 1) {
      console.log("deleted");
      itemParent.removeChild(item);
    } else {
      item.replaceWith(createItem());
    }
  });

  return item;
}

hero.appendChild(createItem());

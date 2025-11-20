const hero = document.querySelector("#hero");

const tasks = [];

const generateID = () =>
  Date.now() + "-" + Math.random().toString(36).substr(2, 10);

function createItem() {
  const item = document.createElement("div");
  // item.id = generateID();
  item.classList.add("task-item");

  const itemOptions = document.createElement("div");
  const addNewTask = document.createElement("div");
  const addChildTask = document.createElement("div");
  const checkBox = document.createElement("div");

  const childItemContainer = document.createElement("div");
  const textBox = document.createElement("div");

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
    checkBox.classList.toggle("checked");
    textBox.classList.toggle("strike");
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

  return item;
}

hero.appendChild(createItem());

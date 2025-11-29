const fullscreenWindow = document.querySelector("#fullscreen");
const minimizeWindow = document.querySelector("#minimize");

const maximizeRestoreWindow = document.querySelector("#maximize-restore");
maximizeRestoreWindow.setAttribute("restore", "");

const closeWindow = document.querySelector("#close");
const titleBar = document.querySelector("#title-bar");

const hero = document.querySelector("#hero");

const generateID = () =>
  Date.now() + "-" + Math.random().toString(36).substring(2, 10);

function createItem() {
  const item = document.createElement("div");

  const itemOptions = document.createElement("div");
  const addNewTask = document.createElement("div");
  const addChildTask = document.createElement("div");
  const checkBox = document.createElement("div");

  const childItemContainer = document.createElement("div");

  // input + delete-btn
  const textBoxWrapper = document.createElement("div");
  textBoxWrapper.classList.add("text-box-delete-btn-wrapper");
  const textBox = document.createElement("div");
  textBox.contentEditable = true;
  textBox.spellcheck = false;
  const deleteTask = document.createElement("div");

  item.classList.add("task-item");

  itemOptions.classList.add("item-options");
  addNewTask.classList.add("new-task-btn");
  addChildTask.classList.add("child-task-btn");
  checkBox.classList.add("checkBox");

  childItemContainer.classList.add("child-task-container");
  textBox.classList.add("empty");

  deleteTask.classList.add("delete-btn");

  // task's options [add, child and checkbox]
  item.appendChild(itemOptions);
  itemOptions.appendChild(addNewTask);
  itemOptions.appendChild(addChildTask);
  itemOptions.appendChild(checkBox);

  // task
  item.appendChild(childItemContainer);
  childItemContainer.appendChild(textBoxWrapper);
  textBoxWrapper.appendChild(textBox);
  textBoxWrapper.appendChild(deleteTask);

  /**
   * listerners
   */
  item.addEventListener("mouseenter", (e) => {
    addNewTask.style.opacity = 1;
    addChildTask.style.opacity = 1;
  });
  item.addEventListener("mouseleave", (e) => {
    addNewTask.style.opacity = 0;
    addChildTask.style.opacity = 0;
  });

  addNewTask.addEventListener("click", () => {
    // add new task
    if (item.textContent) {
      let newTask = createItem();
      if (item.hasAttribute("is-child")) newTask.setAttribute("is-child", "");
      item.insertAdjacentElement("afterend", newTask);
      return;
    }

    textBox.focus();
  });

  addChildTask.addEventListener("click", () => {
    // add child task
    if (textBox.textContent) {
      let childTask = createItem();
      // childTask.isChild = true; // can not be accessed in css file
      childTask.setAttribute("is-child", "");

      childItemContainer.appendChild(childTask);
      return;
    }

    textBox.focus();
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
    let itemParent = deleteTask.parentNode.parentNode.parentNode.parentNode;
    console.log(itemParent);
    console.log(itemParent.childNodes.length > 1);

    if (itemParent.childNodes.length > 1) {
      itemParent.removeChild(item);
    } else {
      item.replaceWith(createItem());
    }
  });

  return item;
}

hero.appendChild(createItem());

/**
 * Global Listeners.
 */
titleBar.addEventListener("dblclick", () => {
  if (fullscreenWindow.hasAttribute("full")) return;
  maximizeRestoreWindow.click();
});

fullscreenWindow.addEventListener("click", () => {
  window.windowControls.togglefullscreen();
});

minimizeWindow.addEventListener("click", () => {
  window.windowControls.minimize();
});

closeWindow.addEventListener("click", () => {
  window.windowControls.close();
});

maximizeRestoreWindow.addEventListener("click", () => {
  if (fullscreenWindow.hasAttribute("full")) return;

  maximizeRestoreWindow.toggleAttribute("restore");

  maximizeRestoreWindow.hasAttribute("restore")
    ? window.windowControls.restore()
    : window.windowControls.maximize();
});

window.addEventListener("blur", () => {
  minimizeWindow.setAttribute("blur", "");
});

window.addEventListener("mouseover", () => {
  minimizeWindow.removeAttribute("blur");
});

window.addEventListener("resize", () => {
  let dy = screen.height - window.innerHeight;

  if (
    window.innerWidth === screen.width &&
    window.innerHeight === screen.height
  ) {
    fullscreenWindow.setAttribute("full", "");
  } else {
    fullscreenWindow.removeAttribute("full", "");
  }

  if (fullscreenWindow.hasAttribute("full")) return;

  if (
    window.outerWidth === screen.width &&
    window.outerHeight + dy === screen.height
  ) {
    maximizeRestoreWindow.removeAttribute("restore");
  } else {
    maximizeRestoreWindow.setAttribute("restore", "");
  }
});

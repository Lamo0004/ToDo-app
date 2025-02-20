const toDoListQsl = document.querySelector(".to_do_list");

//Tomt array
const toDoArray = [];

//Eventlistener på button
document.querySelector(".input_button").addEventListener("click", addTaskToList);

// Eventlistener på inputfelterne for Enter-tast
document.querySelector(".input_text").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTaskToList();
  }
});
document.querySelector(".input_subtext").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addTaskToList();
  }
});

function addTaskToList() {
  let inputValue = document.querySelector(".input_text").value; //Henter værdien af input feltet
  let subInputValue = document.querySelector(".input_subtext").value; //Henter værdien af andet input felt

  document.querySelector(".input_text").value = ""; // Rydder teksten i input_feltet
  document.querySelector(".input_subtext").value = ""; // Rydder teksten i subtext-feltet

  const newObjToAddToArray = {
    id: self.crypto.randomUUID(),
    text: inputValue,
    done: false,
    subtext: subInputValue,
  };

  toDoArray.push(newObjToAddToArray);
  sortedList();
}

//Funktion som sortere eller filtrere listen af tasks
function sortedList() {
  let listToShow = toDoArray;
  listToShow.sort((a, b) => {
    if (a.done && !b.done) {
      return 1;
    } else if (!a.done && b.done) {
      return -1;
    }
  });
  showToDo(listToShow);
}

function showToDo(listToShow) {
  toDoListQsl.innerHTML = ""; //Fjerner gamle liste for DOM'en, så det opdaterede kan vises

  listToShow.forEach((task) => {
    const li = document.createElement("li"); //Oprettet elementet li

    li.innerHTML += `<input type="checkbox" ${task.done ? "checked" : ""} class="mark_toggle_done"><div><h3>${task.text}</h3><p>${task.subtext}</p></div><span class="delete">x</span>`; //Skriver li ud i DOM'en – Hvis done = true sættes attributen checked (flueben) på input feltet, eller fjernes atributten
    li.classList.add(task.done ? "color_done" : "color_task"); //Hvis done = true addes klassen color_done ellers tilføjes klassen color_task

    li.addEventListener("click", (evt) => {
      const currentTarget = evt.currentTarget;
      const target = evt.target;

      console.log("current target", currentTarget);
      console.log("target", target);

      if (target.classList.contains("delete")) {
        document.querySelector("dialog").showModal();
        document.querySelector(".nej").addEventListener("click", sortedList());
        document.querySelector(".ja").addEventListener("click", removeTask);

        //funktion som fjerner element fra arrayet og DOM'en
        function removeTask() {
          const taskId = task.id;
          const index = toDoArray.findIndex((item) => item.id === taskId);
          if (index !== -1) {
            toDoArray.splice(index, 1);
          }

          currentTarget.remove();
          sortedList();
        }
      }

      if (target.classList.contains("mark_toggle_done")) {
        task.done = !task.done; // Skift mellem true/false

        if (task.done) {
          li.classList.add("task_done_animation"); // Tilføj animation når den bliver true
          li.addEventListener("animationend", () => sortedList());
        } else {
          li.classList.add("task_not_done_animation"); // Tilføj animation når den bliver false
          li.addEventListener("animationend", () => sortedList());
        }
      }
    });
    toDoListQsl.appendChild(li); //Append til html liste
  });
}

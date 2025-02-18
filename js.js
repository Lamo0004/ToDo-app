const toDoListQsl = document.querySelector(".to_do_list");

//Hardcodet array – skal være dynamisk med det som brugeren skriver ind
const doDoArray = [
  { id: self.crypto.randomUUID(), text: "Lave to do app", done: false, subtext: "deadline er torsdag kl. 23:59" },
  { id: self.crypto.randomUUID(), text: "Rette opgaver", done: false },
  { id: self.crypto.randomUUID(), text: "Gøre rent", done: true, subtext: "min tur til at støvsuge" },
];

//Funktion som kører tasks ud til dommen
sortedList();

//Funktion som sortere eller filtrere listen af tasks
function sortedList() {
  let listToShow = doDoArray;
  listToShow.sort((a, b) => {
    if (a.done && !b.done) {
      return 1;
    } else if (!a.done && b.done) {
      return -1;
    }
  });
  console.log("list to show", listToShow);
  showToDo(listToShow);
}

function showToDo(listToShow) {
  toDoListQsl.innerHTML = ""; //Fjerner gamle liste for dommen, så det opdaterede kan vises

  listToShow.forEach((task) => {
    const li = document.createElement("li"); //Oprettet elementet li

    li.innerHTML += `<input type="checkbox" ${task.done ? "checked" : ""} class="mark_toggle_done"><h3>${task.text}</h3><p>${task.subtext}</p><h5 class="delete">x</h5>`; //Skriver li ud i dommen – Hvis done = true sættes attributen checked (flueben) på input feltet, eller fjernes atributten
    li.classList.add(task.done ? "color_done" : "color_task"); //Hvis done = true addes klassen color_done ellers tilføjes klassen color_task

    li.addEventListener("click", (evt) => {
      //Eventlistener klik på task
      const currentTarget = evt.currentTarget;
      const target = evt.target;

      console.log("current target", currentTarget);
      console.log("target", target);

      //Opdatere arrayet
      if (target.classList.contains("delete")) {
        currentTarget.remove(currentTarget); //Fjerner currenttarget (hele liste elementet) ved at klikke på target (krydset)
      }
      if (target.classList.contains("mark_toggle_done")) {
        task.done = !task.done; //Gør den til det modsatte af hvad den er true/false

        //Kalder funkionen
        sortedList();
      }
    });
    toDoListQsl.appendChild(li); //Append til html liste
  });
}

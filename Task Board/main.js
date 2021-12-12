(function () {
    window.addEventListener("load", checkListOfNotes);
    document.getElementById("saveNote").addEventListener("click", saveNote);
    document.getElementById("clearNote").addEventListener("click", clearNote);
    currentDate();
    let notesArray = [];
    // On load section
    function checkListOfNotes() {
        if (localStorage.getItem("Notes Array").length >= notesArray.length) {
            notesArray = JSON.parse(localStorage.getItem("Notes Array"));
            loadNotes();
        }
    }
    function loadNotes() {
        for (let i = 0; i < notesArray.length; i++) {
            notesCreator(notesArray[i], i);
        }
    }
    // Buttons section
    function saveNote() {
        var task = document.getElementById("addTask").value;
        var date = document.getElementById("dateChooser").value;
        var time = document.getElementById("timeChooser").value;
        var newNote = {
            task: task,
            date: date,
            time: time
        };
        if (valTask(task) && valDate(date)) {
            notesArray.push(newNote);
            notesCreator(newNote, (notesArray.length - 1));
            localStorageHandler();
            clearNote();
        }
    }
    function clearNote() {
        document.getElementById("addTask").value = "";
        document.getElementById("dateChooser").value = "";
        document.getElementById("timeChooser").value = "";
    }
    // Required fields
    function valTask(task) {
        if (task == "") {
            alert("Task field is empty");
            return false;
        }
        return true;
    }
    function valDate(date) {
        if (date == "") {
            alert("Date field is empty");
            return false;
        }
        return true;
    }
    function currentDate() {
        let currentDate = new Date();
        let month = (currentDate.getMonth() < 9) ? "0" + (currentDate.getMonth() + 1) : currentDate.getMonth();
        document.getElementById("dateChooser").setAttribute("min", currentDate.getFullYear() + "-" + month + "-" + currentDate.getDate());
    }
    // Local Storage Side
    function localStorageHandler() {
        localStorage.setItem("Notes Array", JSON.stringify(notesArray));
    }
    // Creating notes
    function notesCreator(newNote, divId) {
        let nodeDiv = document.createElement("div");
        nodeDiv.setAttribute("id", divId);
        document.getElementById("listOfNotes").appendChild(nodeDiv);
        createRemoveIcon(nodeDiv);
        insertTask(newNote.task, nodeDiv);
        insertDate(newNote.date, nodeDiv);
        insertTime(newNote.time, nodeDiv);
    }
    function createRemoveIcon(nodeDiv) {
        let button = document.createElement("button");
        button.addEventListener("click", eraseNote);
        button.setAttribute("class", "fa fa-remove");
        nodeDiv.appendChild(button);
    }
    function insertTask(task, nodeDiv) {
        let nodeTask = document.createElement("p");
        task = document.createTextNode(task);
        nodeTask.setAttribute("id", "task");
        nodeTask.appendChild(task);
        nodeDiv.appendChild(nodeTask);
    }
    function insertDate(date, nodeDiv) {
        let nodeDate = document.createElement("p");
        date = document.createTextNode("Date: " + date);
        nodeDate.setAttribute("id", "date");
        nodeDate.appendChild(date);
        nodeDiv.appendChild(nodeDate);
    }
    function insertTime(time, nodeDiv) {
        let nodeTime = document.createElement("p");
        (time == "") ? time = document.createTextNode(time) : time = document.createTextNode("Time: " + time);;
        nodeTime.setAttribute("id", "time");
        nodeTime.appendChild(time);
        nodeDiv.appendChild(nodeTime);
    }
    // Erasing Notes
    function eraseNote(noteId) {
        let divId = parseInt(noteId.path[1].id);
        notesArray.splice(divId, 1);
        localStorageHandler();
        document.getElementById(divId).remove();
        for (let i = (divId + 1); i <= notesArray.length; i++) {
            document.getElementById(i).setAttribute("id", (i - 1));
        }
    }
})();
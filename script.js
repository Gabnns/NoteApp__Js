const addBox = document.querySelector(".wrapper__button"),
    popupBox = document.querySelector(".popup__box"),
    popupTitle = document.querySelector("header p"),
    closeIcon = popupBox.querySelector("header i"),
    titleTag = popupBox.querySelector("input"),
    descTag = popupBox.querySelector("textarea"),
    addBtn = popupBox.querySelector("button");

const months = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Getting localStorage notes if exist and parsing them
// to js obj else passing an empty array to notes
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false, updateId;


// show popup
addBox.addEventListener("click", () => {
    titleTag.focus();
    popupBox.classList.add("show")
});

// close popup
closeIcon.addEventListener("click", () => {
    isUpdate = false;
    titleTag.value = "";
    descTag.value = "";
    popupTitle.innerText = "Add a new note";
    addBtn.innerHTML = "Add a Note"
    popupBox.classList.remove("show")
});

// create HTML note whit infos insert and add in array notes
function showNotes() {
    document.querySelectorAll(".note").forEach(note => note.remove());
    notes.forEach((n, index) => {
        let liTag =
            `
        <li class="note__item note">
            <div class="note__content-item">
                <h2>${n.title}</h2>
                <p>${n.description}</p>
            </div>
            <div class="note__content-bottom">
                <span>${n.date}</span>
                <div class="note__bottom-settings">
                    <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                    <ul class="bottom__settings-menu">
                        <li onclick="updateNote(${index}, '${n.title}', '${n.description}')"><i class="uil uil-pen"></i>Edit</li>
                        <li onclick="deleteNote(${index})"><i class="uil uil-trash"></i>Delete</li>
                    </ul>
                </div>
            </div>
        </li>
       `;

        addBox.insertAdjacentHTML("afterend", liTag);
    });
}
showNotes();

// ative class menu settings - visible
function showMenu(elem) {
    elem.parentElement.classList.add("show");
    document.addEventListener("click", e => {
        // remove class show from the settings menu on document click
        if (e.target.tagName != "I" || e.target.elem) {
            elem.parentElement.classList.remove("show");
        }
    })
}

// button remove notes of menu settings
function deleteNote(noteId) {
    let confirmDel = confirm("Are you sure you want to delete this note?");
    if (!confirmDel) {
        return;
    }
    notes.splice(noteId, 1); // remove note selected from array
    // Save updated notes to localStorage
    localStorage.setItem("notes", JSON.stringify(notes));
    // att notes in display
    showNotes();
}

// button edit notes of menu settings
function updateNote(noteId, title, desc) {
    isUpdate = true;
    updateId = noteId;
    addBox.click();

    titleTag.value = title;
    descTag.value = desc;

    popupTitle.innerText = "Edit a Note";
    addBtn.innerText = "Update Note";
}


// button add new note - popup
addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let noteTitle = titleTag.value,
        noteDesc = descTag.value;

    if (noteTitle || noteDesc) {
        let dataObj = new Date();
        month = months[dataObj.getMonth()],
            day = dataObj.getDate(),
            year = dataObj.getFullYear();

        let noteInfo = {
            title: noteTitle,
            description: noteDesc,
            date: `${month} ${day}, ${year}`
        }

        if (!isUpdate) {
            notes.push(noteInfo); //add new note to notes
        } else {
            isUpdate = false;
            notes[updateId] = noteInfo; // update note specified
        }

        // Save notes to localStorage
        localStorage.setItem("notes", JSON.stringify(notes));
        closeIcon.click();
        // att new notes add in display
        showNotes();
    }



});
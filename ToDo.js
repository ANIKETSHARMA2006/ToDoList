document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById("input");
    const button = document.querySelector(".btn");
    const taskList = document.querySelector(".taskList");
    const emptyImage = document.getElementById("empty-img");

    const toggleImage = () => {
        emptyImage.style.display =
            taskList.children.length === 0 ? "block" : "none";
    };

    const addTask = (event) => {
        event.preventDefault();
        if (input.value.trim() === "") return;

        const newLi = document.createElement("li");
        newLi.innerHTML = `
            <div class="li-div">
                <input type="checkbox" class="checkbox">
                <span class="list">${input.value}</span>
                <div class="btn-con">
                    <img class="edit" src="images/edit.svg">
                    <img class="delete" src="images/delete.svg">
                </div>
            </div>
        `;

        taskList.appendChild(newLi);
        input.value = "";
        toggleImage();

        const checkbox = newLi.querySelector(".checkbox");
        const text = newLi.querySelector(".list");
        const editBtn = newLi.querySelector(".edit");
        const deleteBtn = newLi.querySelector(".delete");

        // checkbox strike-through
        checkbox.addEventListener("change", () => {
            text.style.textDecoration = checkbox.checked
                ? "line-through"
                : "none";
        });

        // lisner for checkbox btn
        editBtn.addEventListener("click", () => {
            if (!checkbox.checked) {
                input.value = text.textContent;
                newLi.remove();
                toggleImage();
            }
        });

        // lisner for delete btn
        deleteBtn.addEventListener("click", () => {
            newLi.remove();
            toggleImage();
        });
    };

    button.addEventListener("click", addTask);

    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") addTask(e);
    });
});

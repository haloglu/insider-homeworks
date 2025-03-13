// To-do list with jquery

// let givenToDos = [];

// $(document).ready(function () {
//   for (let i = 0; i < givenToDos.length; i++) {
//     $("#task-list").append('<li class="task-item">' + givenToDos[i] + "</li>");
//   }
//   $("#submit").on("click", function (event) {
//     event.preventDefault();
//     const $taskTitle = $("#task-title");
//     const $taskDescription = $("#task-description");
//     const $newTodo =
//       "Başlık : " +
//       $taskTitle.val() +
//       "<br>" +
//       "Açıklama : " +
//       $taskDescription.val() +
//       "<br>" +
//       '<input type="checkbox"><label>Tamamlandı mı ?</label> ';
//     givenToDos.push($newTodo);

//     $("#task-list").append('<li class="task-item">' + $newTodo + "</li>");
//     $taskTitle.val() + $taskDescription.val();
//   });
// });

$(document).ready(function () {
  let todos = [];
  const $taskList = $("#task-list");

  function renderTasks() {
    $taskList.empty();
    todos.forEach((todo, index) => {
      const listItem = $(`
        <li class="task-item ${todo.completed ? "completed" : ""}">
          <div class="task-item-content">
            <strong>Başlık:</strong> <div>${todo.title}</div>
            <strong>Açıklama:</strong> <div>${todo.description}</div>
          </div>
          <div class="task-item-footer">
            <input type="checkbox" ${todo.completed ? "checked" : ""}>
            <label>Tamamlandı mı?</label>
          </div>
          <button class="delete-task">Sil</button>
        </li>
      `);
      $taskList.append(listItem);
    });
  }

  $("#submit").on("click", function (event) {
    event.preventDefault();
    const title = $("#task-title").val().trim();
    const description = $("#task-description").val().trim();
    if (!title || !description) {
      alert("Lütfen görev başlığı ve açıklamasını girin.");
      return;
    }
    todos.push({ title, description, completed: false });
    $("#task-title, #task-description").val("");
    renderTasks();
  });

  $taskList.on("change", 'input[type="checkbox"]', function () {
    const index = $(this).closest("li").index();
    todos[index].completed = $(this).prop("checked");
    renderTasks();
  });

  // Sil butonuna basınca .remove() ile silme işlemi

  $taskList.on("click", ".delete-task", function () {
    const $listItem = $(this).closest("li");
    const index = $listItem.index();
    todos.splice(index, 1);
    $listItem.remove();
  });

  // Görevin tamamlandığını göstermek için .toggleClass("completed") kullanıldı.

  $taskList.on("click", ".task-item-content", function () {
    const index = $(this).closest("li").index();
    todos[index].completed = !todos[index].completed;
    $(this).closest("li").toggleClass("completed");
    renderTasks();
  });

  renderTasks();
});

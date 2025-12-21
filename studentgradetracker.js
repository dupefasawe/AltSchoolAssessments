// studentgradetracker.js file to track and display student grades//

// array to hold student objects
let listOfStudents = [];

// function to create a new student object
function createNewStudent(name, grade) {
  return {
    name: name,
    grade: grade,
  };
}
//console.log(createNewStudent("Alice", 60));

// function to add new student to the list
function addNewStudent(name, grade) {
  const student = createNewStudent(name,Number(grade));
  listOfStudents.push(student);
}

// addNewStudent("Bob", 75);
// addNewStudent("Charlie", 85);
// console.log(listOfStudents);

//function to calculate average grade
function averageGrade() {
  if (listOfStudents.length === 0) return null;
  let total = 0;
  for (const student of listOfStudents) {
    total += student.grade;
  }
  return total / listOfStudents.length;
}

//function to remove student by index
function removeStudent(index) {
  listOfStudents.splice(index, 1);
}

// addNewStudent("David", 90);
// renderStudentTable();
// console.log("Average Grade: " + averageGrade());

// function to render student table in HTML
function renderStudentTable() {
  const tableBody = document.getElementById("student-table-body");
  tableBody.innerHTML = ""; // Clear existing rows
  listOfStudents.forEach((student, index) => {
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    nameCell.textContent = student.name;
    const gradeCell = document.createElement("td");
    gradeCell.textContent = student.grade;
    const removeButtonCell = document.createElement("td");
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.onclick = function () {
      removeStudent(index);
      renderStudentTable();
      displayAverageGrade();
    };
    removeButtonCell.appendChild(removeButton);
    row.appendChild(nameCell);
    row.appendChild(gradeCell);
    row.appendChild(removeButtonCell);
    tableBody.appendChild(row);
  });
  displayAverageGrade();
}
//Display average grade
function displayAverageGrade() {
  const avgGradeElement = document.getElementById("average-grade");
  const avg = averageGrade();
  if (avg === null) {
    avgGradeElement.textContent = "No students available.";
  } else {
    avgGradeElement.textContent = "Average Grade: " + avg.toFixed(2);
  }
}

// Initial rendering of the table
// addNewStudent("Alice Johnson", 88);
// addNewStudent("Bob Smith", 92);
// addNewStudent("Charlie Brown", 79);
// renderStudentTable();

//handing form submission
document.addEventListener("DOMContentLoaded", function () {
  const studentForm = document.getElementById("student-form");
  if (!studentForm) return;

  const nameInput = document.getElementById("student-name");
  const gradeInput = document.getElementById("student-grade");
  const nameErrorEl = document.getElementById("name-error");
  const gradeErrorEl = document.getElementById("grade-error");

  studentForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from submitting normally
    const name = nameInput.value;
    const grade = gradeInput.value;

    //clear previous errors
    nameErrorEl.textContent = "";
    gradeErrorEl.textContent = "";

    const nameError = validateStudentName(name);
    const gradeError = validateStudentGrade(grade);

    let hasError = false;
    if (nameError) {
      nameErrorEl.textContent = nameError;
      hasError = true;
    }
    if (gradeError) {
      gradeErrorEl.textContent = gradeError;
      hasError = true;
    }
    if (hasError) {
      return; // Stop submission if there are errors
    }

    // No errors — add student and re-render
    addNewStudent(name, Number(grade));
    renderStudentTable();

    nameInput.value = "";
    gradeInput.value = "";
  });

  //validate student name and grade before adding
  function validateStudentName(name) {
    if (!name || !name.trim()) return "Name is required.";
    const words = name.trim().split(/\s+/);
    if (words.length < 2) return "Please enter your first and last name.";
    return "";
  }
  function validateStudentGrade(grade) {
    if (!grade || !grade.trim()) {
      return "Grade is required.";
    }
    const numericGrade = Number(grade);
    if (Number.isNaN(numericGrade)) {
      return "Grade must be a number.";
    }
    if (numericGrade < 0 || numericGrade > 100) {
      return "Grade must be between 0 and 100.";
    }
    return "";
  }
});

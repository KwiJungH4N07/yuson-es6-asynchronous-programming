class Student {
  constructor(id, name, age, course) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.course = course;
  }

  introduce() {
    return `Hi, my name is ${this.name}, I am ${this.age} years old, and I am enrolled in ${this.course}.`;
  }
}

class Instructor {
  constructor(id, name, subject) {
    this.id = id;
    this.name = name;
    this.subject = subject;
  }

  teach() {
    return `I am ${this.name} and I teach ${this.subject}.`;
  }
}

function fetchStudentsWithThen() {
  fetch("data/students.json")
    .then(response => response.json())
    .then(data => {
      console.log("Promise .then version:");
      console.log(data.students);
    })
    .catch(err => console.error(err));
}

async function fetchStudentsWithAsync() {
  try {
    const response = await fetch("data/students.json");
    const data = await response.json();
    console.log("Async/Await version:");
    console.log(data.students);
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function displayData() {
  const response = await fetch("data/students.json");
  const data = await response.json();

  const outputDiv = document.getElementById("output");

  let studentList = "<h2>Students:</h2><ul class='students'>";
  data.students.forEach(student => {
    const highlight = student.age > 21 ? "<span class='highlight'>*</span>" : "";
    studentList += `
      <li class="student-item">
        <div class="student-left">
          <span class="student-name">${student.name}</span>
          <span class="student-meta">(${student.age})</span>
        </div>
        <span class="course-tag">${student.course}</span>
        ${highlight}
      </li>
    `;
  });
  studentList += "</ul>";

  let courseList = "<h2>Courses:</h2><ul>";
  data.courses.forEach(course => {
    courseList += `<li>${course.title}: ${course.description}</li>`;
  });
  courseList += "</ul>";

  let instructorList = "<h2>Instructors:</h2><ul>";
  data.instructors.forEach(instr => {
    instructorList += `<li>${instr.name} - ${instr.subject}</li>`;
  });
  instructorList += "</ul>";

  outputDiv.innerHTML = studentList + courseList + instructorList;
}

function showRelationships(data) {
  const outputDiv = document.getElementById("output");

  let relationSection = "<h2>Relationships:</h2>";

  relationSection += "<h3>Students and Their Courses:</h3><ul>";
  data.students.forEach(student => {
    const course = data.courses.find(c => c.title === student.course);
    relationSection += `<li>${student.name} → ${student.course} → ${course.description}</li>`;
  });
  relationSection += "</ul>";

  relationSection += "<h3>Courses and Their Instructors:</h3><ul>";
  relationSection += "<li>Computer Science → Taught by Moscov</li>";
  relationSection += "<li>Data Science → Taught by Miya</li>";
  relationSection += "<li>Cybersecurity → Taught by Balmond</li>";
  relationSection += "</ul>";

  outputDiv.innerHTML += relationSection;
}

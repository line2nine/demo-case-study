// Phân tích:
// Tạo các lớp:
// - Student
// ==> Thuộc tính: studentID, studentName, studentBirth, studentEmail, studentCountry
// ==> Hành động:
//
// - StudentList
// ==> Thuộc tính: Array student
// ==> Hành động: showStudentList(), getStudentID, checkStudentID(studentID), searchStudent(studentName) addStudent(student), editStudent(studentID), removeStudent(studentID)

function Student(studentID, studentName, studentBirth, studentEmail, studentCountry) {
    this.studentID = studentID;
    this.studentName = studentName;
    this.studentBirth = studentBirth;
    this.studentEmail = studentEmail;
    this.studentCountry = studentCountry;
}

function StudentList() {
    this.studentData = [];

    this.showStudentList = function (arr) {
        let form = document.getElementById("studentList");
        form.innerHTML = "";
        for (let i = 0; i < arr.studentData.length; i++) {
            let data = stdList.studentData[i];
            let trElement = document.createElement("tr");
            trElement.className = "trStudentList";

            let tdCheckBox = document.createElement('td');
            let ckbStudentID = document.createElement('input');
            ckbStudentID.setAttribute("class", "ckbID");
            ckbStudentID.setAttribute("type", "checkbox");
            ckbStudentID.setAttribute("value", data.studentID);
            tdCheckBox.appendChild(ckbStudentID);

            let tdButton = document.createElement('td');
            let inputButton = document.createElement('input');
            inputButton.id = data.studentID;
            inputButton.setAttribute("class", "editBtt");
            inputButton.setAttribute("type", "button");
            inputButton.setAttribute("value", "EDIT");
            inputButton.setAttribute("onclick", "chooseStudent('" + data.studentID + "')");
            tdButton.appendChild(inputButton);

            let tdStudentID = createTDElement("studentID", data.studentID);
            let tdStudentName = createTDElement("studentName", data.studentName);
            let tdStudentBirth = createTDElement("studentBirth", data.studentBirth);
            let tdStudentEmail = createTDElement("studentEmail", data.studentEmail);
            let tdStudentCountry = createTDElement("studentCountry", data.studentCountry);

            trElement.appendChild(tdCheckBox);
            trElement.appendChild(tdStudentID);
            trElement.appendChild(tdStudentName);
            trElement.appendChild(tdStudentBirth);
            trElement.appendChild(tdStudentEmail);
            trElement.appendChild(tdStudentCountry);
            trElement.appendChild(tdButton);

            form.appendChild(trElement);
        }
    };

    this.addStudent = function (student) {
        this.studentData.push(student);
    };

    this.editStudent = function (student) {
        for (let i = 0; i < this.studentData.length; i++) {
            let update = this.studentData[i];
            if (student.studentID === update.studentID) {
                update.studentName = student.studentName;
                update.studentBirth = student.studentBirth;
                update.studentEmail = student.studentEmail;
                update.studentCountry = student.studentCountry;
            }

        }
    };

    this.removeStudent = function (arr) {
        let tempArr = [];
        let check = true;
        for (let i = 0; i < this.studentData.length; i++) {
            check = true;
            for (let j = 0; j < arr.length; j++) {
                let student = this.studentData[i];
                if (arr[j] === student.studentID) {
                    check = false;
                    continue;
                }
            }
            if (check) {
                tempArr.push(this.studentData[i]);
            }
        }
        this.studentData = tempArr;
    };

    this.getStudentID = function (id) {
        for (let i = 0; i < this.studentData.length; i++) {
            let std = this.studentData[i];
            if (std.studentID === id) {
                return std;
            }
        }
        return null;
    };

    this.checkStudentID = function (id) {
        for (let i = 0; i < this.studentData.length; i++) {
            let std = this.studentData[i];
            if (std.studentID === id) {
                return true;
            }
        }
    };

    this.searchStudent = function (keyword) {
        let student = new StudentList();
        for (let i = 0; i < this.studentData.length; i++) {
            let str = this.studentData[i];
            if (str.studentName.toLowerCase().trim().search(keyword.toLowerCase().trim()) !== -1) {
                student.addStudent(str);
            }
        }
        return student;
    };
}

let stdList = new StudentList();

function createTDElement(className, value) {
    let td = document.createElement("td");
    td.className = className;
    td.innerHTML = value;
    return td;
}

function checkEmailValid(value) {
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(value);
}

function addForm() {
    let addButton = document.getElementById("buttonAddForm");
    let addForm = document.getElementById("addStd");
    if (addButton.value === "Add Student") {
        addForm.style.display = 'block';
        addButton.value = "Close";
    } else {
        addForm.style.display = 'none';
        addButton.value = "Add Student";
    }
}

function addNewStudent() {
    let studentID = document.getElementById("studentID").value;
    let studentName = document.getElementById("studentName").value;
    let studentBirth = document.getElementById("studentBirth").value;
    let studentEmail = document.getElementById("studentEmail").value;
    let studentCountry = document.getElementById("studentCountry").value;
    let std = new Student(studentID, studentName.toUpperCase(), studentBirth, studentEmail.toLowerCase(), studentCountry);
    if (studentID === "" || studentName === "" || studentBirth === "" || studentEmail === "" || studentCountry === "") {
        alert("Please Input Before Submit");
    } else if (studentID === "") {
        alert("Please Input Student ID");
    } else if (stdList.checkStudentID(studentID)) {
        alert("ID existed. Please input again");
    } else if (studentName === "") {
        alert("Please Input A Name");
    } else if (studentBirth === "") {
        alert("Please Input Date of Birth")
    } else if (studentEmail === "") {
        alert("Please Input Email")
    } else if (!checkEmailValid(studentEmail)) {
        alert("Email no valid. Please input again");
    } else {
        stdList.addStudent(std);
        stdList.showStudentList(stdList);
        document.getElementById("studentID").value = "";
        document.getElementById("studentName").value = "";
        document.getElementById("studentBirth").value = "";
        document.getElementById("studentEmail").value = "";
    }
}

function chooseStudent(id) {
    let student = stdList.getStudentID(id);
    let saveField = document.getElementById("editStd");
    if (student != null) {
        saveField.style.opacity = "1";
        saveField.style.height = "100%";
        document.getElementById("editID").value = student.studentID;
        document.getElementById("editName").value = student.studentName;
        document.getElementById("editBirth").value = student.studentBirth;
        document.getElementById("editEmail").value = student.studentEmail;
        document.getElementById("editCountry").value = student.studentCountry;
    }
}

function saveEditedStudent() {
    let saveField = document.getElementById("editStd");
    let studentID = document.getElementById("editID").value;
    let studentName = document.getElementById("editName").value;
    let studentBirth = document.getElementById("editBirth").value;
    let studentEmail = document.getElementById("editEmail").value;
    let studentCountry = document.getElementById("editCountry").value;
    let std = new Student(studentID, studentName.toUpperCase(), studentBirth, studentEmail.toLowerCase(), studentCountry);
    if (studentID === "" || studentName === "" || studentBirth === "" || studentEmail === "" || studentCountry === "") {
        alert("Please Input Before Submit");
    } else if (studentID === "") {
        alert("Please Input Student ID");
    } else if (stdList.checkStudentID(studentID)) {
        alert("ID existed. Please input again");
    } else if (studentName === "") {
        alert("Please Input A Name");
    } else if (studentBirth === "") {
        alert("Please Input Date of Birth")
    } else if (studentEmail === "") {
        alert("Please Input Email")
    } else if (!checkEmailValid(studentEmail)) {
        alert("Email no valid. Please input again");
    } else {
        stdList.editStudent(std);
        saveField.style.opacity = "0";
        saveField.style.height = "0";
        stdList.showStudentList(stdList);
    }
}

function cancelEdit() {
    let saveField = document.getElementById("editStd");
    saveField.style.opacity = "0";
    saveField.style.height = "0";
}

function delStudent() {
    let resultConfirm = confirm("Are You Sure!?");
    if (resultConfirm === true) {
        let checked = document.getElementsByClassName("ckbID");
        let recycleBin = [];
        for (let i = 0; i < checked.length; i++) {
            if (checked[i].checked) {
                recycleBin.push(checked[i].value);
            }
        }
        stdList.removeStudent(recycleBin);
        stdList.showStudentList(stdList);
    }
}

function searchStd() {
    let keyword = document.getElementById("keyword").value;
    let result = stdList.searchStudent(keyword);
    stdList.showStudentList(result);
}
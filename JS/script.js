var app = new function () {

  this.el = document.getElementById('employee');

  this.employee = [{ name: "", age: "", Email: "", Mobile: "" }];

  this.FetchAll = function () {
    var data = '';

    if (this.employee.length > 1) {
      for (i = 1; i < this.employee.length; i++) {
        data += '<tr>';
        data += '<td>' + i + '</td>'
        data += '<td>' + this.employee[i].name + '</td>';
        data += '<td>' + this.employee[i].Email + '</td>'
        data += '<td>' + this.employee[i].age + '</td>'
        data += '<td>' + this.employee[i].Mobile + '</td>'
        data += '<td><button onclick="app.Edit(' + i + ',this)">Edit</button></td>';
        data += '<td><button onclick="app.Delete(' + i + ')">Delete</button></td>';
        data += '</tr>';
      }
    }
    return this.el.innerHTML = data;
  };

  this.Add = function () {
    var el1 = document.getElementById('add-name');
    var el2 = document.getElementById('add-age');
    var el3 = document.getElementById('add-email');
    var el4 = document.getElementById('add-Mobile');
    // Get the value
    var Detail = { name: el1.value, age: el2.value, Email: el3.value, Mobile: el4.value };
    if (app.vailidateData(Detail)) {
      if (Detail) {
        // Add the new value
        this.employee.push(Detail);
        el1.value = '';
        el2.value = '';
        el3.value = '';
        el4.value = '';

        // Dislay the new list
        this.FetchAll();
      }
    }
  };
  //Update the Data
  this.Edit = function (item, e) {

    var e1 = e.parentElement.parentElement.children[1];
    var e2 = e.parentElement.parentElement.children[2];
    var e3 = e.parentElement.parentElement.children[3];
    var e4 = e.parentElement.parentElement.children[4];
    var e5 = e.parentElement.parentElement.children[5];
    console.log(e.parentElement.parentElement.children[4])
    console.log(e1)
    console.log(item)

    e.parentElement.parentElement.children[1].innerHTML = `<input type = 'text' id='edit-name' value='${this.employee[item].name}'><span id="NameEr" ></span>`
    e.parentElement.parentElement.children[2].innerHTML = `<input type = 'text' id='edit-email' value='${this.employee[item].Email}'><span id="EmailEr" ></span>`
    e.parentElement.parentElement.children[3].innerHTML = `<input type = 'text' id='edit-age' value='${this.employee[item].age}'><span id="AgeEr" ></span>`
    e.parentElement.parentElement.children[4].innerHTML = `<input type = 'text' id='edit-Mobile' value='${this.employee[item].Mobile}'><span id="MobileEr" ></span>`
    e.parentElement.parentElement.children[5].innerHTML = `<button onclick="app.save(${item},this)">Save</button>`

    this.save = function (i, ele) {
      console.log(ele.parentElement.parentElement.children[1].children[0].value)
      let newName = ele.parentElement.parentElement.children[1].children[0].value
      let newEmail = ele.parentElement.parentElement.children[2].children[0].value
      let newAge = ele.parentElement.parentElement.children[3].children[0].value
      let newMobile = ele.parentElement.parentElement.children[4].children[0].value
      if (this.vailidateEData({ name: newName, Email: newEmail, age: newAge, Mobile: newMobile })) {
        e1.innerHTML = newName;
        e2.innerHTML = newEmail;
        e3.innerHTML = newAge;
        e4.innerHTML = newMobile;
        e5.innerHTML = `<button onclick="app.Edit( ${i},this)">Edit</button>`
        console.log(e1)
        this.employee[i].name = newName
        this.employee[i].age = newAge
        this.employee[i].Email = newEmail
        this.employee[i].Mobile = newMobile
        confirm("Record updted");
      }
    }
  };
  // Form  validation
  this.vailidateData = function (data) {
    let result = true
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!data.Email.match(mailformat)) {
      document.getElementById('EmailErr').innerHTML = "invalid Email"
      result = false;
    }
    else {
      document.getElementById('EmailErr').innerHTML = ""

    }
    let noFormet = /[6-9]{1}[0-9]{9}/
    if (!data.Mobile.match(noFormet)) {
      document.getElementById('MobileErr').innerHTML = "invalid Mobile"
      result = false;
    } else {
      document.getElementById('MobileErr').innerHTML = ""

    }
    if (isNaN(data.age) || data.age < 1 || data.age > 130) {
      document.getElementById('AgeErr').innerHTML =  " The age must be a number between 1 to 100"

      result = false;
    }
    else {
      document.getElementById('AgeErr').innerHTML = ""

    }
    let nameFormet = /[^abc]+/

    if (!data.name.match(nameFormet)) {
      document.getElementById('NameErr').innerHTML = "invalid name"
      result = false;
    }
    else {
      document.getElementById('NameErr').innerHTML = ""

    }
    return result
  }
  //MailId validation
  this.vailidateEData = function (data) {
    let result = true
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!data.Email.match(mailformat)) {
      document.getElementById('EmailEr').innerHTML = "invalid Email"
      result = false;
    }
    else {
      document.getElementById('EmailEr').innerHTML = ""

    }
    //Mobile validation
    let noFormet = /[6-9]{1}[0-9]{9}/
    if (!data.Mobile.match(noFormet)) {
      document.getElementById('MobileEr').innerHTML = "invalid Mobile"
      result = false;
    } else {
      document.getElementById('MobileEr').innerHTML = ""

    }

    // Age validation
    if (isNaN(data.age) || data.age < 1 || data.age > 130) {
      document.getElementById('AgeEr').innerHTML  = "The age must be a number between 1 and 100"

      result = false;
    }
    else {
      document.getElementById('AgeEr').innerHTML = ""

    }
    //Name validation
    let nameFormet = /[^abc]+/

    if (!data.name.match(nameFormet)) {
      document.getElementById('NameEr').innerHTML = "invalid name"
      result = false;
    }
    else {
      document.getElementById('NameEr').innerHTML = ""
    }
    return result
  }

  //Delete Data 
  this.Delete = function (item) {
    confirm("Are you sure..");
    // Delete the current row
    this.employee.splice(item, 1);
    // Display the new list
    this.FetchAll();
  };
}




function createEmployeeRecord(array) {
  let employee = {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  }
  return employee
}

function createEmployeeRecords(arrays) {
  return arrays.map(array => {
    return createEmployeeRecord(array)
  })
}

function createTimeInEvent(employeeRecord, dateString) {
  let updatedRecord = employeeRecord
  updatedRecord.timeInEvents.push({
    type: "TimeIn",
    date: dateString.split(" ")[0],
    hour: parseInt(dateString.split(" ")[1])
  })
  return updatedRecord
}

function createTimeOutEvent(employeeRecord, dateString) {
  let updatedRecord = employeeRecord;
  updatedRecord.timeOutEvents.push({
    type: "TimeOut",
    date: dateString.split(" ")[0],
    hour: parseInt(dateString.split(" ")[1])
  })
  return updatedRecord
}

function hoursWorkedOnDate(employeeRecord, dateString) {
  let hoursWorked; 
    let timeIn = employeeRecord.timeInEvents.find(record => record.date === dateString)
    let timeOut = employeeRecord.timeOutEvents.find(record => record.date === dateString)
    hoursWorked = (timeOut.hour - timeIn.hour)/100
  return hoursWorked
}

function wagesEarnedOnDate(employeeRecord, dateString) {
  let payOwed;
    payOwed = hoursWorkedOnDate(employeeRecord, dateString) * employeeRecord.payPerHour
  return payOwed
}

function allWagesFor(employeeRecord) {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  let workedDates = employeeRecord.timeInEvents.map(obj => obj.date) 
  let payable = []; 
  for (let i = 0; i < workedDates.length; i++){
    payable.push(wagesEarnedOnDate(employeeRecord, workedDates[i])) 
  }
  return payable.reduce(reducer, 0)
}

function findEmployeeByFirstName(srcArray, firstNameString) {
  console.log(srcArray.find(record => record.firstName === firstNameString))
  return srcArray.find(record => record.firstName === firstNameString)
}

function calculatePayroll(employeesRecord) {
  let payRolls = employeesRecord.reduce(function (acc, employee) {
    return acc + allWagesFor(employee)
  }, 0)
  return payRolls
}
const user = document.querySelector('.profile-header-name').innerText
const reports = document.querySelectorAll('.report')
const cards = document.querySelectorAll('.card')


async function getUserData(user) {
  const url = 'https://my-json-server.typicode.com/idesmar/practiceAPI/db'
  const res = await fetch(url)
  const data = await res.json()
  const userData = await data[user]
  return userData
}

const defaultReportRequest = reports.forEach(report => {
  if (report.classList.contains('selected')) {
    initializeRequest(report)
  }
})

const dynamicReportRequest = reports.forEach(report => {
  report.addEventListener('click', (e) => {
    let selected = e.target
    resetSelected()
    if (selected) {
      report.classList.add('selected')
      initializeRequest(report)
    }
  })
})

function resetSelected() {
  reports.forEach(report => report.classList.remove('selected'))
}

function initializeRequest(report) {
  getUserData(user)
    .then(userData => {
      report = report.innerText.toLowerCase()
      populateCards(userData, report)
    })
    .catch(error => {
      setTimeout(() => {
      alert(error)
      }, 2000)} // * 2 sec delay of error alert
  )
}

function populateCards(userData, report) {
  let msgForPreviousReport = getMsgForPreviousReport(report)
 
  cards.forEach(card => {
    let title = card.firstElementChild.innerText
    let userCategory = userData.find(category => category.title === title)
    let timeframe = userCategory.timeframes
    let reportData = timeframe[report]

    card.lastElementChild.innerHTML =
    `
    <li class='current'>${reportData.current}hrs</li>
    <li class='previous'>${msgForPreviousReport} - ${reportData.previous}hrs</li>
    `
  })
}

function getMsgForPreviousReport(report) {
  switch (report) {
    case 'daily':
      return 'Yesterday'
    case 'weekly':
      return 'Last Week'
    case 'monthly':
      return 'Last Month'
    default:
      return 'error'
  }
}

'use strict'

const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function question1() {
  return new Promise((resolve, reject) => {
    rl.question('q1 What do you think of Node.js? ', (answer) => {
      console.log(`Thank you for your valuable feedback: ${answer}`)
      resolve()
    })
  })
}

function question2() {
  return new Promise((resolve, reject) => {
    rl.question('q2 What do you think of Node.js? ', (answer) => {
      console.log(`Thank you for your valuable feedback: ${answer}`)
      resolve()
    })
  })
}

function main() {
  question1().then()
  question2()
  rl.close()
}

main()
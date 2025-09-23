import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'   

const MAGIC_NUMBER = 42
let greeting = 'Hello Neon world!'
var dinamicValue = `Time: ${new Date().toLocaleTimeString()}`

export class TerminalBasics {
    constructor(name) {
        this.name = name
    }

    sayHello() {
        console.log(`${this.name} says: ${greeting}`)
    }

    calculate(x = MAGIC_NUMBER) {
        if (x > 10 && x !== MAGIC_NUMBER) {
            return x * 2
        } else {
            return MAGIC_NUMBER
        }
    }
}

const fetchData = async (url) => {
    try {
        const response = await fetch(url)
        const data = await response.json()
        console.log('Fetched data:', data)
    } catch (error) {
        console.error('❌ Error fetching data', error)
    }
}

const demo = new TerminalBasics('Anna')
demo.sayHello()
console.log('calculation result →', demo.calculate(7))

fetchData('https://api.github.com')

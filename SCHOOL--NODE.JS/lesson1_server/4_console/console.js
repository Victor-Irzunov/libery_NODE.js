//Раздел 2:Основы NodeJS
// №17 - Работа с консолью



// console.log(process.argv)

function consoleToJSON() {
	const c = {}

	for (let i = 2; i < process.argv.length; i++) {
		const arg = process.argv[i].split('=')
		// console.log(arg, '--------')
		c[arg[0]] = arg[1] ? arg[1] : true                //c[arg[0]] = arg[1]      ключ = значение
	}
	return c
}
console.log(consoleToJSON())

// let f = consoleToJSON()
// console.log(f)

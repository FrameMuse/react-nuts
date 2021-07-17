import { execSync } from "child_process"
import { existsSync, mkdirSync, readdirSync, readFileSync } from "fs"
// import shelljs from "shelljs"
import { getPath, mkdir, revealVars } from "./scripts/command.js"


const bin = getPath(import.meta.url)
const tpwd = bin + "/TPWD"
const vars = { bin, tpwd }

const execute = command => execSync(command, console.log)
const runTaskSync = task => execute(revealVars(`cd ${tpwd} && PWD="${tpwd}" ` + task, vars))
const expectToExist = path => expect(existsSync(tpwd + "/" + path)).toBeTruthy()

describe("Clear TPWD", () => {
  runTaskSync("rimraf $tpwd")
  mkdirSync(tpwd)
  expect(readdirSync(tpwd).length).toBeFalsy()
})

describe("Commands", () => {
  describe("Build arch", () => {
    runTaskSync("node $bin/deliver-some-nuts.js")
    test("if all directories exist", () => {
      const dirs = [
        "src",
        "src/app",
        "src/app/controllers",
        "src/app/components",
        "src/app/reducers",
        "src/app/hooks",
        "src/app/api",
        "src/assets",
        "src/assets/scss",
        "src/assets/fonts",
        "src/routes",
        "src/views"
      ]
      dirs.forEach(expectToExist)
    })
    test("if all files exist", () => {
      const files = [
        "src/views/index.tsx",
        "src/assets/scss/base.scss",
        "src/app/reducers/master.ts",
        "src/routes/origin.ts",
        "src/app/reducers/reducers.map.json"
      ]
      files.forEach(expectToExist)
    })
  })
  describe("Create component", () => {
    runTaskSync("node $bin/create-component.js MilkyWay")
    test("if component 'MilkyWay' exists", () => {
      expectToExist("src/app/components/MilkyWay")
      expectToExist("src/app/components/MilkyWay/MilkyWay.tsx")
      expectToExist("src/app/components/MilkyWay/MilkyWay.test.ts")
      expectToExist("src/app/components/MilkyWay/MilkyWay.style.scss")
    })
  })
  describe("Create reducer", () => {
    runTaskSync("node $bin/create-reducer.js user")
    test("if reducer 'user' exists", () => {
      expectToExist("src/app/reducers/user.ts")
    })
  })
  describe("Create view", () => {
    runTaskSync("node $bin/create-view.js about EXACT_PATH")
    const route = readFileSync(tpwd + "/src/routes/origin.ts").toString().split("\r").pop()
    test("if view 'about' with flags: ( EXACT_PATH ) exists", () => {
      expectToExist("src/views/about")
      expectToExist("src/views/about/index.ts")
      expectToExist("src/routes/origin.ts")
      expect(route).toBe(`Route.path("about", view("about"), "EXACT_PATH")`)
    })
  })
})
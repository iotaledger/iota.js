const path = require('path')
const fs = require('fs')
const { spawn } = require('child_process')

const PREFIX = 'iota'
const PACKAGES_DIR = 'packages'
const ROOT_PKG = 'iota-js'

const prefix = `@${PREFIX}/`

let staged = new Set()

const getDeps = (root, depth = 100) => {
    if (staged.has('*')) {
        return
    }

    let cd = path.join(path.resolve(__dirname, '../'), path.dirname(root))
    let i = 0
    let pkg

    while (true) {
        if (!pkg && fs.existsSync(path.join(cd, 'package.json'))) {
            pkg = JSON.parse(fs.readFileSync(path.join(cd, 'package.json'), 'utf8')).name

            if (pkg === ROOT_PKG) {
                staged = new Set()
                staged.add('*')
                break
            }
        }

        if (i++ > depth) {
            console.log('Error: Could not locate package.json')
            process.exit(1)
        }

        if (pkg && fs.existsSync(path.join(cd, PACKAGES_DIR))) {
            fs.readdirSync(path.join(cd, PACKAGES_DIR)).forEach(file => {
                const pkgFile = path.join(cd, PACKAGES_DIR, file, 'package.json')

                if (!fs.existsSync(pkgFile)) {
                    return
                }

                const { name, dependencies, devDependencies, scripts } = JSON.parse(fs.readFileSync(pkgFile, 'utf8'))

                if (name.slice(0, prefix.length) !== prefix) {
                    return
                }

                if (!scripts.hasOwnProperty('test')) {
                    return
                }

                const deps = Object.keys(Object.assign({}, dependencies, devDependencies))
                    .filter(x => x.slice(0, prefix.length) === prefix)
                    .map(x => x.slice(prefix.length))

                if (deps.indexOf(pkg.slice(prefix.length)) > -1 && !staged.has(name)) {
                    staged.add(name)
                }
            })

            break
        }

        cd = cd
            .split('/')
            .slice(0, -1)
            .join('/')
    }
}

sfg((err, results) => {
    if (err) {
        console.log(err) && process.exit(1)
    }

    results.forEach(item => getDeps(item.filename))

    const cmd = pkg => `lerna run test --scope ${pkg}`

    const tasks =
        Array.from(staged).indexOf('*') > -1
            ? fs
                  .readdirSync(path.resolve(__dirname, '../packages'))
                  .map(pkgDir => {
                      const pkgFile = path.resolve(__dirname, path.join('../', PACKAGES_DIR, pkgDir, 'package.json'))

                      if (fs.existsSync(pkgFile)) {
                          const { scripts, name } = JSON.parse(fs.readFileSync(pkgFile, 'utf8'))

                          if (name.slice(0, prefix.length) === prefix && scripts.hasOwnProperty('test')) {
                              return name
                          }
                      }
                      return null
                  })
                  .filter(pkgDir => pkgDir)
                  .map(cmd)
            : Array.from(staged).map(cmd)

    const codes = []

    let sigSent = false

    const subprocesses = tasks.map((task, i, _) => spawn(task, { shell: true, stdio: 'inherit' }))

    subprocesses.forEach((subprocess, i) =>
        subprocess.on('exit', code => {
            if (code > 0 && !sigSent) {
                codes.push(code)

                sigSent = true

                console.log(`\nTests failed! ${tasks[i]} exited code ${code}.`)

                subprocesses.forEach((_subprocess, j) => {
                    if (!_subprocess.killed && _subprocess.kill && typeof _subprocess.kill === 'function' && j !== i) {
                        _subprocess.kill('SIGINT')
                    }
                })
            }

            if (codes.length === tasks.length) {
                console.log(codes)
                process.exit(codes.every(code => code === 0) ? 0 : 1)
            }
        })
    )

    process.on('SIGINT', () => {
        if (codes.length !== tasks.length) {
            subprocesses.forEach(subprocess => {
                if (subprocess.connected) {
                    subprocess.kill('SIGINT')
                }
            })
        }
    })
})

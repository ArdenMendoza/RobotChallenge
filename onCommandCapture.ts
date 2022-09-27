export const captureInput = (onKeyPressCapture: (keyName: string) => void) => {
    require("readline").emitKeypressEvents(process.stdin)
    // process.stdin.setRawMode(true)

    process.stdin.on("keypress", (char: any, evt: any) => {
        // console.log("=====Key pressed=====")
        // console.log("Char:", JSON.stringify(char), "Evt:", JSON.stringify(evt))

        // if (char === "h") console.log("Hello World!")
        // if (char === "q") process.exit()
        // if (evt.ctrl === true && evt.name === 'c') process.exit(0)
        onKeyPressCapture(char)
    })
}


export const captureInput2 = () => {
    var keypress = require('keypress')

    // make `process.stdin` begin emitting "keypress" events
    keypress(process.stdin)

    // listen for the "keypress" event
    process.stdin.on('keypress', function (ch, key) {
        console.log('got "keypress"', key)
        if (key && key.ctrl && key.name == 'c') {
            process.stdin.pause()
        }
    })

    // process.stdin.setRawMode(true)
    process.stdin.resume()
}
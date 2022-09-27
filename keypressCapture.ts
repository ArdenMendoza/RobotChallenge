export const captureInput = (onKeyPressCapture: (keyName: string) => void) => {
    require("readline").emitKeypressEvents(process.stdin)
    process.stdin.setRawMode(true)

    process.stdin.on("keypress", (char, evt) => {
        // console.log("=====Key pressed=====")
        // console.log("Char:", JSON.stringify(char), "Evt:", JSON.stringify(evt))

        if (char === "h") console.log("Hello World!")
        if (char === "q") process.exit()
        if (evt.ctrl === true && evt.name === 'c') process.exit(0)
        onKeyPressCapture(evt.name)
    })
}
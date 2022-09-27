import { captureInput } from './keypressCapture'

captureInput((keyName: string) => console.log({ keyName }))
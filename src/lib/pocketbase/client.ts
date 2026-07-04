import PocketBase from 'pocketbase'

const BACKEND_URL =
  import.meta.env.VITE_POCKETBASE_URL ||
  'https://app-trilha-aprendizado-ba831.shrd00.internal.goskip.dev'

const pb = new PocketBase(BACKEND_URL)
pb.autoCancellation(false)

export default pb

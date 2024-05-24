import { render, h, VNode } from 'vue'
import PromptDialog from './PromptDialog.vue'

const renderContent = (content: VNode | null) => render(content, document.getElementById('prompt')!)

const askUser = (message: string | null = null) => {
  return new Promise((resolve, reject) => {
    const childTree = h(PromptDialog, {
      message,
      onClose: () => {
        renderContent(null)
        reject(new Error())
      },
      onConfirm: () => {
        renderContent(null)
        resolve(true)
      },
    })
    renderContent(childTree)
  })
}

export default askUser

import { ElMessage } from 'element-plus'
import type { VNode } from 'vue'

export default function showMessage(
  message: string | VNode | (() => VNode),
  type: 'success' | 'warning' | 'info' | 'error'
) {
  ElMessage({
    message,
    type
  })
}

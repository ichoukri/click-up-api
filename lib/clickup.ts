const CLICKUP_API_TOKEN = process.env.NEXT_PUBLIC_CLICKUP_API_TOKEN
const CLICKUP_LIST_ID = process.env.NEXT_PUBLIC_CLICKUP_LIST_ID

if (!CLICKUP_API_TOKEN || !CLICKUP_LIST_ID) {
  console.log(CLICKUP_API_TOKEN, CLICKUP_LIST_ID)
  throw new Error('ClickUp API token or List ID is not set')
}


export async function getClickUPList() {
  const response = await fetch(`https://api.clickup.com/api/v2/list/${CLICKUP_LIST_ID}`, {
    headers: {
      'Authorization': CLICKUP_API_TOKEN ?? '',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch list from ClickUp')
  }

  return await response.json()
}

export async function getClickUpTasks() {
  const response = await fetch(`https://api.clickup.com/api/v2/list/${CLICKUP_LIST_ID}/task`, {
    headers: {
      'Authorization': CLICKUP_API_TOKEN ?? '',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch tasks from ClickUp')
  }

  const data = await response.json()
  return data.tasks
}

export async function updateTaskStatus(taskId: string, newStatus: string) {
  const response = await fetch(`https://api.clickup.com/api/v2/task/${taskId}`, {
    method: 'PUT',
    headers: {
      'Authorization': CLICKUP_API_TOKEN ?? '',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      status: newStatus,
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to update task status')
  }

  return await response.json()
}
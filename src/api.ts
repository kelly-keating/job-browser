export function refreshJobs() {
  return window.api.refreshJobs()
}

export function getJobs() {
  return window.api.getJobs()
}

export function getUrls() {
  return window.api.getUrls()
}

export function addUrl(name: string, url: string) {
  return window.api.addUrl(name, url)
}

export function deleteUrl(id: number) {
  return window.api.deleteUrl(id)
}

export function updateUrlName(id: number, name: string) {
  return window.api.updateUrlName(id, name)
}

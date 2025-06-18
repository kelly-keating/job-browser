interface UrlInfo {
  domain: string
  searchTerm: string
  location: string
  params: Record<string, string>
  isValid: boolean
  error: string
}

/*
  url: 'https://www.seek.co.nz/React-Developer-jobs/in-All-Wellington?sortmode=ListedDate',
  {
    "domain": "www.seek.co.nz",
    "searchTerm": "React Developer",
    "location": "All Wellington",
    "params": {
      "sortmode": "ListedDate"
    }
  }
*/

export function validateUrlInfo(url: string): UrlInfo {
  try {
    let isValid = true
    let error = ''
    const setErr = (err: string) => {
      if (!error) {
        isValid = false
        error = err
      }
    }

    const seekUrl = new URL(url)

    const domain = seekUrl.hostname
    if (!isSeekDomain(domain))
      setErr('Invalid domain - Try seek.co.nz or seek.com.au')

    // pathname: /React-Developer-jobs/in-All-Wellington
    const pathParts = seekUrl.pathname.split('/').filter(Boolean)
    let [searchTerm, location] = pathParts
    if (!searchTerm || !searchTerm.includes('-jobs'))
      setErr('Invalid URL - Missing search term.')
    if (!location || !location.startsWith('in-'))
      setErr('Invalid URL - Missing location.')

    // React-Developer-jobs >> React Developer and in-All-Wellington >> All Wellington
    searchTerm = searchTerm.replace(/-jobs$/, '').replace(/-/g, ' ')
    location = location.replace(/^in-/, '').replace(/-/g, ' ')

    const params: Record<string, string> = {}
    seekUrl.searchParams.forEach((value, key) => {
      params[key] = value
    })

    return {
      domain,
      searchTerm,
      location,
      params,
      isValid,
      error,
    }
  } catch (error) {
    return {
      domain: '',
      searchTerm: '',
      location: '',
      params: {},
      isValid: false,
      error: 'Invalid URL - Please check it and try again.',
    }
  }
}

function isSeekDomain(domain: string): boolean {
  const seekDomains = ['www.seek.co.nz', 'seek.com.au']
  return seekDomains.includes(domain)
}

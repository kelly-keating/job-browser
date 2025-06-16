import { FormEvent } from 'react'
import { useUrls } from '../queries/useUrls'

function SearchManager() {
  const { data: urls, isLoading, error } = useUrls()

  // TODO: do something with these
  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const handleAddUrl = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    // const formData = new FormData(evt.currentTarget)
    // const url = formData.get('url') as string
    // const name = formData.get('name') as string

    // if (url && name) {
    //   addUrl(name, url) // <----- TODO this but query
    //   evt.currentTarget.reset()
    // }
  }

  return (
    <>
      <h2>SearchManager</h2>
      <p>Form to add new url</p>
      <form onSubmit={handleAddUrl}>
        <input type='text' placeholder='Enter URL' />
        <input type='text' placeholder='Enter Name' />
        <button type='submit'>Add URL</button>
      </form>
      <p>List of URLs to manage</p>
      <ul>
        {urls?.map((url) => (
          <li key={url.id}>
            {url.name} - {url.url}
          </li>
        ))}
      </ul>
    </>
  )
}

export default SearchManager

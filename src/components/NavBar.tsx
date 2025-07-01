import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <div>
      <h2>NavBar</h2>
      <div>
        <Link to='/'>Job List</Link>
        <Link to='/jobs-saved'>Saved Jobs</Link>
        <Link to='/jobs-applied'>Applied Jobs</Link>
        <Link to='/jobs-hidden'>Hidden Jobs</Link>
        <Link to='/searches'>Searches</Link>
      </div>
    </div>
  )
}

export default NavBar

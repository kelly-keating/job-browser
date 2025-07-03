import { useLocation } from 'react-router-dom'
import { NavTabLink, NavTabList } from './ui'

function NavBar() {
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className='h-navbar'>
      <NavTabList>
        <div className='grid grid-cols-5 max-w-3xl w-full mx-auto '>
          <NavTabLink to='/' active={isActive('/')}>
            Job Listings
          </NavTabLink>
          <NavTabLink to='/jobs-saved' active={isActive('/jobs-saved')}>
            Saved Jobs
          </NavTabLink>
          <NavTabLink to='/jobs-applied' active={isActive('/jobs-applied')}>
            Applied Jobs
          </NavTabLink>
          <NavTabLink to='/jobs-hidden' active={isActive('/jobs-hidden')}>
            Hidden Jobs
          </NavTabLink>
          <NavTabLink to='/searches' active={isActive('/searches')}>
            Searches
          </NavTabLink>
        </div>
      </NavTabList>
    </nav>
  )
}

export default NavBar

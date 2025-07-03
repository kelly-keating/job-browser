import { useLocation } from 'react-router-dom'
import { NavTabLink, NavTabList } from './ui'

function NavBar() {
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className='h-navbar'>
      <NavTabList className='grid w-full grid-cols-5'>
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
      </NavTabList>
    </nav>
  )
}

export default NavBar

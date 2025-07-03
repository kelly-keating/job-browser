import { useDarkMode } from './hooks/darkModeContext'
import { Label, PageHeader, Switch } from './ui'

function Settings() {
  const { isDark, toggle } = useDarkMode()

  return (
    <>
      <PageHeader>
        <h2>Settings</h2>
      </PageHeader>
      <div>
        <div className='flex items-center space-x-2'>
          <Switch
            id='dark-mode'
            data-state={isDark ? 'on' : 'off'}
            onClick={toggle}
          />
          <Label htmlFor='dark-mode'>Dark Mode</Label>
        </div>
      </div>
    </>
  )
}

export default Settings

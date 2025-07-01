import * as React from 'react'
import { Satellite } from 'lucide-react'

import { cn } from '@/lib/utils'

function TopBar({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'topbar flex items-center justify-between h-8 px-2 bg-zinc-800 text-white select-none',
        className
      )}
      {...props}
    >
      <div className='flex items-center'>
        <Satellite className='mr-2 h-4 w-4' />
        <p>JobSeeker</p>
      </div>
      <button
        className='no-drag text-white px-2'
        aria-label='Minimize'
        onClick={() => window.api.minimize()}
      >
        —
      </button>
    </div>
  )
}

export { TopBar }

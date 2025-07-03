import * as React from 'react'
import { Satellite } from 'lucide-react'

import { cn } from '@/lib/utils'

function TopBar({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'draggable h-topbar flex  items-center justify-between h-8 px-2 bg-zinc-800 text-white select-none',
        className
      )}
      {...props}
    >
      <div className='flex items-center gap-2'>{children}</div>
      <div className='flex-none no-drag flex items-center gap-2'>
        <button
          className='no-drag text-white px-2'
          aria-label='Minimize'
          onClick={() => window.api.minimize()}
        >
          -
        </button>
        <button
          className='no-drag text-white px-2'
          aria-label='Close'
          onClick={() => window.api.close()}
        >
          X
        </button>
      </div>
    </div>
  )
}

export { TopBar }

import NavigationItem from './NavigationItem'
import { navigationItems } from './navigation.data'

const Navigation = () => {
  return (
    <nav className='mt-auto mb-5'>
      <ul className='px-14 mt-3.5 h-[52px] w-[90%] mx-auto bg-white rounded-[27px] shadow-default py-2 flex items-center justify-between sm:w-4/5 sm:h-[95px] sm:rounded-[48px] lg:w-[795px] lg:gap-[120px] lg:justify-center'>
        {navigationItems.map((i) => (
          <NavigationItem key={i.url} {...i} />
        ))}
      </ul>
    </nav>
  )
}

export default Navigation

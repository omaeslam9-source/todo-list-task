import { Check } from 'lucide-react'

function Header() {
  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-mark">
          <Check size={19} strokeWidth={3} />
        </div>

        <span>TODO</span>
      </div>
    </header>
  )
}

export default Header
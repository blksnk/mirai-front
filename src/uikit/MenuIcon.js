import React from 'react'

const MenuIcon = ({ active }) => <svg className={`menuIcon ${active ? 'active' : ''}`} width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="24" height="4" fill="#273644"/>
<rect x="5" y="7" width="19" height="4" fill="#273644"/>
<rect x="2" y="14" width="22" height="4" fill="#273644"/>
</svg>

export default MenuIcon
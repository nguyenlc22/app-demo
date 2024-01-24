// import libs
import React from 'react'
import { NavLink } from 'react-router-dom'

// import data
import { pagesMenu, uiElementsMenu } from '@src/common/data/Menu'

export default SidebarMenu = (props) => {
  const populateMenu = (m) => {
    const menu = m.map((m, key) => {
      let sm
      if (m.submenu) {
        sm = m.submenu.map((sm, key) => {
          return (
            <NavLink to={sm.link} className='nav-sub-link' key={key}>
              {sm.label}
            </NavLink>
          )
        })
      }

      return (
        <li key={key} className='nav-item'>
          {!sm ? (
            <NavLink to={m.link} className='nav-link'>
              <i className={m.icon}></i> <span>{m.label}</span>
            </NavLink>
          ) : (
            <div onClick={toggleSubMenu} className='nav-link has-sub'>
              <i className={m.icon}></i> <span>{m.label}</span>
            </div>
          )}
          {m.submenu && <nav className='nav nav-sub'>{sm}</nav>}
        </li>
      )
    })

    return <ul className='nav nav-sidebar'>{menu}</ul>
  }

  // Toggle menu group
  const toggleMenu = (e) => {
    e.preventDefault()

    const parent = e.target.closest('.nav-group')
    parent.classList.toggle('show')

    props.onUpdateSize()
  }

  // Toggle submenu while closing siblings' submenu
  const toggleSubMenu = (e) => {
    e.preventDefault()

    const parent = e.target.closest('.nav-item')
    let node = parent.parentNode.firstChild

    while (node) {
      if (node !== parent && node.nodeType === Node.ELEMENT_NODE) node.classList.remove('show')
      node = node.nextElementSibling || node.nextSibling
    }

    parent.classList.toggle('show')

    props.onUpdateSize()
  }

  return (
    <React.Fragment>
      <div className='nav-group show'>
        <div className='nav-label' onClick={toggleMenu}>
          Admin
        </div>
        {populateMenu(pagesMenu)}
      </div>
      <div className='nav-group show'>
        <div className='nav-label' onClick={toggleMenu}>
          UI Elements
        </div>
        {populateMenu(uiElementsMenu)}
      </div>
    </React.Fragment>
  )
}

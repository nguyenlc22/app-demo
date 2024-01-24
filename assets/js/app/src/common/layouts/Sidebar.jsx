// import libs
import React, { Component, useState } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Link, NavLink } from 'react-router-dom'

// import components
import SidebarMenu from '@src/common/layouts/components/SidebarMenu'

export default SideBar = () => {
  let _scrollBarRef

  return (
    <div className='sidebar'>
      <div className='sidebar-header'>
        <Link to='/' className='sidebar-logo'>
          App Demo
        </Link>
      </div>
      <PerfectScrollbar className='sidebar-body' ref={(ref) => (_scrollBarRef = ref)}>
        <SidebarMenu onUpdateSize={() => _scrollBarRef.updateScroll()} />
      </PerfectScrollbar>
    </div>
  )
}

window.addEventListener('click', function (e) {
  // Close sidebar footer menu when clicked outside of it
  let tar = e.target

  // Hide sidebar offset when clicked outside of sidebar
  if (!tar.closest('.sidebar') && !tar.closest('.menu-link')) {
    document.querySelector('body').classList.remove('sidebar-show')
  }
})

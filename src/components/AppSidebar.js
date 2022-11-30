import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
// sidebar nav config
import navigation from '../_nav'
import { AppSidebarNav } from './AppSidebarNav'


const AppSidebar = () => {
    const dispatch = useDispatch()
    const unfoldable = useSelector((state) => state.sidebarUnfoldable)
    const sidebarShow = useSelector((state) => state.sidebarShow)

    return (
        <CSidebar
            className="my_csidebar"
            position="fixed"
            unfoldable={unfoldable}
            visible={sidebarShow}
            onVisibleChange={(visible) => {
                dispatch({ type: 'set', sidebarShow: visible })
            }}
        >
            <CSidebarBrand className="d-none d-md-flex" to="/">
                {/* <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} />
                <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} /> */}
                <img className="m-3" src="./assets/logo-admin.png" alt="logo"  />
            </CSidebarBrand>
            <CSidebarNav className="my_csidebarnav">
                <SimpleBar>
                    <AppSidebarNav items={navigation} />
                </SimpleBar>
            </CSidebarNav>
            {/* <CSidebarToggler
                className="d-none d-lg-flex"
                onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
            /> */}
        </CSidebar>
    )
}

export default React.memo(AppSidebar)

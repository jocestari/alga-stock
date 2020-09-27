import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import { RootState } from '../../redux'
import { logout } from '../../redux/Authentication/Authentication.actions'
import { User } from '../../services/Authentication.service'
import { Product } from '../../shared/Table/Table.mockdata'
import './Header.css'

declare interface HeaderProps {
    title: string
    firstProduct: Product
    profile?: User
}

const Header: React.FC<HeaderProps> = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const isLoggedIn = !!props.profile?._id

    function out(){
        dispatch(logout())
        history.push('/login')
    }
    
    const askToLogout = () => {
        Swal
        .fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#09f',
        cancelButtonColor: '#d33'
        })
        .then(({value}) => value && out()
         )
    }


    const handleLoginLogout = () => {
       if(isLoggedIn){
            askToLogout() 
       } else {
            history.push('/login')
       }
    }

    const handleHome = () => {
        history.push('/')
    }

    const handleProfile = () => {
        history.push('/profile')
    }
    
    return <header className="AppHeader">
        <h1>{ props.title }</h1>
        <div>
            <span onClick={handleHome}>
                Home               
            </span> | 
            <span onClick={handleProfile}>
                Profile               
            </span> |
            <span onClick={handleLoginLogout}>
                Logout               
            </span>

        </div>
    </header>
}

const mapStateToProps = (state: RootState) => ({
    firstProduct: state.products[0],
    profile: state.authentication.profile
})

export default connect(mapStateToProps) (Header)
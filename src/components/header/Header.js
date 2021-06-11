import React from 'react';
import Logo from './logo2.png';

const Header = () => {
    return (

        <div className={"header"}>
            <div className={"menu"}>
                <img className={"menu_logo"} src={Logo} alt='website logo' />
                
                <ul>
                    <li>About us</li>
                    <li>Get in touch</li>
                    <li>Log in</li>
                    <li>Sign up</li>
                </ul>
            </div>

            <p className={'header1'}>Looking for purrfessional consultancy services? We got you.</p>
            <p className={'header2'}>Our well-educated, furry experts are here to help. Simply select the cat that’s right for you and head to the cart. You won’t regret it!</p>
        </div>
    )
}

export default Header

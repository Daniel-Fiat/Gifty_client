import { useContext } from 'react';
import './ProfilePage.css'
import { AuthContext } from '../../../context/auth.context';

const Profile = () => {
    const { user } = useContext(AuthContext);
    localStorage.setItem("Navbar", true);
    return (
        <>
            <h1>profile</h1>
            <h1>{user.email}</h1>
        </>
    );

}

export default Profile;
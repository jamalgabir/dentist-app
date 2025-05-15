import React from 'react';

const Footer = () => {
    return (
        <footer>
            <p>&copy; {new Date().getFullYear()} Dentist Smiles. All rights reserved.</p>
            <p>Follow us on <a href=" ">Facebook</a> | <a href=" ">Instagram</a> | <a href=" ">Twitter</a></p>
        </footer>
    );
};

export default Footer;
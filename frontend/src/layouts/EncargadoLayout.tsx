//import React from 'react';
import { Outlet } from 'react-router-dom';
import EncargadoNavbar from '../components/EncargadoNavbar';

export default function EncargadoLayout() {
    return (
        <>
            <EncargadoNavbar/>
            <main>
                <Outlet/>
            </main>
        </>
    );
}
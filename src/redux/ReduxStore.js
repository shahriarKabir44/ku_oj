import { configureStore } from '@reduxjs/toolkit';
import NavbarDirectoryManager from './NavbarDirectoryManager';
let store = configureStore({
    reducer: {
        NavbarDirectoryManager
    }
})

export default store
import { create } from "zustand";
import { auth } from '../firebase-config'

const authenticationStore = (set: any) => ({
    authStateLoading: false,
    isUserSignedIn: false,
    isUserEmailVerified: false,
    setSignIn: async () => {
        try {
            set({ authStateLoading: true })
            await auth.authStateReady().then(() => {
                if(auth.currentUser) {
                    set({ isUserSignedIn: true })
                    set({ isUserEmailVerified: auth.currentUser.emailVerified })
                } else {
                    set({ isUserSignedIn: false })
                }
            })
        } catch(error) {
            console.error(error)
        } finally {
            set({ authStateLoading: false })
        }
    },
    setEmailVerified: () => {}
})

const useAuthenticationStore = create(authenticationStore)
export default useAuthenticationStore
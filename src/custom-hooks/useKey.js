import { useEffect } from "react"

export function useKey(key, action) {
    useEffect(function () {
        function callBack(e) {
            if (e.code.toLowerCase() === key.toLowerCase()) {
                action()
                // console.log('Escape pressed')
            }
        }
        document.addEventListener('keydown', callBack) // pass same callback function to both events 
        // Clean event listener
        return function () {
            document.removeEventListener('keydown', callBack) // pass same callback function to both events 
        }
    }, [key, action])
}
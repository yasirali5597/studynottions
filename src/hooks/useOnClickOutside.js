import { useEffect } from "react";

// this hooks detect clicks outside of the specified components and call the provide functions 
export default function useOnClickOutside(ref,handler) {
    useEffect(() =>{
        // define the listener function to be called on click / touch events 
        const listener = (event) =>{
            // if the click  and tuoch event originated inside the ref element do nothing 
            if(!ref.curent || ref.current.contains(event.target)) {
                return;
            }
            // otherwise call the provide handler functions 
            handler(event);
        };

        // add event listener for mousedown and touch start events on the document 
        document.addEventListener("mousedown" , listener);
        document.addEventListener("touchsstart" , listener);

        // cleanup function to remove the event listeners when the components unmounts or when 1 
        return () =>{
            document.removeEventListener("mousedown" , listener);
            document.removeEventListener("touchstart" , listener);
        }

        
    }, [ref , handler]);
}
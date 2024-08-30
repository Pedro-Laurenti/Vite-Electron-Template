import { useEffect, useRef } from 'react';
import Scrollbar from 'smooth-scrollbar';
import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll';
import { IoBrush, IoEnter } from "react-icons/io5";
import { Link } from 'react-router-dom';

// Register the overscroll plugin
Scrollbar.use(OverscrollPlugin);

export default function Layout({ children }:any) {
    const scrollbarRef = useRef(null);

    useEffect(() => {
        let scrollbarInstance: Scrollbar;
    
        if (scrollbarRef.current) {
            scrollbarInstance = Scrollbar.init(scrollbarRef.current, {
                plugins: {
                    overscroll: {
                        effect: "bounce",
                    },
                },
            });
        }
    
        return () => {
            if (scrollbarInstance) {
                scrollbarInstance.destroy();
            }
        };
    }, []);
    
    return (
        <div className='w-full h-full' ref={scrollbarRef}>
            <div>
                <Link to="/style">
                    <button className='btn btn-circle btn-ghost fixed right-0 z-10'>
                        <IoBrush />
                    </button>
                </Link>
                <Link to="/">
                    <button className='btn btn-circle btn-ghost fixed right-20 z-10'>
                        <IoEnter />
                    </button>
                </Link>
                {children}
            </div>
        </div>
    );
}
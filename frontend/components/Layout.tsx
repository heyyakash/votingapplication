import React, { ReactNode } from 'react'
import Navbar from './Navbar'
import PollModal from './PollModal'

interface props {
    children: ReactNode
}

const Layout: React.FC<props> = ({ children }) => {
    return (
        <div>
            <PollModal />
            <div className='relative z-0'>
                <Navbar />
                {children}
            </div>
        </div>
    )
}

export default Layout
import { Layers, Circle, Box, GitMerge, List, Truck, AlignJustify, CreditCard } from 'react-feather'

export default [
    {
        header: 'Access (web3)',
        permissionKey:"wallet"
    },
    {
        id: 'wallets',
        title: 'Wallets',
        icon: <CreditCard size={20} />,
        navLink: '/wallets',
        permissionKey:"wallet"
    },
    {
        id: 'nodes',
        title: 'Nodes',
        icon: <GitMerge size={20} />,
        navLink: '/nodes',
        pushtoChildren:true,
        permissionKey:"node"
    }
]

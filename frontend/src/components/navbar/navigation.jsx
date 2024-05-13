import {MdTaskAlt} from 'react-icons/md'
import {BiTask, BiUserCircle} from 'react-icons/bi'

export const publicRoutes = [
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Login",
    path: "/login",
  },
  {
    name: "Registro",
    path: "/register",
  },
]

export const privateRoutes = [
  {
    name: "Pagos",
    path: "/tasks",
    icon: <BiTask className='w-5 h-5' />,
  },
  {
    name: "Agregar",
    path: "/tasks/new",
    icon: <MdTaskAlt className='w-5 h-5' />,
  },
];
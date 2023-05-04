import React from 'react'
import { useRoutes } from 'react-router-dom';
import Layout from './Layout';
import Home from './Home';
import Incoming from './Incoming';
import Outgoing from './Outgoing';
import Login from './Login';
import NotFound from './NotFound';
import StateVectors from './StateVectors';
import TimeInterval from './TimeInterval';
import ByAircraft from './ByAircraft';
import ArrivalAirport from './ArrivalAirport';
import DepartureAirport from './DepartureAirport';

const Routes = () => {
    const element = useRoutes([
        {
            children:[
                {
                   element:<Layout/>,
                     children:[
                      
                      {
                        path:'/home',
                        element:<Home/>
        
                      },
                      {
                        path:'/statevectors',
                        element:<StateVectors/>
        
                      },
                      {
                        path:'/timeinterval',
                        element:<TimeInterval/>
        
                      },
                      {
                        path:'/byaircraft',
                        element:<ByAircraft/>
        
                      },
                      {
                        path:'/arrivalairport',
                        element:<ArrivalAirport/>
        
                      },
                      {
                        path:'/departureairport',
                        element:<DepartureAirport/>
        
                      },
                      {
                        path:'/incoming',
                        element:<Incoming/>
    
                      },
                      {
                        path:'/outgoing',
                        element:<Outgoing/>
                      },
                      {
                        path:'*',
                        element:<NotFound/>
                      },
                             ]
                },
                      ]
        },
        {
            children:[
                {
                  path:'/',
                   element:<Login/>
                }
                    ]
        }
    ])
    
    return element
    }
export default Routes
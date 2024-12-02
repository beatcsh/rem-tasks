import React from 'react';
import './index.css';
import { IonApp, IonTabBar, IonTabButton } from '@ionic/react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; // problemas de versiones
import Home from './pages/Home';
import Login from './pages/Login';
import { Register } from './pages/Register';
import '@ionic/react/css/core.css';

const App: React.FC = () => (
  <IonApp className='bg-white'>
    <Router>
      <Switch>
        {/* Usamos `component` para renderizar los componentes en la version de react-router-dom 5.3.4 */}
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </Router>
    {/* <IonTabBar slot="bottom" className='h-[70px] bg-fondogris flex justify-between place-items-center mx-auto space-x-8 join'>
      <IonTabButton className='font-semibold join-item btn bg-fondogris border-0' tab="logout" href="/">
        <i className='bx bx-log-out text-3xl text-titulos'></i>
      </IonTabButton>
      <IonTabButton className='font-semibold join-item btn bg-fondogris border-0' tab="home" href="/home">
        <i className='bx bxs-home text-3xl text-titulos' ></i>
      </IonTabButton>
      <IonTabButton className='font-semibold join-item btn bg-fondogris border-0' tab="add-zone" href="/addzone">
        <i className='bx bx-current-location text-3xl text-titulos'></i>
      </IonTabButton>
    </IonTabBar> */}
  </IonApp>
);

export default App;


import Check from './Check'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Layout } from './Store/index';
import Login from './Container/Login';
import SignUp from './Container/Signup';
import Navbar from './component/Navbar';
import Faviourate from './Container/Faviourate';
const App=()=>{
    return (
        <>
        <Layout>
            <BrowserRouter>
            <Navbar/>
                <Switch>
                    <Route exact={true} path='/' component={Check}></Route>
                    <Route exact={true} path='/login' component={Login}></Route>
                    <Route exact={true} path='/signup' component={SignUp}></Route>
                    <Route exact={true} path='/faviourate' component={Faviourate}></Route>
                </Switch>
            </BrowserRouter>

        </Layout>
        </>
    )
}

export default App
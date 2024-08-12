import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import SelectPage from './pages/SelectPage';

const App = () => {
    return (
        <div className='App w-full'>
            <div className='APPCONTEUDO w-full '>
                <Router>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <SelectPage />
                            }
                        />
                    </Routes>
                </Router>
            </div>
        </div>
    );
}

export default App;
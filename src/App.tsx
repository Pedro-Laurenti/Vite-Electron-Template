import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import { StylePage, Login } from './pages';
import { Suspense } from 'react';

export default function App() {
    // const faultyVariable = null;
    return (
        <div className='App APPCONTEUDO w-full flex max-h-[100vh] overflow-clip'>
            {/* DESCONSIDERAR <div>{faultyVariable.someProperty}</div> */}
            <Router>
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <Layout>
                                    <Login />
                                </Layout>
                            }
                        />
                        <Route
                            path="/style"
                            element={
                                <Layout>
                                    <StylePage />
                                </Layout>
                            }
                        />
                    </Routes>
                </Suspense>
            </Router>
        </div>
    );
}
import { useEffect, useState } from 'react';
import {  Navigate, Route, Routes, useLocation } from 'react-router-dom';
import {QueryClient,QueryClientProvider} from "@tanstack/react-query";
import './App.css';

import ExplorePage from './Pages/ExplorePage';
import HomePage from './Pages/HomePage';
import SearchPage from './Pages/SearchPage';
import SettingPage from './Pages/SettingPage';
import getFormattedWeatherData, {
  getFourWeatherData,
} from './services/weatherService';
import { AnimatePresence } from 'framer-motion';
import NotFound from './Pages/NotFound';
import LoginForm from './auth/LoginForm';
import {Toaster} from "react-hot-toast";
import AppLayout from "./Pages/AppLayout";
import ProtectedRoute from './auth/ProtectedRoute';
import SignupForm from './auth/SignupForm';

const queryClient=new QueryClient({
  defaultOptions:{
    queries:{
      staleTime:0,
    },
  },
});

function App() {
  // Default location is isfahan
  const [query, setQuery] = useState({ q: 'london' });
  const [units, setUnits] = useState('metric');
  const [isMetric, setIsMetric] = useState(false);
  const [weather, setWeather] = useState(null);
  const [cities, setCities] = useState(null);
    
  useEffect(() => {
    const fetchWeather = async () => {
      await getFormattedWeatherData({ ...query, units }).then((data) =>
        setWeather(data)
      );
    };

    fetchWeather();
  }, [query, units]);

  useEffect(() => {
    const fetchFourWeatherData = async () => {
      await Promise.all(getFourWeatherData({ units })).then((data) =>
        setCities(data)
      );
    };

    fetchFourWeatherData();
  }, [units]);

  const location = useLocation();

  return (
    <QueryClientProvider client={queryClient}>
    <main className="flex w-full items-center justify-center">
      <div className="app w-full lg:w-3/4 xl:w-3/5 h-[500px] sm:h-screen">
       
          <AnimatePresence>
         
         
          <Routes location={location} key={location.pathname}>
          
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                  </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="home" />} />
              <Route path="home" element={ <HomePage units={units} weather={weather}/>} />
              <Route path="search" element={<SearchPage setQuery={setQuery}/>} />
              <Route path="explore" element={<ExplorePage cities={cities} setQuery={setQuery} />} />
              <Route path="setting" element={ <SettingPage
                    weather={weather}
                    units={units}
                    setUnits={setUnits}
                    isMetric={isMetric}
                    setIsMetric={setIsMetric}
                  />} />
            </Route>
            
            <Route path="signup" element={<SignupForm />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="*" element={<NotFound/>} />
          </Routes>
      
          </AnimatePresence>
        
      </div>
    </main>
    <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "#1f2937",
              color:'#d1d5db',
            },
          }}
        />
    </QueryClientProvider>
  );
}

export default App;

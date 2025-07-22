import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useMutation } from 'react-query';
import { FaSoap } from 'react-icons/fa';
import { CircularProgress } from '@mui/material';

function AdminLogin() {
  const [splashActive, setSplashActive] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const [confirmImageClass, setConfirmImageClass] = useState("completed-image");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  async function postUser() {
    setIsLoading(true);
    try {
      const response = await axios.post("https://freshfoldserver.onrender.com/api/admin-auth", fieldsData);

      const authToken = response.headers["x-auth-admin-token"];
      localStorage.setItem("admin-jwt", JSON.stringify(authToken));
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  const { mutate } = useMutation(postUser, {
    onSuccess: () => {
      setSplashActive(true);
      setShowSplash(true);
      setTimeout(() => {
        setShowSplash(false);
        setConfirmImageClass("completed-image show");
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }, 2000);
    },
    onError: (error) => {
      setErrorMessage(error.response?.data || "Login failed");
    }
  });

  const [fieldsData, setFieldsData] = useState({
    email: "",
    password: "",
  });

  function handleFieldsChange(event) {
    setErrorMessage("");
    setFieldsData({
      ...fieldsData,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    mutate(fieldsData);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {splashActive ? (
        <div className="flex-1 flex items-center justify-center">
          {showSplash ? (
            <CircularProgress style={{ color: '#34CCA1' }} />
          ) : (
            <div className={`transition-all duration-500 ${confirmImageClass}`}>
              <svg className="w-32 h-32 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Header */}
          <header className="p-6">
            <Link to="/" className="flex items-center">
              <span className="logo text-2xl font-bold flex items-center">
                <span className="text-green-600">Fresh</span>
                <span className="flex text-green-600">
                  F <FaSoap className="mx-1" size={24} /> ld
                </span>
              </span>
            </Link>
          </header>

          {/* Main Content */}
          <main className="flex-1 flex items-center justify-center p-6">
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden">
              <div className="md:flex">
                {/* Left Side - Image */}
                <div className="hidden md:block md:w-1/2 bg-green-600 p-8 flex items-center justify-center">
                  <div className="text-center">
                    <img 
                      src={require("./assets/images/login-phone.png")} 
                      alt="Admin Login" 
                      className="w-64 mx-auto"
                    />
                    <h2 className="mt-6 text-2xl font-bold text-white">Admin Dashboard</h2>
                    <p className="mt-2 text-green-100">Laundry Management Simplified</p>
                  </div>
                </div>

                {/* Right Side - Form */}
                <div className="w-full md:w-1/2 p-8">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">Admin Login</h2>
                    <p className="mt-2 text-gray-600">Access your management dashboard</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {errorMessage && (
                      <div className="bg-red-50 border-l-4 border-red-500 p-4">
                        <p className="text-red-700">{errorMessage}</p>
                      </div>
                    )}

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={fieldsData.email}
                        onChange={handleFieldsChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={fieldsData.password}
                        onChange={handleFieldsChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        required
                      />
                    </div>

                    <div>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${isLoading ? 'opacity-70' : ''}`}
                      >
                        {isLoading ? (
                          <>
                            <CircularProgress size={20} style={{ color: 'white' }} className="mr-2" />
                            Signing In...
                          </>
                        ) : (
                          'Sign In'
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </main>
        </>
      )}
    </div>
  );
}

export default AdminLogin;
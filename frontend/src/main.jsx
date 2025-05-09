import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
import { ProjectProvider } from "./context/ProjectContext.jsx"; // Import ProjectProvider
import { TaskProvider } from "./context/TaskContext.jsx"; //Import TaskProvider
import { ThemeProvider } from "./context/ThemeContext"; // Import ThemeProvider
<<<<<<< HEAD
import { AdminProvider } from "./context/AdminContext"; // Import AdminProvider
=======
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
<<<<<<< HEAD
      <BrowserRouter> {/* Wrap the whole app inside BrowserRouter */}
        <AuthProvider> {/* Wrap AuthProvider to provide authentication */}
          <AdminProvider>{/* Wrap App with AdminProvider */}
            <ProjectProvider>{/* Wrap App with ProjectProvider */}
              <TaskProvider>{/* Wrap App with TaskProvider */}
                <App />
              </TaskProvider>
            </ProjectProvider>
          </AdminProvider>
        </AuthProvider>
      </BrowserRouter>
=======
    <BrowserRouter> {/* Wrap the whole app inside BrowserRouter */}
      <AuthProvider> {/* Wrap AuthProvider to provide authentication */}
        <ProjectProvider>{/* Wrap App with ProjectProvider */}
          <TaskProvider>{/* Wrap App with TaskProvider */}
            <App />
          </TaskProvider>
        </ProjectProvider>
      </AuthProvider>
    </BrowserRouter>
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
    </ThemeProvider>
  </StrictMode>
);

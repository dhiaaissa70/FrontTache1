import axios from "axios";

class Auth {
    constructor(baseURL) {
        this.api = axios.create({
            baseURL: baseURL || "https://backendtache1-production.up.railway.app/",  // Ensure this is your correct backend URL
        });
    }

    // Method to register a new user
    async registerUser(profile) {
        try {
            const response = await this.api.post("/auth/register", {
                username: profile.username ?? "",
                password: profile.password ?? "",
                role: profile.role ?? "user",  // Default role is "user"
            });

            return {
                success: true,
                status: response.status,
                message: response.data.message,
            };
        } catch (error) {
            console.error("Erreur lors de l'enregistrement de l'utilisateur :", error);

            if (error.response) {
                if (error.response.status === 409) {
                    return {
                        success: false,
                        status: 409,
                        message: "Utilisateur déjà enregistré",  // Custom error for user already exists
                    };
                }
                return {
                    success: false,
                    status: error.response.status,
                    message: error.response.data.message || "Une erreur est survenue lors de l'enregistrement",
                };
            } else {
                return {
                    success: false,
                    status: 500,
                    message: "Network error or server is unreachable.",
                };
            }
        }
    }

    // Method to login a user
    async loginUser(credentials) {
        try {
            // Sending login request to the backend
            const response = await this.api.post("/auth/login", {
                username: credentials.username ?? "",
                password: credentials.password ?? ""
            });

            // Check if response is successful and return the data
            return {
                success: true,
                status: response.status,
                token: response.data.token,  // JWT token
                user: response.data.user,    // User data (username, role)
                message: response.data.message
            };
        } catch (error) {
            console.error("Erreur lors de la connexion de l'utilisateur :", error);

            // Check if the error is from the server (response exists)
            if (error.response) {
                if (error.response.status === 401) {
                    return {
                        success: false,
                        status: 401,
                        message: "Mot de passe incorrect",  // Custom error for wrong credentials
                    };
                }
                return {
                    success: false,
                    status: error.response.status,
                    message: error.response.data?.message || "Une erreur est survenue lors de la connexion",
                };
            } else {
                return {
                    success: false,
                    status: 500,
                    message: "Network error or server is unreachable.",
                };
            }
        }
    }

    // Method to get users by role
    async getUsersByRole(role) {
        try {
            const token = localStorage.getItem('token'); // Get the JWT token from localStorage
            const response = await this.api.post(
                "/auth/usersByRole", 
                { role: role ?? "" }, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include token in Authorization header
                    }
                }
            );

            return {
                success: true,
                status: response.status,
                users: response.data.users,
            };
        } catch (error) {
            console.error("Erreur lors de la récupération des utilisateurs par rôle :", error);

            if (error.response) {
                return {
                    success: false,
                    status: error.response.status,
                    message: error.response.data.message || "Une erreur est survenue lors de la récupération des utilisateurs",
                };
            } else {
                return {
                    success: false,
                    status: 500,
                    message: "Network error or server is unreachable.",
                };
            }
        }
    }

    // Method to delete user by username (Include JWT in headers)
    async deleteUserByUsername(username) {
        try {
            const token = localStorage.getItem('token'); // Get the JWT token from localStorage
            const response = await this.api.delete("/auth/delete_user", {
                data: { username: username ?? "" },
                headers: {
                    Authorization: `Bearer ${token}`, // Include token in Authorization header
                }
            });

            return {
                success: true,
                status: response.status,
                message: response.data.message,
            };
        } catch (error) {
            console.error("Erreur lors de la suppression de l'utilisateur :", error);

            if (error.response) {
                return {
                    success: false,
                    status: error.response.status,
                    message: error.response.data.message || "Une erreur est survenue lors de la suppression de l'utilisateur",
                };
            } else {
                return {
                    success: false,
                    status: 500,
                    message: "Network error or server is unreachable.",
                };
            }
        }
    }
    async getAllUsers() {
        try {
            const token = localStorage.getItem('token'); 
            const response = await this.api.get("/auth/getallusers", {
                headers: {
                    Authorization: `Bearer ${token}`, 
                }
            });
    
            return {
                success: true,
                status: response.status,
                users: response.data.users, 
            };
        } catch (error) {
            console.error("Erreur lors de la récupération de tous les utilisateurs :", error);
    
            if (error.response) {
                return {
                    success: false,
                    status: error.response.status,
                    message: error.response.data.message || "Une erreur est survenue lors de la récupération des utilisateurs",
                };
            } else {
                return {
                    success: false,
                    status: 500,
                    message: "Network error or server is unreachable.",
                };
            }
        }
    }
}

export default Auth;


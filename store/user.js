export const actions = {
    register(_, registerData) {
        return this.$axios.$post('/api/v1/users/register', registerData)
            .then(() => true)
            .catch(error => {
                let errorMessage = "Oops! Something went wrong, try to register again!"
                if (error.response.data.errors) errorMessage = error.response.data.errors.message;
                return Promise.reject(errorMessage);
            })
    }
};
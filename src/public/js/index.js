const App = {
  data() {
    return {
      password: "",
      isLoading: false,
    };
  },
  methods: {
    getParameterByName(name, url = window.location.href) {
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return "";
      return decodeURIComponent(results[2]);
    },
    onSubmit() {
      this.isLoading = true;
      const token = this.getParameterByName("token");
      fetch("/api/v1/users/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: this.password,
          token: token,
        }),
      })
        .then((response) => {
          if (response.status === 200) {
            alert("Password changed successfully");
          } else {
            alert("Something went wrong");
          }
        })
        .catch((error) => {
          console.log(error);
          alert("Something went wrong");
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};

Vue.createApp(App).mount("#app");

<template>
  <div id="app">
    <b-container>
        <!-- Content here -->
        <b-row>
            <b-col>
              <div id="nav">
                <router-link to="/">Home</router-link> |
                <router-link to="/about">About</router-link> |
                <router-link to="/centers">Centros</router-link> |
                <router-link to="/centers/new">Adherirse</router-link>
              </div>
            </b-col>
        </b-row>
        <router-view />
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    console.log(process.env)
    console.log(`Working on '${process.env.VUE_APP_MODE} ${process.env.VUE_APP_URL_API}' mode`)
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px 30px 30px 0;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<template>
  <div>
    <b-container>
      <!-- Content here -->
      <b-row class="text-center">
        <b-col>
          <img alt="Vue logo" src="../assets/logo.png" />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <h1>Contenido</h1>
          <hr>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
            ratione incidunt odit fuga eveniet dolorum dicta, assumenda animi
            repellendus numquam illo. Aliquid porro quisquam velit deleniti
            obcaecati, mollitia tempora rem.
          </p>
          <br>
          <br>
          <h1>Servicios</h1>
          <hr>
           <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
            ratione incidunt odit fuga eveniet dolorum dicta, assumenda animi
            repellendus numquam illo. Aliquid porro quisquam velit deleniti
            obcaecati, mollitia tempora rem.
          </p>
          <b-list-group>
            <b-list-group-item
              href="#"
              class="flex-column align-items-start"
            >
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">Ver Centros de Ayuda</h5>
              </div>

              <p class="mb-1">
                Donec id elit non mi porta gravida at eget metus. Maecenas sed
                diam eget risus varius blandit.
              </p>
            </b-list-group-item>
            <b-list-group-item
              href="#"
              class="flex-column align-items-start"
            >
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">Solicitudes de carga</h5>
              </div>

              <p class="mb-1">
                Donec id elit non mi porta gravida at eget metus. Maecenas sed
                diam eget risus varius blandit.
              </p>
            </b-list-group-item>
            <b-list-group-item
              href="#"
              class="flex-column align-items-start"
            >
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">Turnos</h5>
              </div>

              <p class="mb-1">
                Donec id elit non mi porta gravida at eget metus. Maecenas sed
                diam eget risus varius blandit.
              </p>
            </b-list-group-item>
          </b-list-group>
          <br>
          <br>
        </b-col>
      </b-row>
      <br>
      <br>
    </b-container>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {}
}
</script>

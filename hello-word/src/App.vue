
<!-- TEMPLATE VIEW  -->
<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  <p v-once>{{ name }}, {{ channel }}</p>
  <p v-html="rawHTML"></p>

  <hr>
  <h1> MY Favourties Languages</h1>
  
  <ul>
    <li  v-for="lang in programmingLanguages" v-bind:key="lang">{{ lang }}</li>
  </ul>

  <ul>
    <li  v-for="lang in programmingLanguages2" v-bind:key="lang.name">{{ lang.name }}</li>
  </ul>

  <ul>
    <li  v-for="(lang, index) in programmingLanguages" v-bind:key="lang">{{index}} - {{ lang }}</li>
  </ul>

  <hr>
  <h1> Eventos</h1>

  <p> Number: {{randNumber}}</p>
  <button v-on:click="aMethod">Click Me</button>


  <p> Number: {{randNumber}}</p>
  <button @click="aMethod">Click Me</button>


  <hr>
  <h1> Bind </h1>

  <input v-bind:value="randNumber2" />

  <br><br>

  <p>Number: {{randNumber3}}</p>
  <input :value="randNumber3" @input="func($event)" />
  <button @click="changeNum">Click Me!</button>


  <br><br>
  <h3>Bind Model</h3>

  <input v-model="randNumber3" />
  <button @click="changeNum">Click Me!</button>

  <Header />
  <QuestionBox />

</template>

<!-- DIRECTIVAS 

Extiende el comportamiento/funcionalidad de los componentes

<h1 align="center"></h1>

v-once renderiza el elemento/componente solo una vez
https://es.vuejs.org/v2/api/?#v-once

v-html actualiza el innerHTML del elemento. (CUIDADO)
https://es.vuejs.org/v2/api/#v-html

v-bind:  enlza dinámicamente uno o más atributos, o una propiedad
de un componente a una expresión
https://es.vuejs.org/v2/api/#v-bind


 v-model: enlaza doblemente el atributo
 https://es.vuejs.org/v2/api/#v-model


-->

<!-- LOOPS

<li  v-for="lang in programmingLanguages" v-bind:key="lang">{{ lang }}</li>

v-for es el loop
v-bind:key es la key para generar el loop
v-bind:key relaciona/conecta (bind) con cada elelemento del arreglo


Obtener el index del loop

<li  v-for="(lang, index) in programmingLanguages" v-bind:key="lang">{{index}} - {{ lang }}</li>

-->

<!-- EVENTOS

 <button v-on="">Click Me</button>

 v-on: igual que jquery, cuando se produce un click, focus, etc

 Especificar que evento

 v-on:click

 Especificar callback

 <button v-on:click="aMethod">Click Me</button>

 Amethod:  tiene que estar declarado en la propiedad methods del componente

 Redefinir con @

 <button @click="aMethod">Click Me</button>

-->

<!-- PLUGINS

https://bootstrap-vue.org/
npm install bootstrap-vue

-->


<!-- LOGIC COMPONENT -->
<script>

// COMPONENTS
import HelloWorld from './components/HelloWorld.vue'
import Header from './components/Header.vue'
import QuestionBox from './components/QuestionBox.vue'


export default {
  name: 'App',
  components: {
    HelloWorld,
    Header,
    QuestionBox
  },
  data() {
    return {
      name: 'Richard',
      channel: 'Richard',
      rawHTML: "<b>HTML</b>",
      programmingLanguages: ['JS', 'C', 'C++', 'Java'],
      programmingLanguages2 : [
        {
          name: 'C'
        },
        {
          name: 'JS'
        },
        {
          name: 'C++'
        },
        {
          name: '.Net'
        },
      ],
      randNumber: Math.random(),
      randNumber2: 1,
      randNumber3: 1,
    }
  },
  methods: {
    // plain object
    // CREAR METODOS
    helloWorld() {
      alert("I am available !");
    },
    aMethod() {
      this.randNumber = Math.random();
      console.log('A METHOD WAS CALLED');
    },
    changeNum(){
      this.randNumber3 = 100;
    },
    func(event){
      console.log(event.target.value);
      this.randNumber3 = event.target.value;
    }
  },
  beforeCreate() {
    // primer metodo que se ejecuta luego de la llamada de .mount()
    // el template no está listo
    // data propiedades undefined
    console.log("BeforeCreate was called");
  },
  created () {
    // data propiedas instanciadas
    // template no está listo
    console.log("Created was called");
  },
  beforeMount () {
    console.log("BeforeMount was called")
  },
  mounted() {
    // se ejecuta luedgo que el componente es montado
    this.name = 'Something else';
    console.log(this.name)
    console.log("Mounted was called")

    // CALL METHODS
    this.helloWorld();
  },
  beforeUnmount () {},
  unmounted () {},
}

// data es una función que contiene la lógica del componente
// retorna un objeto que se conencta con el template
</script>

<!-- STYLE COMPONENT -->
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

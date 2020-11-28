<template>
  <div>
    <br>
    <b-jumbotron>
      <template #lead>
        {{ currentQuestion.question }}
      </template>

      <hr class="my-4">

      <b-list-group>
        <b-list-group-item
        button
        v-for="(anw, index) in answers"
        :key="index"
        @click.prevent="selectedAnwser(index)"
        :class="[selectedIndex === index ? 'selected' : '']"
        >
          {{ anw }}
        </b-list-group-item>
      </b-list-group>

      <br>

      <b-button
        variant="primary"
        @click="submitAnswer"
        :disabled="selectedIndex === null || anwsered"
      >
      Submit
      </b-button> 
      <b-button variant="success" href="#" @click="next" style="margin: 0 0 0 5px;">Next</b-button>
    </b-jumbotron>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'QuestionBox',
  props: {
    // PROPS NOS PERMITE INTEREACTUAR CON EL TEMPLATE
    // objetos, callbacks
    currentQuestion: Object,
    next: Function,
    increment: Function
  },
  data() {
    return {
      selectedIndex: null,
      shuffledAnswers: [],
      correctIndex: null,
      anwsered: false,
    }
  },
  computed: {
    answers() {
      let answers = [...this.currentQuestion.incorrect_answers];
      answers.push(this.currentQuestion.correct_answer)
      return answers
    }
  },
  watch: {
    // es para vigilar o verificar las propiedades hayan cambiado
    // currentQuestion() {
    //   this.selectedIndex = null;
    //   this.shuffleAnswers();
    // }

    currentQuestion: {
      inmediate: true,
      handler() {
        this.selectedIndex = null;
        this.shuffleAnswers();
        this.anwsered = false;
      }
    }
  },
  methods: {
    selectedAnwser(index) {
      this.selectedIndex = index;
    },
    shuffleAnswers() {
      let answers = [...this.currentQuestion.incorrect_answers, this.currentQuestion.correct_answer];
      this.shuffledAnswers = _.shuffle(answers);
      this.correctIndex = answers.findIndex((item) => item === this.currentQuestion.correct_answer);
      // lodash library npm i lodash
    },
    submitAnswer() {
      let isCorrect = false;
      if(this.selectedIndex === this.correctIndex) {
        isCorrect = true;
      }

      this.anwsered = true;

      this.increment(isCorrect);
    }
  },
  mounted() {
    this.shuffleAnswers();
  }
}
</script>

<style scoped>
  .selected {
    background-color: wheat !important;
  }

  .correct {
    background-color: green;
  }

  .wrogn {
    background-color: red;
  }
</style>
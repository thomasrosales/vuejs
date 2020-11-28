
<!-- UNICO OBLIGATORIO -->
<template>
  <div>
    <b-nav tabs>
      <b-nav-item disabled>Active</b-nav-item>
      <b-nav-item disabled>Counter: {{correctAnwser}}/{{totalAnswer}}</b-nav-item>
    </b-nav>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    correctAnwser: Number,
    totalAnswer: Number
  }
}
</script>
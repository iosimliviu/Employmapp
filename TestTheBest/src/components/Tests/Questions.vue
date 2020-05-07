<template>
  <div class="question q-ma-lg">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ question }}</div>
        </q-card-section>
      </q-card>
      <q-list>
        <q-item tag="label" v-ripple>
          <q-item-section avatar>
            <q-radio v-model="color" val="teal" color="primary" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Teal</q-item-label>
          </q-item-section>
        </q-item>

        <q-item tag="label" v-ripple>
          <q-item-section avatar>
            <q-radio v-model="color" val="orange" color="primary" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Orange</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
</template>

<script>
export default {
    data() {
        return {
        question:
            "Find the maximum number in an array of integers. For example, in the array [1, -3, 5], the maximum number is 5.",
        color: 'cyan'
        };
    }
}
</script>

<style>
.question {
  width: 65%;
}
</style>
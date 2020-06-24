<template>
  <q-page class="bgImage">
    <div class="container absolute-center">
      <div class="contains">
        <p class="text-h1 welcome"><b>Welcome to</b></p>
        <p class="text-h1 welcome"><b>Employmapp!</b></p>
        <div class="buttons">
          <q-btn
            @click.native="$router.push('/')"
            class="testBtn q-mb-lg q-mt-lg"
            icon-right="code"
            color="primary"
            size="30px"
            label="TAKE TEST!"
          />
        </div>
        <div class="buttons">
          <q-btn
            @click.native="$router.push('/details')"
            class="detailsBtn"
            color="secondary"
            size="lg"
            label="Company details"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {};
</script>

<style scoped>
.bgImage {
  background-image: url(../assets/waveUp2.svg);
  background-repeat: no-repeat;
  background-size: contain;
}

.testBtn {
  border-radius: 25px;
  height: 100%;
}

.detailsBtn {
  border-radius: 25px;
}

.container {
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.welcome {
  font-size: 110px;
}

@media only screen and (max-width: 700px) {
  .welcome {
    font-size: 50px;
  }

  .contains {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
}
</style>

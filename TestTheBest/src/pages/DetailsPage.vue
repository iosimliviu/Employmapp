<template>
  <div class="container q-pa-md ">
    <div class="contains">
      <img
        class="q-ma-sm companyImage"
        alt="CompanyLogo"
        src="../assets/Employmapp-03.png"
      />
      <div class="videoContainer q-ma-lg">
        <q-video
          class="video"
          :ratio="16 / 9"
          src="https://www.youtube.com/embed/NpEaa2P7qZI?rel=0"
        />
      </div>
      <div class="details">
        <p>
          The application makes for a better and more efficient way to select
          and recruit participants in companies where time, distance, or
          economic possibilities are limited. The system also addresses the
          forever blamed problem of bureaucracy, thus simplifying and
          accelerating the process.
        </p>
        <p>
          Employmapp includes all of the agents present in the regular admission
          process of a job attendee, based on an adaptable and flexible choice
          for the majority of software developing companies. The analysis had as
          a starting point, my experience thus far on the Romanian IT job
          market, namely open to position as a software engineer to various big
          multination tech companies. The final objective of the paper is to
          tackle inconsistencies in recruitment and to enable hard-skill testing
          of aspiring software developers through theoretical and practical
          challenges. These objectives are tackled through a reliable system
          that is both easy to sustain and improve, and scalable through a
          well-documented process so that it can cover immediate and real
          problems.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.companyImage {
  width: 50%;
}
.details {
  font-size: 19px;
  text-indent: 50px;
}
.video {
  border-radius: 25px;
}
.videoContainer {
  width: 70%;
}
.container {
  margin: auto;
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.contains {
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

@media only screen and (max-width: 1150px) {
  .container {
    margin: auto;
    width: 95%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .companyImage {
    width: 100%;
  }
  .videoContainer {
    width: 100%;
  }
}
</style>

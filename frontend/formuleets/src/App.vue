<template>
  <Header></Header>
  <router-view />
  <Footer></Footer>

  <go-to-top></go-to-top>
  <Notifications></Notifications>
</template>
<script>
import Header from "./components/Header/Header.vue";
import Footer from "./components/Footer/Footer.vue";
import GoToTop from "./components/GoToTop/GoToTop.vue";
import Notifications from "./components/Notifications/Notifications.vue";

export default {
  components: {
    Header,
    Footer,
    GoToTop,
    Notifications,
  },
  data() {
    return {
      // All of those data are for the title of the page
      lastTitle: "",
      titleAnimatedInterval: null,

      speed: 1000,

      car: null,
      latestChar: "=",
    };
  },
  mounted() {
    const lg = localStorage.langage;
    this.$root.$i18n.setLocale(
      lg != null && lg ? lg : navigator.language.split("-")[0]
    );

    document.addEventListener("visibilitychange", this.animateTitle);
  },
  beforeUnmount() {
    document.removeEventListener("visibilitychange", this.animateTitle);
  },
  methods: {
    animateTitle() {
      if (document.hidden) {
        this.lastTitle = document.title;

        this.animatedCar();
        this.titleAnimatedInterval = setInterval(
          this.animatedCar.bind(this),
          this.speed
        );
      } else {
        clearInterval(this.titleAnimatedInterval);
        document.title = this.lastTitle;
      }
    },

    animatedCar() {
      if (!this.car) this.car = "==========c".split("");

      const back = JSON.parse(JSON.stringify(this.latestChar));

      this.latestChar = this.car.shift();

      this.car.push(back);

      document.title = this.car.join("").replace("c", "🚗");
    },
  },
};
</script>

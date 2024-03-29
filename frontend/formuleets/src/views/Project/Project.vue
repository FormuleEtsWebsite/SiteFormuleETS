<template>
  <div class="flex" :style="`height: ${height}`" id="project">
    <!-- SCROLL MENU -->
    <div
      class="h-screen w-12 flex flex-col justify-center overflow-visible items-center p-5 sticky top-0"
    >
      <div class="h-16 w-2"></div>

      <div
        class="bg-red-900 w-1 h-full rounded-lg relative flex flex-col items-center"
      >
        <!-- POURCENTAGE -->
        <div
          class="w-full bg-red-500 rounded-full"
          :style="menuBarHeight"
        ></div>

        <!-- CIRCLE -->
        <a
          @click="scrollToPosition(item.imageCount)"
          class="absolute transform hover:scale-150 rounded-full bg-red-900 w-4 h-4 text-white flex justify-center items-center cursor-pointer"
          :style="`top: ${
            ((item.imageCount - 1) / project.images.nbImgs) * 100
          }%`"
          v-for="(item, index) of project.text"
          :key="item.imageCount"
          :title="$t(item.title)"
        >
          <span class="text-xs">{{ index }}</span>
        </a>
      </div>
    </div>

    <!-- MAIN SECTION -->
    <section
      class="dark:bg-dark-mode h-screen sticky top-0 w-full flex justify-center items-center flex-col landscape:flex-row tb:flex-row bg-cover bg-center overflow-x-hidden"
      lazy-background="/static/project/curve_line.svg"
    >
      <!-- AUTO SCROLL -->
      <button
        class="p-3 absolute top-16 right-2 animate-pulse"
        @click="autoScroll()"
      >
        <p class="text-red-500">
          <i class="fa-solid fa-play mr-2"></i>
          {{ $t(autoMsg) }}
        </p>
      </button>

      <!-- TEXT -->
      <article
        class="flex-initial overflow-hidden landscape:w-1/2 landscape:h-full tb:w-1/2 tb:h-full h-1/2 w-full flex items-center justify-center flex-col text-center p-5"
      >
        <h2
          v-if="text.title"
          class="text-xl md:text-3xl font-bold text-red-500 uppercase slide-left"
        >
          {{ $t(text.title) || text.title }}
        </h2>
        <p
          v-if="text.label"
          class="text-xs md:text-base dark:text-white mt-5 slide-left delay-300"
          v-html="$t(text.label) || text.label"
        ></p>
        <i
          v-if="this.count == 0"
          class="fas fa-chevron-down dark:text-white mt-5 fade-arrow"
        ></i>
        <i
          v-if="this.count == 0"
          class="fas fa-chevron-down dark:text-white -mt-2 fade-arrow"
        ></i>
      </article>

      <!-- FORMULE -->
      <article
        class="landscape:h-full tb:h-full flex-initial flex justify-center items-center transition-all duration-1000 landscape:w-1/2 tb:w-1/2"
        :class="count != countToNotDisplay ? 'w-full tb:w-1/2' : 'absolute'"
      >
        <img
          id="3d-model"
          v-if="img"
          rel="preload"
          :src="img"
          alt="Animation image"
          class="pointer-events-none w-full landscape:mt-10 tb:mt-10"
          :class="
            count != countToNotDisplay
              ? 'opacity-100 transition-all duration-1000'
              : 'opacity-0 z-0'
          "
        />
      </article>
    </section>
  </div>
</template>

<script>
import project from "./project";
import phoneMixin from "../../mixins/phone-mixin";

export default {
  name: "Project",
  mixins: [phoneMixin],
  data() {
    return {
      project: project,
      images: [],
      img: null,
      height: "100vh",
      imageHeight: 0,
      count: 0,
      countToNotDisplay: 0,
      autoScrollInterval: null,
      actualScroll: 0,

      autoMsg: "message.project.auto",

      autoScrollActivate: false,

      nbPreloaded: 0,
      preloadCount: 30,

      speed: 1,

      text: {
        title: "message.project.default.animation",
        label: "message.project.default.label",
      },
    };
  },
  computed: {
    menuBarHeight() {
      const prc = (this.actualScroll / parseInt(this.height)) * 100;
      return `height: ${prc + 2}%`;
    },
  },
  watch: {
    isMobile() {
      this.speed = this.isMobile ? project.phoneSpeed : project.speed;
      this.calcHeight();
    },
  },
  mounted() {
    window.scrollTo(0, 0);

    this.$data.mobileSize = "768px";

    this.speed = this.isMobile ? project.phoneSpeed : project.speed;

    this.countToNotDisplay = project.appearAndDisapear ? 0 : -1;

    this.mount3D();
    this.preloadImage();

    document.addEventListener("scroll", this.animateFormule, {
      passive: false,
    });
    window.addEventListener("resize", this.calcHeight, true);
  },
  beforeUnmount() {
    document.body.style.overflowY = "auto";
    clearInterval(this.autoScrollInterval);

    document.removeEventListener("scroll", this.animateFormule, {
      passive: false,
    });
    window.removeEventListener("resize", this.calcHeight, true);
  },
  methods: {
    scrollToPosition(count) {
      window.scrollTo(0, (this.imageHeight / this.speed) * count);
    },
    calcPrcTop(nb, total) {
      const prc = (nb / total) * 100;
      return `top: ${prc}%`;
    },
    calcHeight() {
      try {
        const height = document.getElementById("3d-model").offsetHeight;

        if (!height || height == 0) return false;

        const calc = (height / this.speed) * (this.images.length - 1);
        const screenDivide = window.innerHeight;
        this.height = calc + screenDivide + "px";
        this.imageHeight = height;

        return true;
      } catch (e) {
        return false;
      }
    },
    mount3D() {
      const dir = project.images.directory;
      const ext = project.images.extension;
      const startWith = project.images.startWith || "";
      const pad = project.images.padStart;
      const nbImg = project.images.nbImgs;

      for (let i = 0; i < nbImg + 1; ++i) {
        const img =
          dir +
          startWith +
          (pad
            ? (i + 1).toString().padStart(nbImg.toString().length, "0")
            : i + 1) +
          "." +
          ext;
        this.images.push(img);
      }

      this.img = this.images[0];
    },
    preloadImage() {
      for (const img of this.images.slice(
        this.nbPreloaded,
        this.nbPreloaded + this.preloadCount
      )) {
        const load = new Image();
        load.setAttribute("rel", "preload");
        load.src = img;
        if (this.nbPreloaded == 0)
          load.onload = () => {
            this.calcHeight();
          };
        this.nbPreloaded++;
      }
    },
    countSubstract(nb, substract) {
      if (!substract || substract <= 0) return 1;

      let count = 0;
      for (let i = 0; i < nb; i += substract) {
        ++count;
      }
      return count;
    },
    autoScroll() {
      const max = parseInt(this.height.split("px")[0]);
      document.body.style.overflowY = "hidden";

      this.autoScrollActivate = !this.autoScrollActivate;

      if (this.autoScrollActivate) {
        //AUTO SCROLL
        this.autoMsg = "message.project.stop";
        this.autoScrollInterval = setInterval(() => {
          if (window.scrollY + window.innerHeight >= max) {
            console.log("[INFO] Stopping auto scroll animation");
            document.body.style.overflowY = "auto";
            this.autoMsg = "message.project.auto";
            clearInterval(this.autoScrollInterval);
          }

          window.scrollBy({
            top:
              project.autoSpeed *
              (this.isMobile ? project.speed / project.phoneSpeed : 1),
          });
        }, 100);
      } else {
        //STOP AUTO SCROLL
        this.autoMsg = "message.project.auto";
        clearInterval(this.autoScrollInterval);
        document.body.style.overflowY = "auto";
      }
    },
    animateFormule() {
      const scroll = window.scrollY ? window.scrollY : document.body.scrollTop;
      this.actualScroll = scroll;

      const count =
        scroll == 0
          ? 0
          : this.countSubstract(scroll, this.imageHeight / this.speed);

      this.count = count;

      const countValid = count >= 0 && count < this.images.length - 1;

      if (countValid) {
        //image handler
        this.img = this.images[count];

        if (count + this.preloadCount / 2 > this.nbPreloaded) {
          this.preloadImage();
        }

        //text handler
        let text = {};

        const sort = project.text.sort(function (a, b) {
          return a.imageCount - b.imageCount;
        });

        const filtered = sort.filter((e) => count >= e.imageCount);
        const reversed = sort.filter((e) => count <= e.imageCount);

        if (filtered.length > 0) {
          text = filtered[filtered.length - 1];
        } else {
          text = reversed[reversed.length - 1];
        }

        if (
          text &&
          (text.title != this.text.title || text.label != this.text.label)
        ) {
          this.text.title = false;
          this.text.label = false;

          setTimeout(() => {
            this.text.title = text.title;
            this.text.label = text.label;
          }, 200);
        }
      }
    },
  },
};
</script>

<style scoped>
.fade-arrow {
  opacity: 0;
  animation: fade-arrow 2s infinite linear;
  animation-delay: 700ms;
}

@keyframes fade-arrow {
  0% {
    opacity: 0.1;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.1;
  }
}
</style>
